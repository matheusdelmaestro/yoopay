import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface User {
  email: string;
  role: string;
  name: string;
}

interface TransacoesProps {
  user: User;
}

const Transacoes = ({ user }: TransacoesProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Transações</h1>
        <p className="text-muted-foreground">Controle de transações financeiras</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Transações Hoje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">+8% vs ontem</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Volume Processado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 45.890</div>
            <p className="text-xs text-muted-foreground">Hoje</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Taxa de Sucesso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-muted-foreground">Últimas 24h</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Aguardando confirmação</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Últimas Transações</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Histórico de transações em desenvolvimento...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Transacoes;