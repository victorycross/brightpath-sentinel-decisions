import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ExceptionRequestForm } from "@/components/ExceptionRequestForm";
import { RequestList } from "@/components/RequestList";
import { MyRequestsList } from "@/components/dashboard/MyRequestsList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AuthForm } from "@/components/auth/AuthForm";
import { ProcessSteps } from "@/components/home/ProcessSteps";

const Index = () => {
  const [showForm, setShowForm] = useState(false);
  const [session, setSession] = useState<any>(null);
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
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
    return <AuthForm />;
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

      {!showForm && <ProcessSteps />}

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
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="all">All Requests</TabsTrigger>
            <TabsTrigger value="my">My Requests</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <RequestList />
          </TabsContent>
          <TabsContent value="my">
            <MyRequestsList />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default Index;