import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Variáveis de ambiente do Supabase não encontradas!')
  console.error('Verifique se VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY estão definidas no .env.local')
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
})

// Tipos para autenticação
export interface AuthUser {
  id: string
  email: string
  user_metadata?: {
    full_name?: string
    avatar_url?: string
  }
}

export interface UserMetadata {
  full_name?: string
  avatar_url?: string
  role?: string
  [key: string]: unknown
}

export interface AuthSession {
  access_token: string
  refresh_token: string
  expires_in: number
  token_type: string
  user: AuthUser
}

// Funções de autenticação
export const auth = {
  // Login com email e senha
  signIn: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      return { data, error }
    } catch (networkError) {
      console.error('❌ Erro de conectividade Supabase:', networkError)
      return { 
        data: null, 
        error: { 
          message: 'Erro de conectividade. Verifique sua internet e configuração do Supabase. Consulte SOLUCAO_SUPABASE.md',
          name: 'NetworkError'
        } 
      }
    }
  },

  // Registro de novo usuário
  signUp: async (email: string, password: string, metadata?: UserMetadata) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    })
    return { data, error }
  },

  // Logout
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Obter usuário atual
  getCurrentUser: () => {
    return supabase.auth.getUser()
  },

  // Escutar mudanças de autenticação
  onAuthStateChange: (callback: (event: string, session: AuthSession | null) => void) => {
    return supabase.auth.onAuthStateChange(callback)
  },

  // Reset de senha
  resetPassword: async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    return { data, error }
  },

  // Login com Google (opcional)
  signInWithGoogle: async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    })
    return { data, error }
  },
}