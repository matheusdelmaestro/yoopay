import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Download, AlertTriangle, CreditCard, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  email: string;
  role: string;
  name: string;
}

interface TransacoesProps {
  user: User;
}

interface Transacao {
  id: string;
  codigoTransacao: string;
  valor: number;
  status: "pago" | "falha_antifraude";
  dataCriacao: string;
  dataEstorno?: string;
  bandeira: string;
  ultimosDigitos: string;
  tentativas: number;
  comprovante?: string;
}

interface Cliente {
  id: string;
  nome: string;
  transacoes: Transacao[];
}

const Transacoes = ({ user }: TransacoesProps) => {
  const [clienteId, setClienteId] = useState("");
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const buscarTransacoes = async () => {
    if (!clienteId.trim()) {
      toast({
        title: "Erro",
        description: "Digite um ID válido para buscar as transações.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Simulação de busca - substitua pela API real
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const clienteEncontrado: Cliente = {
        id: clienteId,
        nome: "João Silva Ltda",
        transacoes: [
          {
            id: "TXN001",
            codigoTransacao: "CC789123456",
            valor: 850.00,
            status: "pago",
            dataCriacao: "2024-01-15T14:30:00",
            bandeira: "Visa",
            ultimosDigitos: "1234",
            tentativas: 1,
            comprovante: "comprovante_txn001.pdf"
          },
          {
            id: "TXN002",
            codigoTransacao: "CC789123457",
            valor: 1200.00,
            status: "falha_antifraude",
            dataCriacao: "2024-01-15T16:15:00",
            bandeira: "Mastercard",
            ultimosDigitos: "5678",
            tentativas: 3,
          },
          {
            id: "TXN003",
            codigoTransacao: "CC789123458",
            valor: 650.50,
            status: "pago",
            dataCriacao: "2024-01-16T09:20:00",
            dataEstorno: "2024-01-16T17:30:00",
            bandeira: "Visa",
            ultimosDigitos: "9876",
            tentativas: 1,
            comprovante: "comprovante_estorno_txn003.pdf"
          }
        ]
      };

      setCliente(clienteEncontrado);
      
      toast({
        title: "Transações encontradas",
        description: `${clienteEncontrado.transacoes.length} transação(ões) encontrada(s) para ${clienteEncontrado.nome}.`,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Cliente não encontrado ou erro na busca.",
        variant: "destructive",
      });
      setCliente(null);
    } finally {
      setLoading(false);
    }
  };

  const downloadComprovante = (transacao: Transacao) => {
    // Simulação de download - substitua pela API real
    toast({
      title: "Download iniciado",
      description: `Comprovante da transação ${transacao.codigoTransacao} está sendo baixado.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pago": return "bg-green-100 text-green-800 border-green-200";
      case "falha_antifraude": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pago": return "Pago";
      case "falha_antifraude": return "Falha Antifraude";
      default: return status;
    }
  };

  const isEstornado = (transacao: Transacao) => !!transacao.dataEstorno;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <CreditCard className="w-6 h-6" />
          Transações
        </h1>
        <p className="text-muted-foreground">Consulte transações de pagamentos online via cartão de crédito</p>
      </div>

      {/* Aviso importante */}
      <Alert className="border-orange-200 bg-orange-50">
        <AlertTriangle className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-800">
          <strong>Importante:</strong> As vendas são estornadas automaticamente somente se forem canceladas no mesmo dia da criação do pedido.
        </AlertDescription>
      </Alert>

      {/* Busca de Cliente */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Buscar Transações por Cliente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="clienteId">ID do Cliente</Label>
              <Input
                id="clienteId"
                placeholder="Digite o ID do cliente"
                value={clienteId}
                onChange={(e) => setClienteId(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && buscarTransacoes()}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={buscarTransacoes} disabled={loading}>
                {loading ? "Buscando..." : "Buscar"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informações do Cliente e Transações */}
      {cliente && (
        <Card>
          <CardHeader>
            <CardTitle>Transações do Cliente</CardTitle>
            <div className="text-lg">
              <span className="font-medium">{cliente.nome}</span>
              <span className="text-muted-foreground ml-2">(ID: {cliente.id})</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código Transação</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Cartão</TableHead>
                    <TableHead>Tentativas</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cliente.transacoes.map((transacao) => (
                    <TableRow key={transacao.id}>
                      <TableCell className="font-mono text-sm">
                        {transacao.codigoTransacao}
                      </TableCell>
                      <TableCell className="font-semibold">
                        R$ {transacao.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        {isEstornado(transacao) && (
                          <div className="text-xs text-red-600 mt-1">
                            Estornado em {new Date(transacao.dataEstorno!).toLocaleDateString('pt-BR')}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(transacao.status)}>
                            {getStatusLabel(transacao.status)}
                          </Badge>
                          {transacao.tentativas > 1 && (
                            <div className="flex items-center gap-1 text-red-600">
                              <AlertCircle className="w-3 h-3" />
                              <span className="text-xs">Múltiplas tentativas</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{transacao.bandeira}</div>
                          <div className="text-muted-foreground">**** {transacao.ultimosDigitos}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={transacao.tentativas > 1 ? "destructive" : "secondary"}>
                          {transacao.tentativas}x
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(transacao.dataCriacao).toLocaleString('pt-BR')}
                      </TableCell>
                      <TableCell>
                        {(transacao.status === "pago" && isEstornado(transacao)) && (
                          <Button 
                            onClick={() => downloadComprovante(transacao)} 
                            variant="outline" 
                            size="sm"
                            className="flex items-center gap-1"
                          >
                            <Download className="w-3 h-3" />
                            Comprovante
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Resumo das tentativas com falha */}
            {cliente.transacoes.some(t => t.status === "falha_antifraude") && (
              <Alert className="mt-4 border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  <strong>Atenção:</strong> Este cliente possui transações com falha no antifraude. 
                  Verifique as tentativas de pagamento para oferecer suporte adequado.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Estatísticas rápidas */}
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
            <CardTitle>Falhas Antifraude</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">12</div>
            <p className="text-xs text-muted-foreground">Últimas 24h</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Transacoes;