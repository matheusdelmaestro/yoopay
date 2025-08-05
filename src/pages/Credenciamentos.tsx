import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { QrCode, CreditCard, Store, CheckCircle, XCircle, Clock, Eye, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { usePixValidation } from "@/hooks/usePixValidation";

interface User {
  email: string;
  role: string;
  name: string;
}

interface CredenciamentosProps {
  user: User;
}

interface CredenciamentoPix {
  id: string;
  clienteNome: string;
  clienteId: string;
  documento: string;
  dataSolicitacao: string;
  status: "pendente" | "aprovado" | "rejeitado";
  dadosBancarios: {
    nomeBanco: string;
    numeroBanco: string;
    agencia: string;
    conta: string;
    digitoConta: string;
    chavePix: string;
    tipoChave: string;
    nomeBeneficiario: string;
    documentoBeneficiario: string;
  };
}

interface CredenciamentoCredito {
  id: string;
  clienteNome: string;
  clienteId: string;
  documento: string;
  dataSolicitacao: string;
  status: "analise" | "aprovado" | "rejeitado";
  dadosMovimentacao: {
    faturamentoMensal: number;
    tempoAtividade: string;
    ticketMedio: number;
    volumeTransacoes: number;
  };
  resultadoAnalise?: {
    score: number;
    recomendacao: "aprovar" | "rejeitar" | "manter_analise";
    observacoes: string;
  };
}

const Credenciamentos = ({ user }: CredenciamentosProps) => {
  console.log('Credenciamentos component rendered with user:', user);
  
  const { toast } = useToast();

  // Dados simulados para PIX como fallback
  const pixFallback = {
    pendingRequests: [],
    loading: false,
    fetchPendingRequests: () => {
      console.log('fetchPendingRequests called - using simulated data');
      toast({
        title: "Modo Simulação",
        description: "Usando dados simulados",
      });
    },
    approveRequest: (id: string) => {
      console.log('approveRequest called for:', id);
      toast({
        title: "Simulação",
        description: `Credenciamento ${id} aprovado (simulação)`,
      });
    },
    rejectRequest: (id: string) => {
      console.log('rejectRequest called for:', id);
      toast({
        title: "Simulação", 
        description: `Credenciamento ${id} rejeitado (simulação)`,
      });
    },
    parsePayload: () => null
  };

  // Inicialização segura dos hooks
  let pixValidationHooks;
  try {
    console.log('Trying to initialize usePixValidation...');
    pixValidationHooks = usePixValidation();
    console.log('usePixValidation initialized successfully');
  } catch (error) {
    console.error('Error initializing usePixValidation:', error);
    pixValidationHooks = pixFallback;
  }

  const { 
    pendingRequests, 
    loading, 
    fetchPendingRequests, 
    approveRequest, 
    rejectRequest, 
    parsePayload 
  } = pixValidationHooks;

  // Estado para controlar se é a primeira vez que a página carrega
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // Carregar dados apenas na primeira vez que o componente monta
  useEffect(() => {
    if (isFirstLoad) {
      try {
        fetchPendingRequests();
        setIsFirstLoad(false);
      } catch (error) {
        console.error('Error fetching pending requests:', error);
      }
    }
  }, [fetchPendingRequests, isFirstLoad]);

  // Dados simulados para credenciamentos Crédito
  const credenciamentosCredito: CredenciamentoCredito[] = [
    {
      id: "CC001",
      clienteNome: "Tech Solutions Ltda",
      clienteId: "CLI003",
      documento: "11.222.333/0001-44",
      dataSolicitacao: "2024-01-15T09:15:00",
      status: "analise",
      dadosMovimentacao: {
        faturamentoMensal: 150000,
        tempoAtividade: "3 anos",
        ticketMedio: 250.50,
        volumeTransacoes: 600
      },
      resultadoAnalise: {
        score: 8.5,
        recomendacao: "aprovar",
        observacoes: "Cliente com bom histórico e movimento consistente."
      }
    },
    {
      id: "CC002",
      clienteNome: "Startup Inovadora",
      clienteId: "CLI004",
      documento: "55.666.777/0001-88",
      dataSolicitacao: "2024-01-14T16:45:00",
      status: "analise",
      dadosMovimentacao: {
        faturamentoMensal: 25000,
        tempoAtividade: "6 meses",
        ticketMedio: 89.90,
        volumeTransacoes: 278
      },
      resultadoAnalise: {
        score: 6.2,
        recomendacao: "manter_analise",
        observacoes: "Cliente novo, necessita mais tempo de observação."
      }
    }
  ];

  const processarCredenciamentoCredito = (id: string, acao: "aprovar" | "rejeitar" | "manter_analise") => {
    const acoes = {
      aprovar: "aprovado",
      rejeitar: "rejeitado", 
      manter_analise: "mantido em análise"
    };

    toast({
      title: "Credenciamento processado",
      description: `Credenciamento Crédito ${id} foi ${acoes[acao]}.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendente": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "analise": return "bg-blue-100 text-blue-800 border-blue-200";
      case "aprovado": return "bg-green-100 text-green-800 border-green-200";
      case "rejeitado": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pendente": return "Pendente";
      case "analise": return "Em Análise";
      case "aprovado": return "Aprovado";
      case "rejeitado": return "Rejeitado";
      default: return status;
    }
  };

  const getRecomendacaoColor = (recomendacao: string) => {
    switch (recomendacao) {
      case "aprovar": return "text-green-600";
      case "rejeitar": return "text-red-600";
      case "manter_analise": return "text-yellow-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Store className="w-6 h-6" />
          Credenciamentos
        </h1>
        <p className="text-muted-foreground">Gerencie credenciamentos de novos clientes</p>
      </div>

      <Tabs defaultValue="pix" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pix" className="flex items-center gap-2">
            <QrCode className="w-4 h-4" />
            PIX Online
          </TabsTrigger>
          <TabsTrigger value="credito" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Crédito Online
          </TabsTrigger>
        </TabsList>

        {/* Tab PIX Online */}
        <TabsContent value="pix" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <QrCode className="w-5 h-5" />
                    Credenciamentos PIX Pendentes
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Analise e aprove credenciamentos PIX verificando se os dados bancários estão corretos
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={fetchPendingRequests}
                  disabled={loading}
                  size="sm"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  Atualizar Lista
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Documento</TableHead>
                      <TableHead>Data Solicitação</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingRequests.length === 0 && !loading ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          Nenhuma solicitação pendente encontrada
                        </TableCell>
                      </TableRow>
                    ) : (
                      pendingRequests.map((request) => {
                        const payloadData = parsePayload(request.payload);
                        return (
                          <TableRow key={request.id}>
                            <TableCell>
                              <div>
                                <div className="font-medium">{payloadData?.tradeName || 'N/A'}</div>
                                <div className="text-sm text-muted-foreground">ID: {request.originId}</div>
                              </div>
                            </TableCell>
                            <TableCell>{payloadData?.document || 'N/A'}</TableCell>
                            <TableCell>
                              {new Date(request.createdAt).toLocaleDateString('pt-BR')}
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                                Pendente
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="sm">
                                      <Eye className="w-3 h-3 mr-1" />
                                      Ver Dados
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-2xl">
                                    <DialogHeader>
                                      <DialogTitle>Dados Bancários - {payloadData?.tradeName}</DialogTitle>
                                    </DialogHeader>
                                    {payloadData?.bank && (
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <Label className="text-sm font-medium text-muted-foreground">Nome do Banco</Label>
                                          <p className="font-medium">{payloadData.bank.bankName || 'N/A'}</p>
                                        </div>
                                        <div>
                                          <Label className="text-sm font-medium text-muted-foreground">Número do Banco</Label>
                                          <p className="font-medium">{payloadData.bank.bankNumber || 'N/A'}</p>
                                        </div>
                                        <div>
                                          <Label className="text-sm font-medium text-muted-foreground">Agência</Label>
                                          <p className="font-medium">{payloadData.bank.agency || 'N/A'}</p>
                                        </div>
                                        <div>
                                          <Label className="text-sm font-medium text-muted-foreground">Conta</Label>
                                          <p className="font-medium">{payloadData.bank.account || 'N/A'}-{payloadData.bank.accountDigit || 'N/A'}</p>
                                        </div>
                                        <div>
                                          <Label className="text-sm font-medium text-muted-foreground">Tipo da Chave PIX</Label>
                                          <p className="font-medium">{payloadData.bank.pixKeyType?.toUpperCase() || 'N/A'}</p>
                                        </div>
                                        <div>
                                          <Label className="text-sm font-medium text-muted-foreground">Chave PIX</Label>
                                          <p className="font-medium font-mono text-sm">{payloadData.bank.pixKey || 'N/A'}</p>
                                        </div>
                                        <div>
                                          <Label className="text-sm font-medium text-muted-foreground">Nome do Beneficiário</Label>
                                          <p className="font-medium">{payloadData.bank.holderName || 'N/A'}</p>
                                        </div>
                                        <div>
                                          <Label className="text-sm font-medium text-muted-foreground">Documento do Beneficiário</Label>
                                          <p className="font-medium">{payloadData.bank.holderDocument || 'N/A'}</p>
                                        </div>
                                      </div>
                                    )}
                                    <div className="flex justify-end gap-2 mt-6">
                                      <Button 
                                        variant="destructive" 
                                        onClick={() => rejectRequest(request.originId)}
                                      >
                                        <XCircle className="w-4 h-4 mr-1" />
                                        Rejeitar
                                      </Button>
                                      <Button 
                                        onClick={() => approveRequest(request.originId)}
                                      >
                                        <CheckCircle className="w-4 h-4 mr-1" />
                                        Aprovar
                                      </Button>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Crédito Online */}
        <TabsContent value="credito" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Credenciamentos Crédito em Análise
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Analise baseada em dados de movimentação e vendas dos clientes
              </p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Documento</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Recomendação</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {credenciamentosCredito.map((credenciamento) => (
                      <TableRow key={credenciamento.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{credenciamento.clienteNome}</div>
                            <div className="text-sm text-muted-foreground">ID: {credenciamento.clienteId}</div>
                          </div>
                        </TableCell>
                        <TableCell>{credenciamento.documento}</TableCell>
                        <TableCell>
                          {credenciamento.resultadoAnalise && (
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">
                                {credenciamento.resultadoAnalise.score}/10
                              </Badge>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {credenciamento.resultadoAnalise && (
                            <span className={`font-medium ${getRecomendacaoColor(credenciamento.resultadoAnalise.recomendacao)}`}>
                              {credenciamento.resultadoAnalise.recomendacao === "aprovar" && "Aprovar"}
                              {credenciamento.resultadoAnalise.recomendacao === "rejeitar" && "Rejeitar"}
                              {credenciamento.resultadoAnalise.recomendacao === "manter_analise" && "Manter em Análise"}
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(credenciamento.status)}>
                            {getStatusLabel(credenciamento.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Eye className="w-3 h-3 mr-1" />
                                  Ver Análise
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Análise de Credenciamento - {credenciamento.clienteNome}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-sm font-medium text-muted-foreground">Faturamento Mensal</Label>
                                      <p className="font-medium">R$ {credenciamento.dadosMovimentacao.faturamentoMensal.toLocaleString('pt-BR')}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium text-muted-foreground">Tempo de Atividade</Label>
                                      <p className="font-medium">{credenciamento.dadosMovimentacao.tempoAtividade}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium text-muted-foreground">Ticket Médio</Label>
                                      <p className="font-medium">R$ {credenciamento.dadosMovimentacao.ticketMedio.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium text-muted-foreground">Volume de Transações</Label>
                                      <p className="font-medium">{credenciamento.dadosMovimentacao.volumeTransacoes}/mês</p>
                                    </div>
                                  </div>
                                  
                                  {credenciamento.resultadoAnalise && (
                                    <div className="border-t pt-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <Label className="text-sm font-medium text-muted-foreground">Score da Análise</Label>
                                          <p className="font-medium text-lg">{credenciamento.resultadoAnalise.score}/10</p>
                                        </div>
                                        <div>
                                          <Label className="text-sm font-medium text-muted-foreground">Recomendação</Label>
                                          <p className={`font-medium ${getRecomendacaoColor(credenciamento.resultadoAnalise.recomendacao)}`}>
                                            {credenciamento.resultadoAnalise.recomendacao === "aprovar" && "Aprovar Credenciamento"}
                                            {credenciamento.resultadoAnalise.recomendacao === "rejeitar" && "Rejeitar Credenciamento"}
                                            {credenciamento.resultadoAnalise.recomendacao === "manter_analise" && "Manter em Análise"}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="mt-4">
                                        <Label className="text-sm font-medium text-muted-foreground">Observações</Label>
                                        <p className="text-sm mt-1">{credenciamento.resultadoAnalise.observacoes}</p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <div className="flex justify-end gap-2 mt-6">
                                  <Button 
                                    variant="destructive" 
                                    onClick={() => processarCredenciamentoCredito(credenciamento.id, "rejeitar")}
                                  >
                                    <XCircle className="w-4 h-4 mr-1" />
                                    Rejeitar
                                  </Button>
                                  <Button 
                                    variant="outline"
                                    onClick={() => processarCredenciamentoCredito(credenciamento.id, "manter_analise")}
                                  >
                                    <Clock className="w-4 h-4 mr-1" />
                                    Manter Análise
                                  </Button>
                                  <Button 
                                    onClick={() => processarCredenciamentoCredito(credenciamento.id, "aprovar")}
                                  >
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    Aprovar
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Estatísticas */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Novos Credenciamentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Esta semana</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Em Análise</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Aguardando aprovação</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">Estabelecimentos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Taxa de Aprovação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">Último mês</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Credenciamentos;