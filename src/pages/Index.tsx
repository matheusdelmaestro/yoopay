import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { LoginPage } from "@/components/LoginPage";
import { AppSidebar } from "@/components/AppSidebar";
import { Dashboard } from "@/components/Dashboard";
import { useToast } from "@/hooks/use-toast";

interface User {
  email: string;
  role: string;
  name: string;
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
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
            <div className="flex items-center h-full px-4">
              <SidebarTrigger />
            </div>
          </header>
          <div className="p-6">
            <Dashboard user={user} />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
