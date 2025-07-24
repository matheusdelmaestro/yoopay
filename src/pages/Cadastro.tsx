import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Save, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  email: string;
  role: string;
  name: string;
}

interface CadastroProps {
  user: User;
}

// Lista de bancos com seus códigos
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
      // Simulação de busca - substitua pela API real
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const clienteEncontrado = {
        id: clienteId,
        nome: "João Silva Ltda",
        documento: "12.345.678/0001-90",
        email: "joao@empresa.com",
        telefone: "(11) 99999-9999",
        dadosBancarios: {
          nomeBanco: "Banco do Brasil",
          numeroBanco: "001",
          agencia: "1234-5",
          conta: "12345-6",
          digitoConta: "7",
          chavePix: "12345678000190",
          tipoChave: "cnpj",
          nomeBeneficiario: "João Silva",
          documentoBeneficiario: "123.456.789-01",
        }
      };

      setCliente(clienteEncontrado);
      setDadosBancarios(clienteEncontrado.dadosBancarios);
      setBancoSelecionado(clienteEncontrado.dadosBancarios.nomeBanco);
      
      toast({
        title: "Cliente encontrado",
        description: `Cliente ${clienteEncontrado.nome} carregado com sucesso.`,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Cliente não encontrado ou erro na busca.",
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
    </div>
  );
};

export default Cadastro;