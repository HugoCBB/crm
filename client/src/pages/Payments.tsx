import { useQuery } from "@tanstack/react-query";
import { Payment, paymentsApi } from "@/services/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { EditPaymentDialog } from "@/components/EditPaymentDialog";

const Payments = () => {
  const [editOpen, setEditOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const { data: payments, isLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: () => paymentsApi.getAll(),
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PAGO":
        return "bg-success text-white";
      case "PENDENTE":
        return "bg-warning text-white";
      case "VENCIDO":
        return "bg-destructive text-white";
      default:
        return "bg-muted";
    }
  };

  const handleEdit = (payment: Payment) => {
    setSelectedPayment(payment);
    setEditOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Financeiro</h1>
        <p className="text-sm md:text-base text-muted-foreground mt-1">Gerenciamento de pagamentos</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Pagamentos</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-muted-foreground">Carregando...</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">Lead</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="whitespace-nowrap">Vencimento</TableHead>
                    <TableHead className="whitespace-nowrap">Data de Criação</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments?.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium whitespace-nowrap">
                        {payment.lead?.name || `Lead #${payment.leads_id}`}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">R$ {Number(payment.value).toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{payment.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(payment.status)}>
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {new Date(payment.final_date).toLocaleDateString("pt-BR")}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {new Date(payment.create_date).toLocaleDateString("pt-BR")}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(payment)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {(!payments || payments.length === 0) && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground">
                        Nenhum pagamento encontrado
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <EditPaymentDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        payment={selectedPayment}
      />
    </div>
  );
};

export default Payments;
