import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import yoogaLogo from "@/assets/yooga-logo.png";

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

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      toast({
        title: "Login realizado com sucesso",
        description: `Bem-vindo(a), ${user.name}!`,
      });
      onLogin({ email: user.email, role: user.role, name: user.name });
    } else {
      toast({
        title: "Erro no login",
        description: "E-mail ou senha incorretos.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/10 to-primary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md card-yooga">
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
            <Button type="submit" className="w-full btn-yooga" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">Usuários de teste:</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="space-y-1">
                <p className="font-medium">Atendimento</p>
                <p>atendimento@yooga.com.br</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium">Pagamento</p>
                <p>pagamento@yooga.com.br</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium">Financeiro</p>
                <p>financeiro@yooga.com.br</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium">Supervisor</p>
                <p>supervisor@yooga.com.br</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Senha: xK%d^nhP5%@#$$@</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}