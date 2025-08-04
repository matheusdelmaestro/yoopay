import { useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  CreditCard,
  Store,
  FileText,
  History,
  Settings,
  LogOut,
  CheckCircle,
  AlertCircle,
  BarChart3
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

interface User {
  email: string;
  role: string;
  name: string;
}

interface AppSidebarProps {
  user: User;
  onLogout: () => void;
}

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard, roles: ["atendimento", "pagamento", "financeiro", "supervisor"] },
  { title: "Cadastro", url: "/cadastro", icon: Users, roles: ["atendimento", "supervisor"] },
  { title: "Pedidos via PIX", url: "/pedidos", icon: ShoppingCart, roles: ["atendimento", "pagamento", "supervisor"] },
  { title: "Transações", url: "/transacoes", icon: CreditCard, roles: ["pagamento", "financeiro", "supervisor"] },
  { title: "Credenciamentos", url: "/credenciamentos", icon: Store, roles: ["pagamento", "supervisor"] },
  { title: "Pendentes", url: "/pendentes", icon: AlertCircle, roles: ["pagamento", "supervisor"] },
  { title: "Repasses", url: "/repasses", icon: FileText, roles: ["financeiro", "supervisor"] },
  { title: "Relatórios", url: "/relatorios", icon: BarChart3, roles: ["financeiro", "supervisor"] },
  { title: "Logs", url: "/logs", icon: History, roles: ["supervisor"] },
];

export function AppSidebar({ user, onLogout }: AppSidebarProps) {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const availableItems = menuItems.filter(item => item.roles.includes(user.role));

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-accent text-accent-foreground font-medium" : "hover:bg-accent/50";

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "supervisor": return "bg-gradient-modern text-white";
      case "financeiro": return "bg-gradient-green-soft text-green-800";
      case "pagamento": return "bg-warning text-warning-foreground";
      case "atendimento": return "bg-green-modern-light text-green-modern-dark";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "supervisor": return "Supervisor";
      case "financeiro": return "Financeiro";
      case "pagamento": return "Pagamento";
      case "atendimento": return "Atendimento";
      default: return role;
    }
  };

  return (
    <Sidebar
      className={collapsed ? "w-14" : "w-64"}
      collapsible="icon"
    >
      <SidebarContent>
        {/* Header com logo e info do usuário */}
        <div className="p-4 border-b border-border">
          {!collapsed && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-modern rounded-lg flex items-center justify-center shadow-green">
                  <span className="text-white font-bold text-sm">Y</span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Yooga Pay</h3>
                  <p className="text-xs text-muted-foreground">Sistema Operacional</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                  {getRoleLabel(user.role)}
                </span>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-8 bg-gradient-modern rounded-lg flex items-center justify-center shadow-green">
                <span className="text-white font-bold text-sm">Y</span>
              </div>
              <div className={`w-2 h-2 rounded-full ${getRoleBadgeColor(user.role)}`}></div>
            </div>
          )}
        </div>

        {/* Menu Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {availableItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="w-4 h-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer com logout */}
        <div className="mt-auto p-4 border-t border-border">
          <Button
            variant="ghost"
            onClick={onLogout}
            className="w-full justify-start text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-4 h-4" />
            {!collapsed && <span className="ml-2">Sair</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}