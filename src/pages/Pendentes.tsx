import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface User {
  email: string;
  role: string;
  name: string;
}

interface PendentesProps {
  user: User;
}

const Pendentes = ({ user }: PendentesProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Pendentes</h1>
        <p className="text-muted-foreground">Gerencie itens pendentes de aprovação</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Pagamentos Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Aguardando confirmação</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Credenciamentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Em análise</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Documentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">Aguardando validação</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Itens Pendentes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Lista de itens pendentes em desenvolvimento...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Pendentes;