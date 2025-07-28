import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Download, User, Clock, Edit, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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
      tipo: "aprovacao",
      detalhesCompletos: {
        ipOrigem: "192.168.1.100",
        navegador: "Chrome 120.0.0",
        sistemaOperacional: "Windows 11",
        localizacao: "São Paulo, SP",
        documentosAnalisados: ["RG", "CPF", "Comprovante de Residência"],
        observacoes: "Cliente atendeu todos os requisitos para credenciamento",
        valorLimite: "R$ 50.000,00"
      }
    },
    {
      id: 2,
      usuario: "Carlos Oliveira",
      acao: "Processamento de Repasse",
      detalhes: "Processou repasse de R$ 1.250,00 para cliente Pedro Costa (REP003)",
      data: "25/01/2025",
      hora: "13:20:15",
      tipo: "processamento",
      detalhesCompletos: {
        ipOrigem: "192.168.1.105",
        navegador: "Firefox 120.0",
        sistemaOperacional: "macOS Monterey",
        localizacao: "Rio de Janeiro, RJ",
        valorTransacao: "R$ 1.250,00",
        clienteDestino: "Pedro Costa",
        contaBancaria: "Banco do Brasil - Ag: 1234-5, Conta: 12345-6",
        chavePix: "pedro.costa@email.com",
        observacoes: "Repasse processado com sucesso via API bancária"
      }
    },
    {
      id: 3,
      usuario: "Ana Lima",
      acao: "Rejeição de Solicitação",
      detalhes: "Rejeitou solicitação de pagamento PIX001234 - Documentos pendentes",
      data: "25/01/2025",
      hora: "12:45:08",
      tipo: "rejeicao",
      detalhesCompletos: {
        ipOrigem: "192.168.1.110",
        navegador: "Chrome 120.0.0",
        sistemaOperacional: "Windows 10",
        localizacao: "Belo Horizonte, MG",
        solicitacaoId: "PIX001234",
        motivoRejeicao: "Documentos pendentes",
        documentosFaltando: ["Comprovante de Renda", "Declaração IR"],
        valorSolicitado: "R$ 5.000,00",
        observacoes: "Cliente precisa enviar documentação complementar para análise"
      }
    },
    {
      id: 4,
      usuario: "Roberto Santos",
      acao: "Alteração de Status",
      detalhes: "Alterou status da transação TXN5678 de 'Pendente' para 'Processando'",
      data: "25/01/2025",
      hora: "11:30:44",
      tipo: "alteracao",
      detalhesCompletos: {
        ipOrigem: "192.168.1.115",
        navegador: "Chrome 120.0.0",
        sistemaOperacional: "Ubuntu 22.04",
        localizacao: "Curitiba, PR",
        transacaoId: "TXN5678",
        statusAnterior: "Pendente",
        statusNovo: "Processando",
        motivoAlteracao: "Documentação aprovada pela equipe de compliance",
        observacoes: "Transação liberada para processamento automático"
      }
    },
    {
      id: 5,
      usuario: "Lucia Costa",
      acao: "Cadastro de Cliente",
      detalhes: "Cadastrou novo cliente: Marina Fernandes (CPF: ***.123.456-**)",
      data: "24/01/2025",
      hora: "16:15:33",
      tipo: "cadastro",
      detalhesCompletos: {
        ipOrigem: "192.168.1.120",
        navegador: "Safari 17.0",
        sistemaOperacional: "iOS 17.0",
        localizacao: "Salvador, BA",
        nomeCompleto: "Marina Fernandes Silva",
        cpf: "123.456.789-00",
        email: "marina.fernandes@email.com",
        telefone: "(71) 99999-9999",
        endereco: "Rua das Flores, 123 - Salvador/BA",
        observacoes: "Cliente cadastrado com todos os documentos válidos"
      }
    },
    {
      id: 6,
      usuario: "Fernando Lima",
      acao: "Aprovação de Transação",
      detalhes: "Aprovou transação de R$ 2.890,50 para cliente Tech Solutions LTDA",
      data: "24/01/2025",
      hora: "15:22:17",
      tipo: "aprovacao",
      detalhesCompletos: {
        ipOrigem: "192.168.1.125",
        navegador: "Edge 120.0.0",
        sistemaOperacional: "Windows 11",
        localizacao: "Brasília, DF",
        clienteEmpresa: "Tech Solutions LTDA",
        cnpj: "12.345.678/0001-99",
        valorTransacao: "R$ 2.890,50",
        tipoTransacao: "Transferência PIX",
        motivoAprovacao: "Transação dentro dos limites estabelecidos",
        observacoes: "Aprovação automática por valor e histórico do cliente"
      }
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
                <TableHead>Ações</TableHead>
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
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Detalhes do Log - {log.acao}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold mb-2">Informações Básicas</h4>
                              <div className="space-y-2 text-sm">
                                <div><strong>Usuário:</strong> {log.usuario}</div>
                                <div><strong>Ação:</strong> {log.acao}</div>
                                <div><strong>Data/Hora:</strong> {log.data} às {log.hora}</div>
                                <div><strong>Tipo:</strong> 
                                  <Badge className={`ml-2 ${getActionBadgeColor(log.tipo)}`}>
                                    {log.tipo}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Informações Técnicas</h4>
                              <div className="space-y-2 text-sm">
                                <div><strong>IP de Origem:</strong> {log.detalhesCompletos.ipOrigem}</div>
                                <div><strong>Navegador:</strong> {log.detalhesCompletos.navegador}</div>
                                <div><strong>Sistema:</strong> {log.detalhesCompletos.sistemaOperacional}</div>
                                <div><strong>Localização:</strong> {log.detalhesCompletos.localizacao}</div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-2">Detalhes da Ação</h4>
                            <p className="text-sm bg-muted p-3 rounded">{log.detalhes}</p>
                          </div>

                          {/* Informações específicas por tipo */}
                          <div>
                            <h4 className="font-semibold mb-2">Informações Específicas</h4>
                            <div className="space-y-2 text-sm bg-muted/50 p-3 rounded">
                              {Object.entries(log.detalhesCompletos).map(([key, value]) => {
                                if (["ipOrigem", "navegador", "sistemaOperacional", "localizacao"].includes(key)) {
                                  return null;
                                }
                                return (
                                  <div key={key}>
                                    <strong className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</strong>{" "}
                                    {Array.isArray(value) ? value.join(", ") : value}
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {log.detalhesCompletos.observacoes && (
                            <div>
                              <h4 className="font-semibold mb-2">Observações</h4>
                              <p className="text-sm bg-info/10 text-info p-3 rounded border border-info/20">
                                {log.detalhesCompletos.observacoes}
                              </p>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
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