import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import yoogaLogo from "@/assets/yooga-logo-exact.png";

interface LoginPageProps {
  onLogin: (user: { email: string; role: string; name: string }) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock users for development (will be replaced by Supabase)
  const mockUsers = [
    { email: "atendimento@yooga.com.br", password: "xK%d^nhP5%@#$$@", role: "atendimento", name: "Ana Silva" },
    { email: "pagamento@yooga.com.br", password: "xK%d^nhP5%@#$$@", role: "pagamento", name: "Carlos Santos" },
    { email: "financeiro@yooga.com.br", password: "xK%d^nhP5%@#$$@", role: "financeiro", name: "Maria Costa" },
    { email: "supervisor@yooga.com.br", password: "xK%d^nhP5%@#$$@", role: "supervisor", name: "João Lima" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Usar apenas usuários mock por enquanto
      const mockUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (mockUser) {
        toast({
          title: "Login realizado com sucesso",
          description: `Bem-vindo(a), ${mockUser.name}!`,
        });
        onLogin({ email: mockUser.email, role: mockUser.role, name: mockUser.name });
      } else {
        toast({
          title: "Erro no login",
          description: "E-mail ou senha incorretos.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Erro interno. Tente novamente.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-modern-light/20 via-green-modern/5 to-green-modern-dark/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md card-modern shadow-green">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mx-auto mb-4">
            <img 
              src={yoogaLogo} 
              alt="Yooga" 
              className="h-20 w-auto object-contain"
            />
          </div>
          <CardTitle className="text-2xl">Yooga Pay</CardTitle>
          <CardDescription>Sistema Operacional Interno</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  placeholder="seu.email@yooga.com.br"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  placeholder="••••••••"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full btn-modern" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>          
        </CardContent>
      </Card>
    </div>
  );
}