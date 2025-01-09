import { useEffect } from "react"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { Card, CardContent } from "@/components/ui/card"
import { supabase } from "@/integrations/supabase/client"
import { AuthHeader } from "./AuthHeader"
import { AuthErrorAlert } from "./AuthErrorAlert"
import { useAuthRedirect } from "./useAuthRedirect"
import { useAuthError } from "./useAuthError"

export const AuthForm = () => {
  const { errorMessage, clearError, setError } = useAuthError()
  useAuthRedirect()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'USER_UPDATED' || event === 'SIGNED_OUT') {
        clearError()
      }
      if (event === 'USER_DELETED' || event === 'SIGNED_OUT') {
        clearError()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [clearError])

  return (
    <div className="max-w-md mx-auto mt-8 p-6">
      <AuthHeader title="Welcome to Exception Hub" />
      <AuthErrorAlert message={errorMessage} />
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
            onError={(error) => setError(error)}
            localization={{
              variables: {
                sign_in: {
                  email_label: "Email address",
                  password_label: "Password",
                  email_input_placeholder: "Your email address",
                  password_input_placeholder: "Your password",
                  button_label: "Sign in",
                  loading_button_label: "Signing in ...",
                  social_provider_text: "Sign in with {{provider}}",
                  link_text: "Already have an account? Sign in",
                },
                sign_up: {
                  email_label: "Email address",
                  password_label: "Create a Password",
                  email_input_placeholder: "Your email address",
                  password_input_placeholder: "Your password",
                  button_label: "Sign up",
                  loading_button_label: "Signing up ...",
                  social_provider_text: "Sign up with {{provider}}",
                  link_text: "Don't have an account? Sign up",
                  confirmation_text: "Check your email for the confirmation link"
                }
              }
            }}
            showLinks={true}
            view="sign_in"
          />
        </CardContent>
      </Card>
    </div>
  )
}