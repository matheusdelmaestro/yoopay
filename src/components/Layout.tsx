import { useState } from "react";
import { useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { LoginPage } from "@/components/LoginPage";
import { AppSidebar } from "@/components/AppSidebar";
import { Dashboard } from "@/components/Dashboard";
import { useCustomToast } from "@/hooks/useCustomToast";
import { ThemeToggle } from "@/components/ThemeToggle";
import Cadastro from "@/pages/Cadastro";
import Pedidos from "@/pages/Pedidos";
import Transacoes from "@/pages/Transacoes";
import Credenciamentos from "@/pages/Credenciamentos";
import Pendentes from "@/pages/Pendentes";
import Repasses from "@/pages/Repasses";
import Logs from "@/pages/Logs";
import Relatorios from "@/pages/Relatorios";
import yoogaLogo from "@/assets/yooga-logo-exact.png";

interface User {
  email: string;
  role: string;
  name: string;
}

const Layout = () => {
  const [user, setUser] = useState<User | null>(null);
  const { success } = useCustomToast();
  const location = useLocation();

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    success({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
  };

  const renderPageContent = () => {
    if (!user) return null;

    const path = location.pathname;
    
    switch (path) {
      case "/":
        return <Dashboard user={user} />;
      case "/cadastro":
        return <Cadastro user={user} />;
      case "/pedidos":
        return <Pedidos user={user} />;
      case "/transacoes":
        return <Transacoes user={user} />;
      case "/credenciamentos":
        return <Credenciamentos user={user} />;
      case "/pendentes":
        return <Pendentes user={user} />;
      case "/repasses":
        return <Repasses user={user} />;
      case "/relatorios":
        return <Relatorios user={user} />;
      case "/logs":
        return <Logs user={user} />;
      default:
        return <Dashboard user={user} />;
    }
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar user={user} onLogout={handleLogout} />
        <main className="flex-1">
          <header className="h-14 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
            <div className="flex items-center justify-between h-full px-4">
              <div className="flex items-center gap-3">
                <SidebarTrigger />
                <img 
                  src={yoogaLogo} 
                  alt="Yooga" 
                  className="h-8 w-auto object-contain"
                />
              </div>
              <ThemeToggle />
            </div>
          </header>
          <div className="p-6">
            {renderPageContent()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Layout;