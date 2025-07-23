import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  ShoppingCart, 
  CreditCard, 
  Store, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";

interface User {
  email: string;
  role: string;
  name: string;
}

interface DashboardProps {
  user: User;
}

export function Dashboard({ user }: DashboardProps) {
  const [stats, setStats] = useState({
    totalClientes: 0,
    pedidosPendentes: 0,
    transacoesHoje: 0,
    credenciamentosAbertos: 0,
    faturamentoMes: 0,
    alertasCriticos: 0
  });

  // Mock data - será substituído por dados reais do Supabase
  useEffect(() => {
    const mockStats = {
      totalClientes: 2847,
      pedidosPendentes: 23,
      transacoesHoje: 156,
      credenciamentosAbertos: 8,
      faturamentoMes: 2847392.50,
      alertasCriticos: 3
    };
    setStats(mockStats);
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getRoleSpecificCards = () => {
    const baseCards = [
      {
        title: "Total de Clientes",
        value: stats.totalClientes.toLocaleString(),
        icon: Users,
        change: "+12% este mês",
        color: "text-primary"
      },
      {
        title: "Faturamento do Mês",
        value: formatCurrency(stats.faturamentoMes),
        icon: TrendingUp,
        change: "+8.2% vs mês anterior",
        color: "text-success"
      }
    ];

    switch (user.role) {
      case "atendimento":
        return [
          ...baseCards,
          {
            title: "Pedidos Pendentes",
            value: stats.pedidosPendentes.toString(),
            icon: ShoppingCart,
            change: "Requer atenção",
            color: "text-warning"
          },
          {
            title: "Alertas Críticos",
            value: stats.alertasCriticos.toString(),
            icon: AlertCircle,
            change: "Verificar urgente",
            color: "text-destructive"
          }
        ];

      case "pagamento":
        return [
          ...baseCards,
          {
            title: "Transações Hoje",
            value: stats.transacoesHoje.toString(),
            icon: CreditCard,
            change: "+15% vs ontem",
            color: "text-primary"
          },
          {
            title: "Credenciamentos Abertos",
            value: stats.credenciamentosAbertos.toString(),
            icon: Store,
            change: "Aguardando análise",
            color: "text-warning"
          }
        ];

      case "financeiro":
        return [
          ...baseCards,
          {
            title: "Transações Hoje",
            value: stats.transacoesHoje.toString(),
            icon: CreditCard,
            change: "+15% vs ontem",
            color: "text-primary"
          },
          {
            title: "Repasses Pendentes",
            value: "12",
            icon: Clock,
            change: "Para hoje",
            color: "text-warning"
          }
        ];

      case "supervisor":
        return [
          ...baseCards,
          {
            title: "Transações Hoje",
            value: stats.transacoesHoje.toString(),
            icon: CreditCard,
            change: "+15% vs ontem",
            color: "text-primary"
          },
          {
            title: "Credenciamentos Abertos",
            value: stats.credenciamentosAbertos.toString(),
            icon: Store,
            change: "Aguardando análise",
            color: "text-warning"
          }
        ];

      default:
        return baseCards;
    }
  };

  const cards = getRoleSpecificCards();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Bem-vindo(a), {user.name}! Aqui está um resumo das atividades recentes.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <Card key={index} className="card-yooga">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{card.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="card-yooga">
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {user.role === "atendimento" && (
              <>
                <div className="p-4 border border-border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors">
                  <div className="flex items-center space-x-3">
                    <Users className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-medium">Novo Cadastro</h3>
                      <p className="text-sm text-muted-foreground">Cadastrar novo cliente</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 border border-border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors">
                  <div className="flex items-center space-x-3">
                    <ShoppingCart className="h-8 w-8 text-warning" />
                    <div>
                      <h3 className="font-medium">Verificar Pedidos</h3>
                      <p className="text-sm text-muted-foreground">Ver pedidos pendentes</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {user.role === "pagamento" && (
              <>
                <div className="p-4 border border-border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors">
                  <div className="flex items-center space-x-3">
                    <Store className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-medium">Novo Credenciamento</h3>
                      <p className="text-sm text-muted-foreground">Credenciar nova loja</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 border border-border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-8 w-8 text-success" />
                    <div>
                      <h3 className="font-medium">Verificar Pagamento</h3>
                      <p className="text-sm text-muted-foreground">Validar transação</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {user.role === "financeiro" && (
              <>
                <div className="p-4 border border-border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-8 w-8 text-warning" />
                    <div>
                      <h3 className="font-medium">Repasses Pendentes</h3>
                      <p className="text-sm text-muted-foreground">Processar repasses</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 border border-border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-8 w-8 text-success" />
                    <div>
                      <h3 className="font-medium">Relatório Financeiro</h3>
                      <p className="text-sm text-muted-foreground">Gerar relatório</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {user.role === "supervisor" && (
              <>
                <div className="p-4 border border-border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors">
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="h-8 w-8 text-destructive" />
                    <div>
                      <h3 className="font-medium">Revisar Logs</h3>
                      <p className="text-sm text-muted-foreground">Auditoria de ações</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 border border-border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-8 w-8 text-success" />
                    <div>
                      <h3 className="font-medium">Aprovar Pendências</h3>
                      <p className="text-sm text-muted-foreground">Revisar aprovações</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="card-yooga">
        <CardHeader>
          <CardTitle>Atividade Recente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Pagamento aprovado - Loja ABC</p>
                <p className="text-xs text-muted-foreground">há 5 minutos</p>
              </div>
              <Badge className="status-success">Aprovado</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Credenciamento pendente - Restaurante XYZ</p>
                <p className="text-xs text-muted-foreground">há 12 minutos</p>
              </div>
              <Badge className="status-warning">Pendente</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Novo cadastro realizado - Cliente 123</p>
                <p className="text-xs text-muted-foreground">há 23 minutos</p>
              </div>
              <Badge className="status-pending">Processado</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}