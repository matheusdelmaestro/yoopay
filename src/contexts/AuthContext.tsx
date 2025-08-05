import React, { createContext, useContext, ReactNode } from 'react'
import { useAuth, AuthState } from '../hooks/useAuth'
import { UserMetadata, AuthUser } from '../lib/supabase'

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string; data?: any }>
  signUp: (email: string, password: string, metadata?: UserMetadata) => Promise<{ success: boolean; error?: string; data?: any }>
  signOut: () => Promise<{ success: boolean; error?: string }>
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string; data?: any }>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext deve ser usado dentro de um AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useAuth()

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

// Componente para proteger rotas
interface ProtectedRouteProps {
  children: ReactNode
  fallback?: ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  fallback = <div>Carregando...</div> 
}) => {
  const { isAuthenticated, loading } = useAuthContext()

  if (loading) {
    return <>{fallback}</>
  }

  if (!isAuthenticated) {
    // Redirecionar para login ou mostrar componente de login
    return <div>Acesso negado. Faça login para continuar.</div>
  }

  return <>{children}</>
}