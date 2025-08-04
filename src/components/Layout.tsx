import { useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { LoginPage } from "@/components/LoginPage";
import { AppSidebar } from "@/components/AppSidebar";
import { Dashboard } from "@/components/Dashboard";
import { useCustomToast } from "@/hooks/useCustomToast";
import { useUserPersistence } from "@/hooks/useUserPersistence";
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
import Footer from "@/components/Footer";

interface User {
  email: string;
  role: string;
  name: string;
}

const Layout = () => {
  const { user, isLoading, login, logout } = useUserPersistence();
  const { success } = useCustomToast();
  const location = useLocation();

  const handleLogin = (userData: User) => {
    login(userData);
  };

  const handleLogout = () => {
    logout();
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

  // Mostrar loading enquanto verifica se há usuário salvo
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar user={user} onLogout={handleLogout} />
        <main className="flex-1 flex flex-col">
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
          <div className="flex-1 p-6">
            {renderPageContent()}
          </div>
          <Footer />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Layout;