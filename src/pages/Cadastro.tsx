import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Save, User, Calculator, Plus, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createAuthHeaders, API_CONFIG } from "@/lib/api-config";
interface User {
  email: string;
  role: string;
  name: string;
}

interface CadastroProps {
  user: User;
}

interface ClienteAPI {
  id?: string | number;
  originId?: string;
  tradeName?: string;
  businessName?: string;
  document?: string;
  drivers?: DriverAPI[];
  bank?: BankAPI;
}

interface DriverAPI {
  methods?: MethodAPI[];
}

interface MethodAPI {
  name: string;
  feeValue?: number;
  transactionFeeValue?: number;
  feeType?: string;
}

interface BankAPI {
  bankName?: string;
  bankNumber?: string;
  agency?: string;
  account?: string;
  accountDigit?: string;
  pixKey?: string;
  pixKeyType?: string;
  holderName?: string;
  holderDocument?: string;
}

interface ClienteFormatado {
  id: string;
  originId: string;
  nome: string;
  documento: string;
  dadosBancarios: DadosBancarios;
}

interface DadosBancarios {
  nomeBanco: string;
  numeroBanco: string;
  agencia: string;
  conta: string;
  digitoConta: string;
  chavePix: string;
  tipoChave: string;
  nomeBeneficiario: string;
  documentoBeneficiario: string;
}
const bancos = [{
  codigo: "001",
  nome: "Banco do Brasil"
}, {
  codigo: "104",
  nome: "Caixa Econômica Federal"
}, {
  codigo: "237",
  nome: "Bradesco"
}, {
  codigo: "341",
  nome: "Itaú Unibanco"
}, {
  codigo: "033",
  nome: "Santander"
}, {
  codigo: "212",
  nome: "Banco Original"
}, {
  codigo: "260",
  nome: "Nubank"
}, {
  codigo: "999",
  nome: "Nenhum dos listados"
}, {
  codigo: "290",
  nome: "PagSeguro Internet"
}, {
  codigo: "323",
  nome: "Mercado Pago"
}];
const tiposChavePix = [{
  value: "cpf",
  label: "CPF"
}, {
  value: "cnpj",
  label: "CNPJ"
}, {
  value: "email",
  label: "E-mail"
}, {
  value: "telefone",
  label: "Telefone"
}, {
  value: "aleatoria",
  label: "Chave Aleatória"
}];
const Cadastro = ({
  user
}: CadastroProps) => {
  const [clienteId, setClienteId] = useState("");
  const [cliente, setCliente] = useState<ClienteFormatado | null>(null);
  const [loading, setLoading] = useState(false);
  const [bancoSelecionado, setBancoSelecionado] = useState("");
  const [numerobanco, setNumeroBank] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [novoCredenciamento, setNovoCredenciamento] = useState({
    nomeBanco: "",
    numeroBanco: "",
    agencia: "",
    conta: "",
    digitoConta: "",
    chavePix: "",
    tipoChave: "",
    nomeBeneficiario: "",
    documentoBeneficiario: "",
    taxaValor: "",
    taxaTipo: "porcentagem",
    clienteId: ""
  });
  const {
    toast
  } = useToast();
  const [dadosBancarios, setDadosBancarios] = useState({
    nomeBanco: "",
    numeroBanco: "",
    agencia: "",
    conta: "",
    digitoConta: "",
    chavePix: "",
    tipoChave: "",
    nomeBeneficiario: "",
    documentoBeneficiario: ""
  });
  const [configTaxa, setConfigTaxa] = useState({
    valor: "",
    tipo: "porcentagem"
  });
  const [taxaPix, setTaxaPix] = useState({
    valor: "",
    tipo: "porcentagem",
    ativada: false
  });

  const [repasseFDS, setRepasseFDS] = useState({
    status: "",
    loading: false
  });
  useEffect(() => {
    if (bancoSelecionado) {
      const banco = bancos.find(b => b.nome === bancoSelecionado);
      if (banco) {
        if (bancoSelecionado === "Nenhum dos listados") {
          setNumeroBank("");
          setDadosBancarios(prev => ({
            ...prev,
            nomeBanco: "",
            numeroBanco: ""
          }));
        } else {
          setNumeroBank(banco.codigo);
          setDadosBancarios(prev => ({
            ...prev,
            nomeBanco: bancoSelecionado,
            numeroBanco: banco.codigo
          }));
        }
      }
    }
  }, [bancoSelecionado]);
  const buscarCliente = async () => {
    if (!clienteId.trim()) {
      toast({
        title: "Erro",
        description: "Digite um ID válido para buscar o cliente.",
        variant: "destructive"
      });
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_CONFIG.endpoints.PAYMENT_API}/marketplace/${clienteId}/list`, {
        method: 'GET',
        headers: createAuthHeaders('YOOGA_PAYMENT_TOKEN')
      });
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }
      const data = await response.json();

      // Debug: Vamos ver a estrutura dos dados retornados
      console.log('Dados retornados da API:', data);
      console.log('Tipo dos dados:', typeof data);
      console.log('É array?', Array.isArray(data));
      console.log('ID buscado:', clienteId);

      // Verificar se data é um array ou objeto
      let clienteEncontrado = null;
      if (Array.isArray(data)) {
        console.log('Dados são um array com', data.length, 'itens');
        console.log('Primeiro item do array:', data[0]);

        // Se for array, usar find normalmente
        clienteEncontrado = data.find((item: ClienteAPI) => {
          console.log('Verificando item:', item);
          const match = String(item.id) === clienteId || Number(item.id) === Number(clienteId) || item.originId === clienteId || item.document === clienteId;
          console.log('Match encontrado?', match);
          return match;
        });
      } else if (data && typeof data === 'object') {
        console.log('Dados são um objeto');
        console.log('Chaves do objeto:', Object.keys(data));

        // Se for objeto, verificar se tem uma propriedade que contém os dados
        // Possíveis estruturas: { data: [...] }, { results: [...] }, { items: [...] }
        const possibleArrays = [data.data, data.results, data.items, data.clientes, data.list];
        for (const arr of possibleArrays) {
          if (Array.isArray(arr)) {
            console.log('Encontrou array em uma das propriedades:', arr);
            clienteEncontrado = arr.find((item: ClienteAPI) => {
              console.log('Verificando item do array aninhado:', item);
              const match = String(item.id) === clienteId || Number(item.id) === Number(clienteId) || item.originId === clienteId || item.document === clienteId;
              console.log('Match encontrado?', match);
              return match;
            });
            if (clienteEncontrado) break;
          }
        }

        // Se não encontrou em arrays aninhados, verificar se o próprio objeto é o cliente
        if (!clienteEncontrado) {
          console.log('Verificando se o próprio objeto é o cliente');
          console.log('data.id:', data.id, 'clienteId:', clienteId);
          console.log('data.originId:', data.originId);
          console.log('data.document:', data.document);
          if (data.id === clienteId || data.id === parseInt(clienteId) || data.originId === clienteId || data.document === clienteId) {
            clienteEncontrado = data;
            console.log('Cliente encontrado no próprio objeto!');
          }
        }
      }
      console.log('Resultado final da busca:', clienteEncontrado);
      if (!clienteEncontrado) {
        console.log('ERRO: Cliente não foi encontrado com nenhum dos critérios de busca');
        throw new Error("Cliente não encontrado na base de dados");
      }
      // Processar informações de taxa PIX
      const pixDriver = clienteEncontrado.drivers?.find((driver: DriverAPI) => driver.methods?.some((method: MethodAPI) => method.name === "PIX"));
      const pixMethod = pixDriver?.methods?.find((method: MethodAPI) => method.name === "PIX");
      console.log('PIX Driver encontrado:', pixDriver);
      console.log('PIX Method encontrado:', pixMethod);

      // Mapear nome do banco da API para a lista local
      const bancoMapping: {
        [key: string]: string;
      } = {
        "NUBANK": "Nubank",
        "ITAU": "Itaú Unibanco",
        "BRADESCO": "Bradesco",
        "SANTANDER": "Santander",
        "BANCO DO BRASIL": "Banco do Brasil",
        "CAIXA": "Caixa Econômica Federal",
        "ORIGINAL": "Banco Original",
        "PAGSEGURO": "PagSeguro Internet",
        "MERCADO PAGO": "Mercado Pago"
      };
      const nomeBancoFormatado = bancoMapping[clienteEncontrado.bank?.bankName] || clienteEncontrado.bank?.bankName || "";
      console.log('Banco da API:', clienteEncontrado.bank?.bankName);
      console.log('Banco formatado:', nomeBancoFormatado);
      console.log('Número do banco:', clienteEncontrado.bank?.bankNumber);
      const clienteFormatado = {
        id: clienteEncontrado.id || clienteEncontrado.originId || clienteId,
        originId: clienteEncontrado.originId || clienteId,
        nome: clienteEncontrado.tradeName || clienteEncontrado.businessName || "Nome não informado",
        documento: clienteEncontrado.document || "Documento não informado",
        dadosBancarios: {
          nomeBanco: nomeBancoFormatado,
          numeroBanco: clienteEncontrado.bank?.bankNumber || "",
          agencia: clienteEncontrado.bank?.agency || "",
          conta: clienteEncontrado.bank?.account || "",
          digitoConta: clienteEncontrado.bank?.accountDigit || "",
          chavePix: clienteEncontrado.bank?.pixKey || "",
          tipoChave: clienteEncontrado.bank?.pixKeyType?.toLowerCase() || "",
          nomeBeneficiario: clienteEncontrado.bank?.holderName || "",
          documentoBeneficiario: clienteEncontrado.bank?.holderDocument || ""
        }
      };
      setCliente(clienteFormatado);
      setDadosBancarios(clienteFormatado.dadosBancarios);
      if (clienteFormatado.dadosBancarios.nomeBanco) {
        setBancoSelecionado(clienteFormatado.dadosBancarios.nomeBanco);
      }

      // Configurar taxa PIX baseada nos dados da API
      if (pixMethod && pixDriver) {
        const valorTaxa = pixMethod.feeValue || pixMethod.transactionFeeValue || 0;
        const tipoTaxa = pixMethod.feeType === "PERCENTAGE" ? "porcentagem" : "fixo";
        console.log('Configurando taxa PIX:');
        console.log('- Valor:', valorTaxa);
        console.log('- Tipo da API:', pixMethod.feeType);
        console.log('- Tipo formatado:', tipoTaxa);
        console.log('- Driver enabled:', pixDriver.enabled);
        console.log('- Method enabled:', pixMethod.enabled);
        setTaxaPix({
          valor: valorTaxa.toString(),
          tipo: tipoTaxa,
          ativada: pixDriver.enabled && pixMethod.enabled
        });

        // Configurar também o estado editável com os valores atuais
        setConfigTaxa({
          valor: valorTaxa.toString(),
          tipo: tipoTaxa
        });
      } else {
        // Se não tem PIX configurado
        setTaxaPix({
          valor: "",
          tipo: "porcentagem",
          ativada: false
        });
        setConfigTaxa({
          valor: "",
          tipo: "porcentagem"
        });
      }
      toast({
        title: "Cliente encontrado",
        description: `Cliente ${clienteFormatado.nome} carregado com sucesso.`
      });

      // Buscar informações de repasse no FDS
      await buscarRepasseFDS(clienteFormatado.originId);
    } catch (error) {
      console.error("Erro ao buscar cliente:", error);
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Cliente não encontrado ou erro na busca.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  const desabilitarPixItau = async (originId: string) => {
    try {
      const response = await fetch(`${API_CONFIG.endpoints.PAYMENT_API}/marketplace/${clienteId}/drivers/itau/disable`, {
        method: 'POST',
        headers: createAuthHeaders('YOOGA_PAYMENT_TOKEN')
      });
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }
      toast({
        title: "PIX desabilitado",
        description: "Chave PIX foi desabilitada com sucesso."
      });
      return true;
    } catch (error) {
      console.error("Erro ao desabilitar PIX:", error);
      toast({
        title: "Erro",
        description: "Erro ao desabilitar a chave PIX.",
        variant: "destructive"
      });
      return false;
    }
  };
  const buscarRepasseFDS = async (clienteId: string) => {
    setRepasseFDS({ status: "", loading: true });
    
    try {
      const response = await fetch(`${API_CONFIG.endpoints.PAYMENT_API}/marketplace/config/weekend-payout-blocklist/${clienteId}`, {
        method: 'GET',
        headers: createAuthHeaders('YOOGA_PAYMENT_TOKEN')
      });

      if (!response.ok) {
        if (response.status === 404) {
          // Quando retorna 404, significa que não está na blocklist (recebe repasses)
          setRepasseFDS({ status: "Recebe", loading: false });
          return;
        }
        throw new Error(`Erro na API: ${response.status}`);
      }

      const data = await response.json();
      const message = data.message || "";

      let status = "";
      if (message === "Marketplace está na blocklist - não recebe repasses nos fins de semana") {
        status = "Não recebe";
      } else if (message === "Marketplace NÃO está na blocklist - recebe repasses nos fins de semana") {
        status = "Recebe";
      } else {
        status = "Recebe"; // Padrão: se não está na blocklist, recebe
      }

      setRepasseFDS({ status, loading: false });
    } catch (error) {
      console.error("Erro ao buscar repasse FDS:", error);
      setRepasseFDS({ status: "Erro ao carregar", loading: false });
    }
  };

  const salvarTaxa = async () => {
    try {
      const body = {
        idi: `${clienteId}`,
        marketplaceFees: [{
          driver: "ITAU",
          method: "PIX",
          feeValue: configTaxa.tipo === "porcentagem" ? parseFloat(configTaxa.valor) : 0.0,
          feeType: configTaxa.tipo === "porcentagem" ? "PERCENTAGE" : "PERCENTAGE",
          transactionFeeValue: configTaxa.tipo === "fixo" ? parseFloat(configTaxa.valor) : 0.0,
          transactionFeeType: "VALUE"
        }]
      };
      const response = await fetch(`${API_CONFIG.endpoints.API4}/payments/marketplace/fees`, {
        method: 'POST',
        headers: createAuthHeaders('YOOGA_API4_TOKEN'),
        body: JSON.stringify(body)
      });
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }

      // Atualizar taxa PIX local com os novos valores
      setTaxaPix({
        valor: configTaxa.valor,
        tipo: configTaxa.tipo,
        ativada: true
      });
      toast({
        title: "Taxa salva",
        description: `Taxa de ${configTaxa.tipo === "porcentagem" ? configTaxa.valor + "%" : "R$ " + configTaxa.valor} salva e PIX ativado com sucesso.`
      });
      return true;
    } catch (error) {
      console.error("Erro ao salvar taxa:", error);
      toast({
        title: "Erro",
        description: "Erro ao salvar a taxa PIX.",
        variant: "destructive"
      });
      return false;
    }
  };
  const salvarDados = async () => {
    try {
      // Determinar pixKeyType baseado na chave PIX
      let pixKeyType = dadosBancarios.tipoChave;
      if (dadosBancarios.chavePix.startsWith("+55")) {
        pixKeyType = "CELLPHONE";
      }

      const body = {
        bankName: bancoSelecionado === "Nenhum dos listados" ? null : dadosBancarios.nomeBanco,
        bankNumber: bancoSelecionado === "Nenhum dos listados" ? null : (numerobanco || dadosBancarios.numeroBanco),
        agency: dadosBancarios.agencia,
        account: dadosBancarios.conta,
        accountDigit: dadosBancarios.digitoConta,
        pixKey: dadosBancarios.chavePix,
        holderName: dadosBancarios.nomeBeneficiario,
        holderDocument: dadosBancarios.documentoBeneficiario,
        pixKeyType: pixKeyType.toUpperCase(),
        userIdi: clienteId
      };

      const response = await fetch(`${API_CONFIG.endpoints.API4}/payments/banking`, {
        method: 'POST',
        headers: createAuthHeaders('YOOGA_API4_TOKEN'),
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }

      toast({
        title: "Dados salvos",
        description: "Informações bancárias atualizadas com sucesso."
      });

      // Recarregar os dados do cliente para refletir as mudanças
      await buscarCliente();
    } catch (error) {
      console.error("Erro ao salvar dados bancários:", error);
      toast({
        title: "Erro",
        description: "Erro ao salvar as informações bancárias.",
        variant: "destructive"
      });
    }
  };
  const handleInputChange = (field: string, value: string) => {
    setDadosBancarios(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleNovoCredenciamentoChange = (field: string, value: string) => {
    setNovoCredenciamento(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-preencher número do banco quando selecionar o nome
    if (field === "nomeBanco") {
      const banco = bancos.find(b => b.nome === value);
      if (banco) {
        setNovoCredenciamento(prev => ({
          ...prev,
          numeroBanco: banco.codigo
        }));
      }
    }
  };
  const salvarNovoCredenciamento = async () => {
    try {
      // Validação básica
      if (!novoCredenciamento.nomeBanco || !novoCredenciamento.agencia || !novoCredenciamento.conta || !novoCredenciamento.chavePix) {
        toast({
          title: "Erro",
          description: "Preencha todos os campos obrigatórios.",
          variant: "destructive"
        });
        return;
      }

      // Simulação de salvamento - substitua pela API real
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Credenciamento criado",
        description: "Novo credenciamento PIX criado com sucesso."
      });

      // Limpar formulário e fechar modal
      setNovoCredenciamento({
        nomeBanco: "",
        numeroBanco: "",
        agencia: "",
        conta: "",
        digitoConta: "",
        chavePix: "",
        tipoChave: "",
        nomeBeneficiario: "",
        documentoBeneficiario: "",
        taxaValor: "",
        taxaTipo: "porcentagem",
        clienteId: ""
      });
      setModalAberto(false);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao criar novo credenciamento.",
        variant: "destructive"
      });
    }
  };
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Cadastro</h1>
          <p className="text-muted-foreground">Edite informações cadastrais dos clientes</p>
        </div>
        
        <Dialog open={modalAberto} onOpenChange={setModalAberto}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
               Novo Cadastro
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Novo Credenciamento PIX</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="novoNomeBanco">Nome do Banco *</Label>
                  <Select value={novoCredenciamento.nomeBanco} onValueChange={value => handleNovoCredenciamentoChange("nomeBanco", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o banco" />
                    </SelectTrigger>
                    <SelectContent>
                      {bancos.map(banco => <SelectItem key={banco.codigo} value={banco.nome}>
                          {banco.nome}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="novoNumeroBanco">Número do Banco</Label>
                  <Input id="novoNumeroBanco" value={novoCredenciamento.numeroBanco} disabled placeholder="Preenchido automaticamente" />
                </div>
                
                <div>
                  <Label htmlFor="novaAgencia">Agência *</Label>
                  <Input id="novaAgencia" value={novoCredenciamento.agencia} onChange={e => handleNovoCredenciamentoChange("agencia", e.target.value)} placeholder="1234-5" />
                </div>
                
                <div>
                  <Label htmlFor="novaConta">Conta *</Label>
                  <Input id="novaConta" value={novoCredenciamento.conta} onChange={e => handleNovoCredenciamentoChange("conta", e.target.value)} placeholder="12345-6" />
                </div>
                
                <div>
                  <Label htmlFor="novoDigitoConta">Dígito da Conta</Label>
                  <Input id="novoDigitoConta" value={novoCredenciamento.digitoConta} onChange={e => handleNovoCredenciamentoChange("digitoConta", e.target.value)} placeholder="7" maxLength={1} />
                </div>

                
                <div>
                  <Label htmlFor="clienteId">IDI</Label>
                  <Input id="clienteId" value={novoCredenciamento.clienteId} onChange={e => handleNovoCredenciamentoChange("clienteId", e.target.value)} placeholder="Digite o IDI" maxLength={1} />
                </div>
                
                <div>
                  <Label htmlFor="novoTipoChave">Tipo da Chave PIX *</Label>
                  <Select value={novoCredenciamento.tipoChave} onValueChange={value => handleNovoCredenciamentoChange("tipoChave", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposChavePix.map(tipo => <SelectItem key={tipo.value} value={tipo.value}>
                          {tipo.label}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="md:col-span-1">
                  <Label htmlFor="novaChavePix">Chave PIX *</Label>
                  <Input id="novaChavePix" value={novoCredenciamento.chavePix} onChange={e => handleNovoCredenciamentoChange("chavePix", e.target.value)} placeholder="Digite a chave PIX" />
                </div>
                
                <div>
                  <Label htmlFor="novoNomeBeneficiario">Nome do Beneficiário *</Label>
                  <Input id="novoNomeBeneficiario" value={novoCredenciamento.nomeBeneficiario} onChange={e => handleNovoCredenciamentoChange("nomeBeneficiario", e.target.value)} placeholder="Nome completo" />
                </div>
                
                <div>
                  <Label htmlFor="novoDocumentoBeneficiario">Documento do Beneficiário *</Label>
                  <Input id="novoDocumentoBeneficiario" value={novoCredenciamento.documentoBeneficiario} onChange={e => handleNovoCredenciamentoChange("documentoBeneficiario", e.target.value)} placeholder="CPF do beneficiário" />
                </div>
                
                <div className="md:col-span-2">
                  <Label>Taxa PIX *</Label>
                  <div className="space-y-3">
                    <RadioGroup value={novoCredenciamento.taxaTipo === "fixo" ? "2.00" : "2.10"} onValueChange={value => {
                    if (value === "2.00") {
                      handleNovoCredenciamentoChange("taxaValor", "2.00");
                      handleNovoCredenciamentoChange("taxaTipo", "fixo");
                    } else {
                      handleNovoCredenciamentoChange("taxaValor", "2.10");
                      handleNovoCredenciamentoChange("taxaTipo", "porcentagem");
                    }
                  }} className="flex flex-row space-x-6">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="2.00" id="taxa-fixo" />
                        <Label htmlFor="taxa-fixo" className="cursor-pointer">
                          R$ 2,00 por venda
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="2.10" id="taxa-porcentagem" />
                        <Label htmlFor="taxa-porcentagem" className="cursor-pointer">
                          2,10% por venda
                        </Label>
                      </div>
                    </RadioGroup>
                    
                    {novoCredenciamento.taxaValor && <div className="bg-muted p-3 rounded-lg">
                        
                      </div>}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setModalAberto(false)}>
                  Cancelar
                </Button>
                <Button onClick={salvarNovoCredenciamento} className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Salvar Credenciamento
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {/* Busca de Cliente */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Buscar Cliente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="clienteId">ID do Cliente</Label>
              <Input id="clienteId" placeholder="Digite o ID do cliente" value={clienteId} onChange={e => setClienteId(e.target.value)} />
            </div>
            <div className="flex items-end">
              <Button onClick={buscarCliente} disabled={loading}>
                {loading ? "Buscando..." : "Buscar"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Informações do Cliente */}
      {cliente && <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Informações do Cliente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Nome/Razão Social</Label>
                <Input value={cliente.nome} disabled />
              </div>
              <div>
                <Label>Repasse no FDS</Label>
                <Input 
                  value={repasseFDS.loading ? "Carregando..." : repasseFDS.status} 
                  disabled 
                  className={
                    repasseFDS.loading ? "text-muted-foreground" :
                    repasseFDS.status === "Recebe" ? "text-green-600" :
                    repasseFDS.status === "Não recebe" ? "text-red-600" :
                    "text-muted-foreground"
                  } 
                />
              </div>
              <div>
                <Label>Documento</Label>
                <Input value={cliente.documento} disabled />
              </div>
              <div>
                <Label>Status da Configuração</Label>
                <Input value={taxaPix.ativada ? "PIX Habilitado" : "PIX Desabilitado"} disabled className={taxaPix.ativada ? "text-green-600" : "text-red-600"} />
              </div>
            </div>
          </CardContent>
        </Card>}
      {/* Informações Bancárias */}
      {cliente && <Card>
          <CardHeader>
            <CardTitle>Informações Bancárias</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nomeBanco">Nome do Banco</Label>
                <Select value={bancoSelecionado} onValueChange={setBancoSelecionado}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o banco" />
                  </SelectTrigger>
                  <SelectContent>
                    {bancos.map(banco => <SelectItem key={banco.codigo} value={banco.nome}>
                        {banco.nome}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="numeroBanco">Número do Banco</Label>
                <Input id="numeroBanco" value={numerobanco} disabled placeholder="Preenchido automaticamente" />
              </div>
              <div>
                <Label htmlFor="agencia">Agência</Label>
                <Input id="agencia" value={dadosBancarios.agencia} onChange={e => handleInputChange("agencia", e.target.value)} placeholder="1234-5" />
              </div>
              <div>
                <Label htmlFor="conta">Conta</Label>
                <Input id="conta" value={dadosBancarios.conta} onChange={e => handleInputChange("conta", e.target.value)} placeholder="12345-6" />
              </div>
              <div>
                <Label htmlFor="digitoConta">Dígito da Conta</Label>
                <Input id="digitoConta" value={dadosBancarios.digitoConta} onChange={e => handleInputChange("digitoConta", e.target.value)} placeholder="7" maxLength={1} />
              </div>
              <div>
                <Label htmlFor="tipoChave">Tipo da Chave PIX</Label>
                <Select value={dadosBancarios.tipoChave} onValueChange={value => handleInputChange("tipoChave", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposChavePix.map(tipo => <SelectItem key={tipo.value} value={tipo.value}>
                        {tipo.label}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="chavePix">Chave PIX</Label>
                <Input id="chavePix" value={dadosBancarios.chavePix} onChange={e => handleInputChange("chavePix", e.target.value)} placeholder="Digite a chave PIX" />
              </div>
              <div>
                <Label htmlFor="nomeBeneficiario">Nome do Beneficiário</Label>
                <Input id="nomeBeneficiario" value={dadosBancarios.nomeBeneficiario} onChange={e => handleInputChange("nomeBeneficiario", e.target.value)} placeholder="Nome completo" />
              </div>
              <div>
                <Label htmlFor="documentoBeneficiario">Documento do Beneficiário</Label>
                <Input id="documentoBeneficiario" value={dadosBancarios.documentoBeneficiario} onChange={e => handleInputChange("documentoBeneficiario", e.target.value)} placeholder="CPF do beneficiário" />
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <Button onClick={salvarDados} className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Salvar Alterações
              </Button>
            </div>
          </CardContent>
        </Card>}
      {/* Configuração de Taxa */}
      {cliente && <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Taxa
                <div className="flex items-center gap-2 ml-4">
                  <Label htmlFor="taxaPixToggle" className="text-sm">
                    {taxaPix.ativada ? "Ativa" : "Inativa"}
                  </Label>
                  <Switch id="taxaPixToggle" checked={taxaPix.ativada} onCheckedChange={async checked => {
                if (!checked && taxaPix.ativada && cliente) {
                  // Se está desabilitando uma chave ativa, chama a API
                  const sucesso = await desabilitarPixItau(cliente.id);
                  if (sucesso) {
                    setTaxaPix(prev => ({
                      ...prev,
                      ativada: false
                    }));
                  }
                } else if (checked && !taxaPix.ativada) {
                  // Se está habilitando, chama a função salvarTaxa
                  await salvarTaxa();
                }
              }} />
                  <div className="group relative">
                    <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-popover text-popover-foreground text-xs rounded-md border shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none w-48 z-10">
                      Para reativar o PIX, defina a taxa no campo abaixo e clique em "Salvar Taxa"
                    </div>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="valorTaxa">Valor da Taxa</Label>
                <Input id="valorTaxa" type="number" step="0.01" min="0" value={configTaxa.valor} onChange={e => setConfigTaxa(prev => ({
              ...prev,
              valor: e.target.value
            }))} placeholder={configTaxa.tipo === "porcentagem" ? "2.5" : "10.00"} />
              </div>
              <div>
                <Label>Tipo da Taxa</Label>
                <RadioGroup value={configTaxa.tipo} onValueChange={value => setConfigTaxa(prev => ({
              ...prev,
              tipo: value
            }))} className="flex flex-col space-y-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="porcentagem" id="porcentagem" />
                    <Label htmlFor="porcentagem">Porcentagem (%)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fixo" id="fixo" />
                    <Label htmlFor="fixo">Valor Fixo (R$)</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            
            {configTaxa.valor && <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Preview:</strong> 
                  {configTaxa.tipo === "porcentagem" ? ` ${configTaxa.valor}% sobre cada venda` : ` R$ ${configTaxa.valor} por venda`}
                </p>
              </div>}
            
            <div className="flex justify-end pt-4">
              <Button onClick={salvarTaxa} className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Salvar Taxa
              </Button>
            </div>
          </CardContent>
        </Card>}
    </div>;
};
export default Cadastro;

//atualizaçãov20


