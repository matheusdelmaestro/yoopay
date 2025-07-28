import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, FileX } from "lucide-react";

interface User {
  email: string;
  role: string;
  name: string;
}

interface PendentesProps {
  user: User;
}

const Pendentes = ({ user }: PendentesProps) => {
  const repassesFalhados = [
    {
      id: "REP006",
      cliente: "Tech Solutions LTDA",
      valor: "R$ 3.200,00",
      tentativa: "26/01/2025 09:15",
      motivo: "Chave PIX incorreta",
      tipo: "pix_invalido",
      detalhes: "Chave PIX informada não existe ou está inativa"
    },
    {
      id: "REP007", 
      cliente: "Maria Fernandes",
      valor: "R$ 850,00",
      tentativa: "26/01/2025 08:30",
      motivo: "Dados bancários incorretos",
      tipo: "dados_bancarios",
      detalhes: "Agência ou conta bancária inválida"
    },
    {
      id: "REP008",
      cliente: "Carlos Silva & Associados",
      valor: "R$ 1.750,00", 
      tentativa: "25/01/2025 17:45",
      motivo: "Conta bloqueada",
      tipo: "conta_bloqueada",
      detalhes: "Conta bancária encontra-se bloqueada pelo banco"
    },
    {
      id: "REP009",
      cliente: "Josefa Santos",
      valor: "R$ 420,00",
      tentativa: "25/01/2025 16:20",
      motivo: "CPF bloqueado na Receita",
      tipo: "cpf_bloqueado", 
      detalhes: "CPF com pendências na Receita Federal"
    }
  ];

  const getErrorBadgeColor = (tipo: string) => {
    switch (tipo) {
      case "pix_invalido": return "bg-destructive/10 text-destructive";
      case "dados_bancarios": return "bg-warning/10 text-warning";
      case "conta_bloqueada": return "bg-orange-500/10 text-orange-500";
      case "cpf_bloqueado": return "bg-red-500/10 text-red-500";
      default: return "bg-muted/10 text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Pendentes</h1>
        <p className="text-muted-foreground">Repasses que falharam e aguardam resolução</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Repasses Falhados</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Aguardando correção</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
            <FileX className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 6.220</div>
            <p className="text-xs text-muted-foreground">Em repasses pendentes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mais Antigo</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2 dias</div>
            <p className="text-xs text-muted-foreground">Desde a primeira tentativa</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Erro</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12%</div>
            <p className="text-xs text-muted-foreground">Dos repasses tentados</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Repasses com Falha</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Última Tentativa</TableHead>
                <TableHead>Motivo</TableHead>
                <TableHead>Detalhes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {repassesFalhados.map((repasse) => (
                <TableRow key={repasse.id}>
                  <TableCell className="font-medium">{repasse.id}</TableCell>
                  <TableCell>{repasse.cliente}</TableCell>
                  <TableCell>{repasse.valor}</TableCell>
                  <TableCell>{repasse.tentativa}</TableCell>
                  <TableCell>
                    <Badge className={getErrorBadgeColor(repasse.tipo)}>
                      {repasse.motivo}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs">{repasse.detalhes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Pendentes;