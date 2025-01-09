import { useState } from "react"
import { AuthError, AuthApiError } from "@supabase/supabase-js"

export const useAuthError = () => {
  const [errorMessage, setErrorMessage] = useState<string>("")

  const getErrorMessage = (error: AuthError) => {
    if (error instanceof AuthApiError) {
      switch (error.status) {
        case 400:
          if (error.message.includes("invalid_credentials")) {
            return 'The email or password you entered is incorrect. Please try again.'
          }
          if (error.message.includes("Email not confirmed")) {
            return 'Please verify your email address before signing in.'
          }
          return 'Invalid login attempt. Please check your credentials and try again.'
        case 422:
          return 'Please enter a valid email address.'
        case 429:
          return 'Too many login attempts. Please wait a moment before trying again.'
        default:
          return 'An error occurred during authentication. Please try again.'
      }
    }
    return 'An unexpected error occurred. Please try again later.'
  }

  const clearError = () => setErrorMessage("")
  const setError = (error: AuthError) => {
    console.error('Auth Error:', error)
    setErrorMessage(getErrorMessage(error))
  }

  return {
    errorMessage,
    clearError,
    setError
  }
}