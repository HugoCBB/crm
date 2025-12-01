import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Payment, paymentsApi } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface EditPaymentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    payment: Payment | null;
}

export function EditPaymentDialog({
    open,
    onOpenChange,
    payment,
}: EditPaymentDialogProps) {
    const [value, setValue] = useState("");
    const [type, setType] = useState("PIX");
    const [status, setStatus] = useState("PENDENTE");
    const [finalDate, setFinalDate] = useState("");

    const { toast } = useToast();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (payment) {
            setValue(payment.value.toString());
            setType(payment.type);
            setStatus(payment.status);
            // Format date for input type="date" (YYYY-MM-DD)
            // Assuming payment.final_date comes as ISO string or YYYY-MM-DD
            const date = new Date(payment.final_date);
            setFinalDate(date.toISOString().split('T')[0]);
        }
    }, [payment]);

    const updatePaymentMutation = useMutation({
        mutationFn: (updatedPayment: Partial<Payment>) => {
            if (!payment) throw new Error("No payment selected");
            return paymentsApi.update(payment.id, updatedPayment);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["payments"] });
            toast({
                title: "Pagamento atualizado!",
                description: "As informações do pagamento foram salvas.",
            });
            onOpenChange(false);
        },
        onError: () => {
            toast({
                title: "Erro ao atualizar pagamento",
                description: "Não foi possível salvar as alterações. Tente novamente.",
                variant: "destructive",
            });
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (payment && value && finalDate) {
            updatePaymentMutation.mutate({
                value: parseFloat(value),
                type,
                status,
                final_date: finalDate,
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Editar Pagamento</DialogTitle>
                        <DialogDescription>
                            Modifique as informações do pagamento.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="edit-value">Valor (R$)</Label>
                            <Input
                                id="edit-value"
                                type="number"
                                step="0.01"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="0.00"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-type">Tipo de Pagamento</Label>
                            <Select value={type} onValueChange={setType}>
                                <SelectTrigger id="edit-type">
                                    <SelectValue placeholder="Selecione o tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="PIX">PIX</SelectItem>
                                    <SelectItem value="BOLETO">Boleto</SelectItem>
                                    <SelectItem value="CARTAO">Cartão</SelectItem>
                                    <SelectItem value="AVISTA">À Vista</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-status">Status</Label>
                            <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger id="edit-status">
                                    <SelectValue placeholder="Selecione o status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="PENDENTE">Pendente</SelectItem>
                                    <SelectItem value="PAGO">Pago</SelectItem>
                                    <SelectItem value="VENCIDO">Vencido</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-finalDate">Data de Vencimento</Label>
                            <Input
                                id="edit-finalDate"
                                type="date"
                                value={finalDate}
                                onChange={(e) => setFinalDate(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={updatePaymentMutation.isPending}>
                            {updatePaymentMutation.isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Salvando...
                                </>
                            ) : (
                                "Salvar Alterações"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
