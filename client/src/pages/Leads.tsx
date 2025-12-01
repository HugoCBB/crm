import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Lead, leadsApi } from "@/services/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, DollarSign } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { AddPaymentDialog } from "@/components/AddPaymentDialog";

const Leads = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Payment Dialog State
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<{ id: number, name: string } | null>(null);

  const { toast } = useToast();
  const queryClient = useQueryClient();


  const { data: leads, isLoading } = useQuery({
    queryKey: ['leads'],
    queryFn: leadsApi.getAll
  });



  const createLeadMutation = useMutation({
    mutationFn: (newLead: { name: string; phone: string }) =>
      leadsApi.create({
        name: newLead.name,
        phone: newLead.phone,
      }),


    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      setOpen(false);
      setName("");
      setPhone("");
      toast({
        title: "Lead criado com sucesso!",
        description: "O novo lead foi adicionado à lista.",
      });
    },
    onError: () => {
      toast({
        title: "Erro ao criar lead",
        description: "Não foi possível criar o lead. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone) {
      createLeadMutation.mutate({ name, phone });
    }
  };

  const handleAddPayment = (lead: Lead) => {
    setSelectedLead({ id: lead.id, name: lead.name });
    setPaymentOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Leads</h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">Gerenciamento de leads</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 w-full sm:w-auto">
              <Plus className="h-4 w-4" />
              Adicionar Lead
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Novo Lead</DialogTitle>
                <DialogDescription>
                  Adicione um novo lead ao sistema.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nome do lead"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(00) 00000-0000"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={createLeadMutation.isPending}>
                  {createLeadMutation.isPending ? "Criando..." : "Criar Lead"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Leads</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-muted-foreground">Carregando...</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead className="whitespace-nowrap">Data de Criação</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground">
                        Nenhum lead encontrado
                      </TableCell>
                    </TableRow>
                  ) : (
                    leads?.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="font-medium whitespace-nowrap">{lead.name}</TableCell>
                        <TableCell className="whitespace-nowrap">{lead.phone}</TableCell>
                        <TableCell className="whitespace-nowrap">
                          {lead.create_date}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={() => handleAddPayment(lead)}
                          >
                            <DollarSign className="h-4 w-4" />
                            <span className="hidden sm:inline">Pagamento</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}

                </TableBody>

              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <AddPaymentDialog
        open={paymentOpen}
        onOpenChange={setPaymentOpen}
        leadId={selectedLead?.id || null}
        leadName={selectedLead?.name || null}
      />
    </div>
  );
};

export default Leads;
