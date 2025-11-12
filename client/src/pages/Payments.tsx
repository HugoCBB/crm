import { useQuery } from "@tanstack/react-query";
import { paymentsApi } from "@/services/api";
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

const Payments = () => {
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Financeiro</h1>
        <p className="text-muted-foreground mt-1">Gerenciamento de pagamentos</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Pagamentos</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-muted-foreground">Carregando...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lead</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead>Data de Criação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments?.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">
                      -
                    </TableCell>
                    <TableCell>R$ {Number(payment.value).toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{payment.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(payment.status)}>
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(payment.final_date).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell>
                      {new Date(payment.create_date).toLocaleDateString("pt-BR")}
                    </TableCell>
                  </TableRow>
                ))}
                {(!payments || payments.length === 0) && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      Nenhum pagamento encontrado
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Payments;
