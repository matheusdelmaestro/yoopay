import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface User {
  email: string;
  role: string;
  name: string;
}

interface CadastroProps {
  user: User;
}

const Cadastro = ({ user }: CadastroProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Cadastro</h1>
        <p className="text-muted-foreground">Gerencie cadastros de clientes e estabelecimentos</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Novos Cadastros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">Últimas 24h</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total de Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">Ativos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estabelecimentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">Credenciados</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Funcionalidade de cadastro em desenvolvimento...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cadastro;