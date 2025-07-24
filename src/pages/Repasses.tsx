import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface User {
  email: string;
  role: string;
  name: string;
}

interface RepassesProps {
  user: User;
}

const Repasses = ({ user }: RepassesProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Repasses</h1>
        <p className="text-muted-foreground">Consulte repasses financeiros realizados para os clientes</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Repasses Hoje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 28.450</div>
            <p className="text-xs text-muted-foreground">15 transações</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 5.230</div>
            <p className="text-xs text-muted-foreground">3 repasses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Este Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 124.890</div>
            <p className="text-xs text-muted-foreground">+15% vs mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Taxa Média</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.8%</div>
            <p className="text-xs text-muted-foreground">Comissão</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Repasses</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Relatório de repasses em desenvolvimento...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Repasses;