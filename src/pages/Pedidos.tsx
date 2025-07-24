import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Search, Download, AlertTriangle, QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  email: string;
  role: string;
  name: string;
}

interface PedidosProps {
  user: User;
}

interface Pedido {
  id: string;
  clienteId: string;
  clienteNome: string;
  valor: number;
  status: "pago" | "pendente" | "estornado";
  dataCriacao: string;
  dataEstorno?: string;
  chavePix: string;
  comprovante?: string;
}

const Pedidos = ({ user }: PedidosProps) => {
  const [pedidoId, setPedidoId] = useState("");
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const buscarPedido = async () => {
    if (!pedidoId.trim()) {
      toast({
        title: "Erro",
        description: "Digite um ID válido para buscar o pedido.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Simulação de busca - substitua pela API real
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const pedidoEncontrado: Pedido = {
        id: pedidoId,
        clienteId: "CLI001",
        clienteNome: "João Silva Ltda",
        valor: 1250.50,
        status: Math.random() > 0.6 ? "pago" : Math.random() > 0.3 ? "pendente" : "estornado",
        dataCriacao: "2024-01-15T10:30:00",
        chavePix: "12345678000190",
        comprovante: "comprovante_estorno_12345.pdf"
      };

      if (pedidoEncontrado.status === "estornado") {
        pedidoEncontrado.dataEstorno = "2024-01-15T15:45:00";
      }

      setPedido(pedidoEncontrado);
      
      toast({
        title: "Pedido encontrado",
        description: `Pedido ${pedidoEncontrado.id} carregado com sucesso.`,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Pedido não encontrado ou erro na busca.",
        variant: "destructive",
      });
      setPedido(null);
    } finally {
      setLoading(false);
    }
  };

  const downloadComprovante = () => {
    // Simulação de download - substitua pela API real
    toast({
      title: "Download iniciado",
      description: "O comprovante de estorno está sendo baixado.",
    });
    
    // Aqui você implementaria o download real do arquivo
    // const link = document.createElement('a');
    // link.href = urlDoArquivo;
    // link.download = 'comprovante_estorno.pdf';
    // link.click();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pago": return "bg-green-100 text-green-800 border-green-200";
      case "pendente": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "estornado": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pago": return "Pago";
      case "pendente": return "Pendente";
      case "estornado": return "Estornado";
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <QrCode className="w-6 h-6" />
          Pedidos via PIX
        </h1>
        <p className="text-muted-foreground">Consulte pedidos recebidos via PIX online</p>
      </div>

      {/* Aviso importante */}
      <Alert className="border-orange-200 bg-orange-50">
        <AlertTriangle className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-800">
          <strong>Importante:</strong> As vendas são estornadas automaticamente somente se forem canceladas no mesmo dia da criação do pedido.
        </AlertDescription>
      </Alert>

      {/* Busca de Pedido */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Buscar Pedido PIX
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="pedidoId">ID do Pedido</Label>
              <Input
                id="pedidoId"
                placeholder="Digite o ID do pedido"
                value={pedidoId}
                onChange={(e) => setPedidoId(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && buscarPedido()}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={buscarPedido} disabled={loading}>
                {loading ? "Buscando..." : "Buscar"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informações do Pedido */}
      {pedido && (
        <Card>
          <CardHeader>
            <CardTitle>Detalhes do Pedido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">ID do Pedido</Label>
                <p className="text-lg font-mono">{pedido.id}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Cliente</Label>
                <p className="text-lg">{pedido.clienteNome}</p>
                <p className="text-sm text-muted-foreground">ID: {pedido.clienteId}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Valor</Label>
                <p className="text-lg font-semibold text-green-600">
                  R$ {pedido.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                <div className="mt-1">
                  <Badge className={getStatusColor(pedido.status)}>
                    {getStatusLabel(pedido.status)}
                  </Badge>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Data de Criação</Label>
                <p className="text-lg">
                  {new Date(pedido.dataCriacao).toLocaleString('pt-BR')}
                </p>
              </div>
              
              {pedido.status === "estornado" && pedido.dataEstorno && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Data do Estorno</Label>
                  <p className="text-lg text-red-600">
                    {new Date(pedido.dataEstorno).toLocaleString('pt-BR')}
                  </p>
                </div>
              )}
              
              <div className="md:col-span-2 lg:col-span-3">
                <Label className="text-sm font-medium text-muted-foreground">Chave PIX</Label>
                <p className="text-lg font-mono bg-muted p-2 rounded">{pedido.chavePix}</p>
              </div>
            </div>

            {/* Botão de Download do Comprovante de Estorno */}
            {pedido.status === "estornado" && (
              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Comprovante de Estorno</h4>
                    <p className="text-sm text-muted-foreground">
                      Baixe o comprovante de estorno do pedido
                    </p>
                  </div>
                  <Button onClick={downloadComprovante} variant="outline" className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Baixar Comprovante
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Estatísticas rápidas */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Pedidos Hoje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">+12% vs ontem</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">8</div>
            <p className="text-xs text-muted-foreground">Aguardando pagamento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pagos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">34</div>
            <p className="text-xs text-muted-foreground">Processados hoje</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Valor Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 12.450</div>
            <p className="text-xs text-muted-foreground">Hoje</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Pedidos;