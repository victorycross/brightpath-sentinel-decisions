import { Alert, AlertDescription } from "@/components/ui/alert"

interface AuthErrorAlertProps {
  message: string
}

export const AuthErrorAlert = ({ message }: AuthErrorAlertProps) => {
  if (!message) return null

  return (
    <Alert variant="destructive" className="mb-4">
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}