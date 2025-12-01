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
import { paymentsApi } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface AddPaymentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    leadId: number | null;
    leadName: string | null;
}

export function AddPaymentDialog({
    open,
    onOpenChange,
    leadId,
    leadName,
}: AddPaymentDialogProps) {
    const [value, setValue] = useState("");
    const [type, setType] = useState("PIX");
    const [status, setStatus] = useState("PENDENTE");
    const [finalDate, setFinalDate] = useState("");

    const { toast } = useToast();
    const queryClient = useQueryClient();

    const createPaymentMutation = useMutation({
        mutationFn: (newPayment: {
            value: number;
            type: string;
            status: string;
            final_date: string;
            leads_id: number;
        }) => paymentsApi.create(newPayment),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["payments"] }); // Invalidate payments list if needed
            // Also invalidate leads if we show payment info there, but for now just payments
            toast({
                title: "Pagamento adicionado!",
                description: `Pagamento para ${leadName} foi registrado.`,
            });
            onOpenChange(false);
            resetForm();
        },
        onError: () => {
            toast({
                title: "Erro ao adicionar pagamento",
                description: "Não foi possível registrar o pagamento. Tente novamente.",
                variant: "destructive",
            });
        },
    });

    const resetForm = () => {
        setValue("");
        setType("PIX");
        setStatus("PENDENTE");
        setFinalDate("");
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (leadId && value && finalDate) {
            createPaymentMutation.mutate({
                value: parseFloat(value),
                type,
                status,
                final_date: finalDate,
                leads_id: leadId,
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Adicionar Pagamento</DialogTitle>
                        <DialogDescription>
                            Registre um novo pagamento para {leadName}.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="value">Valor (R$)</Label>
                            <Input
                                id="value"
                                type="number"
                                step="0.01"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="0.00"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="type">Tipo de Pagamento</Label>
                            <Select value={type} onValueChange={setType}>
                                <SelectTrigger>
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
                            <Label htmlFor="status">Status</Label>
                            <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger>
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
                            <Label htmlFor="finalDate">Data de Vencimento</Label>
                            <Input
                                id="finalDate"
                                type="date"
                                value={finalDate}
                                onChange={(e) => setFinalDate(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={createPaymentMutation.isPending}>
                            {createPaymentMutation.isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Salvando...
                                </>
                            ) : (
                                "Salvar Pagamento"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
