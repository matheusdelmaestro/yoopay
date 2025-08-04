import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  FileBarChart, 
  Download, 
  Search, 
  Calendar as CalendarIcon,
  Users,
  TrendingUp,
  DollarSign,
  Trophy
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface User {
  email: string;
  role: string;
  name: string;
}

interface RelatoriosProps {
  user: User;
}

interface DadosCliente {
  id: string;
  nome: string;
  documento: string;
  email: string;
  status: string;
}

interface DadosFaturamento {
  cliente: string;
  transacoes: number;
  valorTotal: string;
  ticketMedio: string;
}

interface DadosTransacao {
  cliente: string;
  periodo: string;
  totalTransacoes: number;
  crescimento: string;
}

interface DadosRanking {
  posicao: number;
  cliente: string;
  criterio: string;
  valor: string;
}

type DadosRelatorio = DadosCliente | DadosFaturamento | DadosTransacao | DadosRanking;

const tiposRelatorio = [
  { value: "clientes", label: "Lista de Clientes", icon: Users },
  { value: "faturamento", label: "Faturamento por Cliente", icon: DollarSign },
  { value: "transacoes", label: "Clientes com Mais Transações", icon: TrendingUp },
  { value: "ranking", label: "Ranking de Clientes", icon: Trophy },
];

const Relatorios = ({ user }: RelatoriosProps) => {
  const [tipoRelatorio, setTipoRelatorio] = useState("");
  const [dataInicio, setDataInicio] = useState<Date>();
  const [dataFim, setDataFim] = useState<Date>();
  const [loading, setLoading] = useState(false);
  const [dados, setDados] = useState<DadosRelatorio[]>([]);
  const [filtroTexto, setFiltroTexto] = useState("");
  const { toast } = useToast();

  const gerarRelatorio = async () => {
    if (!tipoRelatorio) {
      toast({
        title: "Erro",
        description: "Selecione um tipo de relatório.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Simulação de dados - substitua pela API real
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      let dadosSimulados: DadosRelatorio[] = [];
      
      switch (tipoRelatorio) {
        case "clientes":
          dadosSimulados = [
            { id: "001", nome: "João Silva Ltda", documento: "12.345.678/0001-90", email: "joao@empresa.com", status: "Ativo" },
            { id: "002", nome: "Maria Santos ME", documento: "98.765.432/0001-10", email: "maria@santos.com", status: "Ativo" },
            { id: "003", nome: "Tech Solutions", documento: "11.222.333/0001-44", email: "contato@tech.com", status: "Inativo" },
          ];
          break;
        case "faturamento":
          dadosSimulados = [
            { cliente: "João Silva Ltda", transacoes: 45, valorTotal: "R$ 125.430,50", ticketMedio: "R$ 2.787,34" },
            { cliente: "Maria Santos ME", transacoes: 32, valorTotal: "R$ 89.250,80", ticketMedio: "R$ 2.789,09" },
            { cliente: "Tech Solutions", transacoes: 18, valorTotal: "R$ 67.890,20", ticketMedio: "R$ 3.771,68" },
          ];
          break;
        case "transacoes":
          dadosSimulados = [
            { cliente: "João Silva Ltda", periodo: "Último mês", totalTransacoes: 45, crescimento: "+12%" },
            { cliente: "Tech Solutions", periodo: "Último mês", totalTransacoes: 38, crescimento: "+8%" },
            { cliente: "Maria Santos ME", periodo: "Último mês", totalTransacoes: 32, crescimento: "+15%" },
          ];
          break;
        case "ranking":
          dadosSimulados = [
            { posicao: 1, cliente: "João Silva Ltda", criterio: "Valor Total", valor: "R$ 125.430,50" },
            { posicao: 2, cliente: "Tech Solutions", criterio: "Valor Total", valor: "R$ 89.250,80" },
            { posicao: 3, cliente: "Maria Santos ME", criterio: "Valor Total", valor: "R$ 67.890,20" },
          ];
          break;
      }
      
      setDados(dadosSimulados);
      toast({
        title: "Relatório gerado",
        description: `${dadosSimulados.length} registros encontrados.`,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao gerar relatório.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const exportarRelatorio = () => {
    // Simulação de exportação
    toast({
      title: "Exportando relatório",
      description: "O arquivo será baixado em breve.",
    });
  };

  const renderTabela = () => {
    if (!dados.length) return null;

    switch (tipoRelatorio) {
      case "clientes":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nome/Razão Social</TableHead>
                <TableHead>Documento</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dados.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.nome}</TableCell>
                  <TableCell>{item.documento}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === "Ativo" 
                        ? "bg-success/10 text-success" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {item.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      
      case "faturamento":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Transações</TableHead>
                <TableHead>Valor Total</TableHead>
                <TableHead>Ticket Médio</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dados.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.cliente}</TableCell>
                  <TableCell>{item.transacoes}</TableCell>
                  <TableCell className="font-medium text-success">{item.valorTotal}</TableCell>
                  <TableCell>{item.ticketMedio}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      
      case "transacoes":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Período</TableHead>
                <TableHead>Total de Transações</TableHead>
                <TableHead>Crescimento</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dados.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.cliente}</TableCell>
                  <TableCell>{item.periodo}</TableCell>
                  <TableCell className="text-center font-medium">{item.totalTransacoes}</TableCell>
                  <TableCell className="text-success font-medium">{item.crescimento}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      
      case "ranking":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Posição</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Critério</TableHead>
                <TableHead>Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dados.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        item.posicao === 1 ? "bg-warning text-warning-foreground" :
                        item.posicao === 2 ? "bg-muted text-muted-foreground" :
                        item.posicao === 3 ? "bg-accent text-accent-foreground" :
                        "bg-background text-foreground border"
                      }`}>
                        {item.posicao}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{item.cliente}</TableCell>
                  <TableCell>{item.criterio}</TableCell>
                  <TableCell className="font-medium text-success">{item.valor}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Relatórios</h1>
        <p className="text-muted-foreground">Gere e exporte relatórios detalhados</p>
      </div>

      {/* Filtros de Relatório */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileBarChart className="w-5 h-5" />
            Configurar Relatório
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="tipoRelatorio">Tipo de Relatório</Label>
              <Select value={tipoRelatorio} onValueChange={setTipoRelatorio}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {tiposRelatorio.map((tipo) => (
                    <SelectItem key={tipo.value} value={tipo.value}>
                      <div className="flex items-center gap-2">
                        <tipo.icon className="w-4 h-4" />
                        {tipo.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Data Início</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dataInicio && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dataInicio ? format(dataInicio, "PPP", { locale: ptBR }) : "Selecionar data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dataInicio}
                    onSelect={setDataInicio}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <Label>Data Fim</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dataFim && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dataFim ? format(dataFim, "PPP", { locale: ptBR }) : "Selecionar data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dataFim}
                    onSelect={setDataFim}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={gerarRelatorio} disabled={loading} className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              {loading ? "Gerando..." : "Gerar Relatório"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resultados */}
      {dados.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Resultados do Relatório</CardTitle>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                <Input
                  placeholder="Filtrar resultados..."
                  value={filtroTexto}
                  onChange={(e) => setFiltroTexto(e.target.value)}
                  className="w-64"
                />
              </div>
              <Button onClick={exportarRelatorio} variant="outline" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Exportar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              {renderTabela()}
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              Total de {dados.length} registros encontrados
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Relatorios;