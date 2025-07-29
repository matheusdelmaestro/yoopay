
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Search, Save, User, Calculator } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  email: string;
  role: string;
  name: string;
}

interface CadastroProps {
  user: User;
}

const bancos = [
  { codigo: "001", nome: "Banco do Brasil" },
  { codigo: "104", nome: "Caixa Econômica Federal" },
  { codigo: "237", nome: "Bradesco" },
  { codigo: "341", nome: "Itaú Unibanco" },
  { codigo: "033", nome: "Santander" },
  { codigo: "212", nome: "Banco Original" },
  { codigo: "260", nome: "Nu Pagamentos (Nubank)" },
  { codigo: "290", nome: "PagSeguro Internet" },
  { codigo: "323", nome: "Mercado Pago" },
];

const tiposChavePix = [
  { value: "cpf", label: "CPF" },
  { value: "cnpj", label: "CNPJ" },
  { value: "email", label: "E-mail" },
  { value: "telefone", label: "Telefone" },
  { value: "aleatoria", label: "Chave Aleatória" },
];

const Cadastro = ({ user }: CadastroProps) => {
  const [clienteId, setClienteId] = useState("");
  const [cliente, setCliente] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [bancoSelecionado, setBancoSelecionado] = useState("");
  const [numerobanco, setNumeroBank] = useState("");
  const { toast } = useToast();

  const [dadosBancarios, setDadosBancarios] = useState({
    nomeBanco: "",
    numeroBanco: "",
    agencia: "",
    conta: "",
    digitoConta: "",
    chavePix: "",
    tipoChave: "",
    nomeBeneficiario: "",
    documentoBeneficiario: "",
  });

  const [configTaxa, setConfigTaxa] = useState({
    valor: "",
    tipo: "porcentagem",
  });

  useEffect(() => {
    if (bancoSelecionado) {
      const banco = bancos.find(b => b.nome === bancoSelecionado);
      if (banco) {
        setNumeroBank(banco.codigo);
        setDadosBancarios(prev => ({
          ...prev,
          nomeBanco: bancoSelecionado,
          numeroBanco: banco.codigo
        }));
      }
    }
  }, [bancoSelecionado]);

  const buscarCliente = async () => {
    if (!clienteId.trim()) {
      toast({
        title: "Erro",
        description: "Digite um ID válido para buscar o cliente.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://payment.yooga.com.br/marketplace/121304/list', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer YOUR_TOKEN_HERE',
          'Content-Type': 'application/json'
        },
        body: ''
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }

      const data = await response.json();

      const clienteEncontrado = data.find((item: any) =>
        item.id === clienteId ||
        item.id === parseInt(clienteId) ||
        item.codigo === clienteId ||
        item.documento === clienteId
      );

      if (!clienteEncontrado) {
        throw new Error("Cliente não encontrado na base de dados");
      }

      const clienteFormatado = {
        id: clienteEncontrado.id || clienteEncontrado.codigo || clienteId,
        nome: clienteEncontrado.nome || clienteEncontrado.razaoSocial || clienteEncontrado.nomeFantasia || "Nome não informado",
        documento: clienteEncontrado.documento || clienteEncontrado.cpfCnpj || "Documento não informado",
        email: clienteEncontrado.email || "E-mail não informado",
        telefone: clienteEncontrado.telefone || clienteEncontrado.celular || "Telefone não informado",
        dadosBancarios: {
          nomeBanco: clienteEncontrado.dadosBancarios?.nomeBanco || "",
          numeroBanco: clienteEncontrado.dadosBancarios?.numeroBanco || "",
          agencia: clienteEncontrado.dadosBancarios?.agencia || "",
          conta: clienteEncontrado.dadosBancarios?.conta || "",
          digitoConta: clienteEncontrado.dadosBancarios?.digitoConta || "",
          chavePix: clienteEncontrado.dadosBancarios?.chavePix || "",
          tipoChave: clienteEncontrado.dadosBancarios?.tipoChave || "",
          nomeBeneficiario: clienteEncontrado.dadosBancarios?.nomeBeneficiario || "",
          documentoBeneficiario: clienteEncontrado.dadosBancarios?.documentoBeneficiario || "",
        }
      };

      setCliente(clienteFormatado);
      setDadosBancarios(clienteFormatado.dadosBancarios);
      if (clienteFormatado.dadosBancarios.nomeBanco) {
        setBancoSelecionado(clienteFormatado.dadosBancarios.nomeBanco);
      }

      setConfigTaxa({
        valor: clienteEncontrado.taxa?.valor || "2.5",
        tipo: clienteEncontrado.taxa?.tipo || "porcentagem"
      });

      toast({
        title: "Cliente encontrado",
        description: `Cliente ${clienteFormatado.nome} carregado com sucesso.`,
      });
    } catch (error) {
      console.error("Erro ao buscar cliente:", error);
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Cliente não encontrado ou erro na busca.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const salvarDados = async () => {
    try {
      // Simulação de salvamento - substitua pela API real
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Dados salvos",
        description: "Informações bancárias atualizadas com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar as informações.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setDadosBancarios(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Cadastro</h1>
        <p className="text-muted-foreground">Edite informações cadastrais dos clientes</p>
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
              <Input
                id="clienteId"
                placeholder="Digite o ID do cliente"
                value={clienteId}
                onChange={(e) => setClienteId(e.target.value)}
              />
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
      {cliente && (
        <Card>
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
                <Label>Documento</Label>
                <Input value={cliente.documento} disabled />
              </div>
              <div>
                <Label>E-mail</Label>
                <Input value={cliente.email} disabled />
              </div>
              <div>
                <Label>Telefone</Label>
                <Input value={cliente.telefone} disabled />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Informações Bancárias */}
      {cliente && (
        <Card>
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
                    {bancos.map((banco) => (
                      <SelectItem key={banco.codigo} value={banco.nome}>
                        {banco.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="numeroBanco">Número do Banco</Label>
                <Input
                  id="numeroBanco"
                  value={numerobanco}
                  disabled
                  placeholder="Preenchido automaticamente"
                />
              </div>
              <div>
                <Label htmlFor="agencia">Agência</Label>
                <Input
                  id="agencia"
                  value={dadosBancarios.agencia}
                  onChange={(e) => handleInputChange("agencia", e.target.value)}
                  placeholder="1234-5"
                />
              </div>
              <div>
                <Label htmlFor="conta">Conta</Label>
                <Input
                  id="conta"
                  value={dadosBancarios.conta}
                  onChange={(e) => handleInputChange("conta", e.target.value)}
                  placeholder="12345-6"
                />
              </div>
              <div>
                <Label htmlFor="digitoConta">Dígito da Conta</Label>
                <Input
                  id="digitoConta"
                  value={dadosBancarios.digitoConta}
                  onChange={(e) => handleInputChange("digitoConta", e.target.value)}
                  placeholder="7"
                  maxLength={1}
                />
              </div>
              <div>
                <Label htmlFor="tipoChave">Tipo da Chave PIX</Label>
                <Select value={dadosBancarios.tipoChave} onValueChange={(value) => handleInputChange("tipoChave", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposChavePix.map((tipo) => (
                      <SelectItem key={tipo.value} value={tipo.value}>
                        {tipo.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="chavePix">Chave PIX</Label>
                <Input
                  id="chavePix"
                  value={dadosBancarios.chavePix}
                  onChange={(e) => handleInputChange("chavePix", e.target.value)}
                  placeholder="Digite a chave PIX"
                />
              </div>
              <div>
                <Label htmlFor="nomeBeneficiario">Nome do Beneficiário</Label>
                <Input
                  id="nomeBeneficiario"
                  value={dadosBancarios.nomeBeneficiario}
                  onChange={(e) => handleInputChange("nomeBeneficiario", e.target.value)}
                  placeholder="Nome completo"
                />
              </div>
              <div>
                <Label htmlFor="documentoBeneficiario">Documento do Beneficiário</Label>
                <Input
                  id="documentoBeneficiario"
                  value={dadosBancarios.documentoBeneficiario}
                  onChange={(e) => handleInputChange("documentoBeneficiario", e.target.value)}
                  placeholder="CPF do beneficiário"
                />
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <Button onClick={salvarDados} className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Salvar Alterações
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Configuração de Taxa */}
      {cliente && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Configuração de Taxa
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="valorTaxa">Valor da Taxa</Label>
                <Input
                  id="valorTaxa"
                  type="number"
                  step="0.01"
                  min="0"
                  value={configTaxa.valor}
                  onChange={(e) => setConfigTaxa(prev => ({ ...prev, valor: e.target.value }))}
                  placeholder={configTaxa.tipo === "porcentagem" ? "2.5" : "10.00"}
                />
              </div>
              <div>
                <Label>Tipo da Taxa</Label>
                <RadioGroup
                  value={configTaxa.tipo}
                  onValueChange={(value) => setConfigTaxa(prev => ({ ...prev, tipo: value }))}
                  className="flex flex-col space-y-2 mt-2"
                >
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
            
            {configTaxa.valor && (
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Preview:</strong> 
                  {configTaxa.tipo === "porcentagem" 
                    ? ` ${configTaxa.valor}% sobre cada venda`
                    : ` R$ ${configTaxa.valor} por venda`
                  }
                </p>
              </div>
            )}
            
            <div className="flex justify-end pt-4">
              <Button onClick={() => {
                toast({
                  title: "Taxa configurada",
                  description: `Taxa de ${configTaxa.tipo === "porcentagem" ? configTaxa.valor + "%" : "R$ " + configTaxa.valor} salva com sucesso.`,
                });
              }} className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Salvar Taxa
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Cadastro;