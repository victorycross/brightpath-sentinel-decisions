import { useState } from "react"
import { AuthError, AuthApiError } from "@supabase/supabase-js"

export const useAuthError = () => {
  const [errorMessage, setErrorMessage] = useState<string>("")

  const getErrorMessage = (error: AuthError) => {
    if (error instanceof AuthApiError) {
      if (error.message.includes("invalid_credentials")) {
        return 'Invalid email or password. Please check your credentials and try again.'
      }
      switch (error.status) {
        case 400:
          return 'Invalid login attempt. Please check your credentials and try again.'
        case 422:
          return 'Invalid email format. Please enter a valid email address.'
        case 429:
          return 'Too many login attempts. Please try again later.'
        default:
          return error.message
      }
    }
    return error.message
  }

  const clearError = () => setErrorMessage("")
  const setError = (error: AuthError) => setErrorMessage(getErrorMessage(error))

  return {
    errorMessage,
    clearError,
    setError
  }
}