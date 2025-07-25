import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Download, User, Clock, Edit } from "lucide-react";

interface User {
  email: string;
  role: string;
  name: string;
}

interface LogsProps {
  user: User;
}

const Logs = ({ user }: LogsProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [logs] = useState([
    {
      id: 1,
      usuario: "Maria Silva",
      acao: "Aprovação de Credenciamento",
      detalhes: "Aprovou credenciamento do cliente João Santos (ID: CRED001)",
      data: "25/01/2025",
      hora: "14:35:22",
      tipo: "aprovacao"
    },
    {
      id: 2,
      usuario: "Carlos Oliveira",
      acao: "Processamento de Repasse",
      detalhes: "Processou repasse de R$ 1.250,00 para cliente Pedro Costa (REP003)",
      data: "25/01/2025",
      hora: "13:20:15",
      tipo: "processamento"
    },
    {
      id: 3,
      usuario: "Ana Lima",
      acao: "Rejeição de Solicitação",
      detalhes: "Rejeitou solicitação de pagamento PIX001234 - Documentos pendentes",
      data: "25/01/2025",
      hora: "12:45:08",
      tipo: "rejeicao"
    },
    {
      id: 4,
      usuario: "Roberto Santos",
      acao: "Alteração de Status",
      detalhes: "Alterou status da transação TXN5678 de 'Pendente' para 'Processando'",
      data: "25/01/2025",
      hora: "11:30:44",
      tipo: "alteracao"
    },
    {
      id: 5,
      usuario: "Lucia Costa",
      acao: "Cadastro de Cliente",
      detalhes: "Cadastrou novo cliente: Marina Fernandes (CPF: ***.123.456-**)",
      data: "24/01/2025",
      hora: "16:15:33",
      tipo: "cadastro"
    },
    {
      id: 6,
      usuario: "Fernando Lima",
      acao: "Aprovação de Transação",
      detalhes: "Aprovou transação de R$ 2.890,50 para cliente Tech Solutions LTDA",
      data: "24/01/2025",
      hora: "15:22:17",
      tipo: "aprovacao"
    }
  ]);

  const filteredLogs = logs.filter(log => 
    log.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.acao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.detalhes.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getActionBadgeColor = (tipo: string) => {
    switch (tipo) {
      case "aprovacao": return "bg-success/10 text-success";
      case "rejeicao": return "bg-destructive/10 text-destructive";
      case "processamento": return "bg-info/10 text-info";
      case "alteracao": return "bg-warning/10 text-warning";
      case "cadastro": return "bg-primary/10 text-primary";
      default: return "bg-muted/10 text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Logs de Auditoria</h1>
        <p className="text-muted-foreground">Registro completo de todas as ações realizadas no sistema</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ações Hoje</CardTitle>
            <Edit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+8% vs ontem</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Operadores online</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprovações</CardTitle>
            <Badge className="bg-success/10 text-success">Hoje</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">75% do total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Última Atividade</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14:35</div>
            <p className="text-xs text-muted-foreground">Maria Silva</p>
          </CardContent>
        </Card>
      </div>

      {/* Busca e Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtrar Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              placeholder="Buscar por usuário, ação ou detalhes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filtros
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Exportar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Ações</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Ação</TableHead>
                <TableHead>Detalhes</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Hora</TableHead>
                <TableHead>Tipo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.usuario}</TableCell>
                  <TableCell>{log.acao}</TableCell>
                  <TableCell className="max-w-xs truncate">{log.detalhes}</TableCell>
                  <TableCell>{log.data}</TableCell>
                  <TableCell>{log.hora}</TableCell>
                  <TableCell>
                    <Badge className={getActionBadgeColor(log.tipo)}>
                      {log.tipo}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredLogs.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum log encontrado para os critérios de busca
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Logs;