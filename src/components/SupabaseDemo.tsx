import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthContext } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { User, Mail, Shield, LogOut, UserPlus, RotateCcw } from 'lucide-react'

export const SupabaseDemo: React.FC = () => {
  const { user, session, signOut, signUp, resetPassword, isAuthenticated, loading } = useAuthContext()
  const { toast } = useToast()
  const [newUserEmail, setNewUserEmail] = useState('')
  const [newUserPassword, setNewUserPassword] = useState('')
  const [resetEmail, setResetEmail] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [isResetting, setIsResetting] = useState(false)

  const handleSignOut = async () => {
    const result = await signOut()
    if (result.success) {
      toast({
        title: 'Logout realizado',
        description: 'Você foi desconectado com sucesso.',
      })
    } else {
      toast({
        title: 'Erro no logout',
        description: result.error || 'Erro desconhecido',
        variant: 'destructive',
      })
    }
  }

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCreating(true)

    const result = await signUp(newUserEmail, newUserPassword, {
      role: 'atendimento',
      full_name: newUserEmail.split('@')[0],
    })

    if (result.success) {
      toast({
        title: 'Usuário criado',
        description: 'Novo usuário criado com sucesso! Verifique o email para confirmação.',
      })
      setNewUserEmail('')
      setNewUserPassword('')
    } else {
      toast({
        title: 'Erro ao criar usuário',
        description: result.error || 'Erro desconhecido',
        variant: 'destructive',
      })
    }

    setIsCreating(false)
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsResetting(true)

    const result = await resetPassword(resetEmail)

    if (result.success) {
      toast({
        title: 'Email enviado',
        description: 'Instruções para reset de senha foram enviadas para o email.',
      })
      setResetEmail('')
    } else {
      toast({
        title: 'Erro ao enviar email',
        description: result.error || 'Erro desconhecido',
        variant: 'destructive',
      })
    }

    setIsResetting(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-modern mx-auto mb-4"></div>
          <p>Carregando informações de autenticação...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-green-modern-dark mb-2">
          🔐 Demonstração Supabase
        </h2>
        <p className="text-muted-foreground">
          Funcionalidades de autenticação integradas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Informações do Usuário */}
        <Card className="card-modern">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-green-modern" />
              Status de Autenticação
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className={`w-4 h-4 ${
                isAuthenticated ? 'text-green-500' : 'text-red-500'
              }`} />
              <span className={`font-medium ${
                isAuthenticated ? 'text-green-700' : 'text-red-700'
              }`}>
                {isAuthenticated ? 'Autenticado' : 'Não autenticado'}
              </span>
            </div>

            {user && (
              <div className="space-y-2 p-4 bg-green-modern/5 rounded-lg">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-green-modern" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  <strong>ID:</strong> {user.id}
                </div>
                <div className="text-xs text-muted-foreground">
                  <strong>Criado em:</strong> {new Date(user.created_at).toLocaleString('pt-BR')}
                </div>
                {user.user_metadata && (
                  <div className="text-xs text-muted-foreground">
                    <strong>Metadata:</strong> {JSON.stringify(user.user_metadata, null, 2)}
                  </div>
                )}
              </div>
            )}

            {session && (
              <div className="text-xs text-muted-foreground p-4 bg-blue-50 rounded-lg">
                <strong>Sessão expira em:</strong><br />
                {new Date(session.expires_at! * 1000).toLocaleString('pt-BR')}
              </div>
            )}

            {isAuthenticated && (
              <Button 
                onClick={handleSignOut} 
                variant="outline" 
                className="w-full"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Fazer Logout
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Criar Novo Usuário */}
        <Card className="card-modern">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-green-modern" />
              Criar Novo Usuário
            </CardTitle>
            <CardDescription>
              Registrar um novo usuário no Supabase
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <Label htmlFor="newEmail">Email</Label>
                <Input
                  id="newEmail"
                  type="email"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="novo@yooga.com.br"
                  required
                />
              </div>
              <div>
                <Label htmlFor="newPassword">Senha</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newUserPassword}
                  onChange={(e) => setNewUserPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full btn-modern" 
                disabled={isCreating}
              >
                {isCreating ? 'Criando...' : 'Criar Usuário'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Reset de Senha */}
        <Card className="card-modern">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-green-modern" />
              Reset de Senha
            </CardTitle>
            <CardDescription>
              Enviar email para recuperação de senha
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <Label htmlFor="resetEmail">Email</Label>
                <Input
                  id="resetEmail"
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="usuario@yooga.com.br"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full btn-soft" 
                disabled={isResetting}
              >
                {isResetting ? 'Enviando...' : 'Enviar Reset'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Informações Técnicas */}
        <Card className="card-modern">
          <CardHeader>
            <CardTitle>⚙️ Configuração</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>
              <strong>Supabase URL:</strong><br />
              <code className="text-xs bg-gray-100 p-1 rounded">
                {import.meta.env.VITE_SUPABASE_URL || 'Não configurado'}
              </code>
            </div>
            <div>
              <strong>Chave Anon:</strong><br />
              <code className="text-xs bg-gray-100 p-1 rounded">
                {import.meta.env.VITE_SUPABASE_ANON_KEY ? 
                  `${import.meta.env.VITE_SUPABASE_ANON_KEY.substring(0, 20)}...` : 
                  'Não configurado'
                }
              </code>
            </div>
            <div className="pt-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                ✅ Configuração OK
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}