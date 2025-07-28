import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Download, FileDown } from "lucide-react";

interface User {
  email: string;
  role: string;
  name: string;
}

interface RepassesProps {
  user: User;
}

const Repasses = ({ user }: RepassesProps) => {
  const [searchId, setSearchId] = useState("");
  const [filteredRepasses, setFilteredRepasses] = useState([
    { id: "REP001", cliente: "João Silva", valor: "R$ 1.250,00", data: "25/01/2025", hora: "14:30", status: "Concluído" },
    { id: "REP002", cliente: "Maria Santos", valor: "R$ 890,50", data: "25/01/2025", hora: "13:15", status: "Concluído" },
    { id: "REP003", cliente: "Pedro Costa", valor: "R$ 2.100,00", data: "25/01/2025", hora: "12:45", status: "Pendente" },
    { id: "REP004", cliente: "Ana Lima", valor: "R$ 675,25", data: "24/01/2025", hora: "16:20", status: "Concluído" },
    { id: "REP005", cliente: "Carlos Oliveira", valor: "R$ 1.480,00", data: "24/01/2025", hora: "15:10", status: "Concluído" },
  ]);

  const handleSearch = () => {
    if (searchId.trim() === "") {
      // Resetar para todos os repasses
      setFilteredRepasses([
        { id: "REP001", cliente: "João Silva", valor: "R$ 1.250,00", data: "25/01/2025", hora: "14:30", status: "Concluído" },
        { id: "REP002", cliente: "Maria Santos", valor: "R$ 890,50", data: "25/01/2025", hora: "13:15", status: "Concluído" },
        { id: "REP003", cliente: "Pedro Costa", valor: "R$ 2.100,00", data: "25/01/2025", hora: "12:45", status: "Pendente" },
        { id: "REP004", cliente: "Ana Lima", valor: "R$ 675,25", data: "24/01/2025", hora: "16:20", status: "Concluído" },
        { id: "REP005", cliente: "Carlos Oliveira", valor: "R$ 1.480,00", data: "24/01/2025", hora: "15:10", status: "Concluído" },
      ]);
    } else {
      const filtered = filteredRepasses.filter(repasse => 
        repasse.id.toLowerCase().includes(searchId.toLowerCase())
      );
      setFilteredRepasses(filtered);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Repasses Diários</h1>
        <p className="text-muted-foreground">Consulte todos os repasses financeiros realizados para os clientes</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Repasses Hoje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 28.450</div>
            <p className="text-xs text-muted-foreground">15 transações</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 5.230</div>
            <p className="text-xs text-muted-foreground">3 repasses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Este Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 124.890</div>
            <p className="text-xs text-muted-foreground">+15% vs mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Taxa Média</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.8%</div>
            <p className="text-xs text-muted-foreground">Comissão</p>
          </CardContent>
        </Card>
      </div>

      {/* Busca por ID */}
      <Card>
        <CardHeader>
          <CardTitle>Buscar Repasse por ID</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              placeholder="Digite o ID do repasse (ex: REP001)"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSearch} className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              Buscar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Repasses */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Histórico de Repasses Diários</CardTitle>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Exportar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Hora</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRepasses.map((repasse) => (
                <TableRow key={repasse.id}>
                  <TableCell className="font-medium">{repasse.id}</TableCell>
                  <TableCell>{repasse.cliente}</TableCell>
                  <TableCell>{repasse.valor}</TableCell>
                  <TableCell>{repasse.data}</TableCell>
                  <TableCell>{repasse.hora}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      repasse.status === "Concluído" 
                        ? "bg-success/10 text-success" 
                        : "bg-warning/10 text-warning"
                    }`}>
                      {repasse.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {repasse.status === "Concluído" && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => {
                          // Simular download do comprovante
                          const link = document.createElement('a');
                          link.href = `data:text/plain;charset=utf-8,Comprovante de Repasse\nID: ${repasse.id}\nCliente: ${repasse.cliente}\nValor: ${repasse.valor}\nData: ${repasse.data} ${repasse.hora}`;
                          link.download = `comprovante-${repasse.id}.txt`;
                          link.click();
                        }}
                      >
                        <FileDown className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredRepasses.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum repasse encontrado para o ID "{searchId}"
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Repasses;