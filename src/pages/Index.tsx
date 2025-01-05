import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ExceptionRequestForm } from "@/components/ExceptionRequestForm";
import { RequestList } from "@/components/RequestList";
import { PlusCircle, ClipboardCheck, Shield, Clock } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const ProcessStep = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <Card className="flex-1">
    <CardContent className="pt-6">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-3 bg-primary/10 rounded-full">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </CardContent>
  </Card>
);

const Index = () => {
  const [showForm, setShowForm] = useState(false);
  const [session, setSession] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        toast({
          title: "Welcome!",
          description: "You have successfully signed in.",
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  useEffect(() => {
    if (location.state?.showForm) {
      setShowForm(true);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  if (!session) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome to Exception Hub</h1>
        <Card>
          <CardContent className="pt-6">
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: 'rgb(var(--primary))',
                      brandAccent: 'rgb(var(--primary))',
                    },
                  },
                },
              }}
              providers={[]}
              theme="light"
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Exception Request Management
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Submit and track policy exception requests through our streamlined process. Our platform ensures proper review and approval while maintaining compliance and transparency.
        </p>
      </div>

      {!showForm && (
        <div className="mb-16 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <ProcessStep 
              icon={ClipboardCheck}
              title="Submit Request"
              description="Fill out the exception request form with detailed information about your case, including rationale and risk assessment."
            />
            <ProcessStep 
              icon={Shield}
              title="Review Process"
              description="Your request will be reviewed by relevant discipline approvers based on the type of exception and policies impacted."
            />
            <ProcessStep 
              icon={Clock}
              title="Track Progress"
              description="Monitor the status of your request through our dashboard and receive notifications at each step of the approval process."
            />
          </div>
        </div>
      )}

      <div className="mb-8 flex justify-between items-center">
        <Button
          variant="outline"
          onClick={async () => {
            await supabase.auth.signOut();
            toast({
              title: "Signed out",
              description: "You have been successfully signed out.",
            });
          }}
        >
          Sign Out
        </Button>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary hover:bg-primary/90"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          New Request
        </Button>
      </div>

      {showForm ? (
        <div className="animate-fade-in">
          <ExceptionRequestForm onClose={() => setShowForm(false)} />
        </div>
      ) : (
        <RequestList />
      )}
    </div>
  );
};

export default Index;