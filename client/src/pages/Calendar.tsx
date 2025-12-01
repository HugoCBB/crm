import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { ptBR } from "date-fns/locale";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { schedulesApi, leadsApi, Schedule } from "@/services/api";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Plus, Calendar as CalendarIcon, Clock } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const CalendarPage = () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [open, setOpen] = useState(false);
    const [selectedLeadId, setSelectedLeadId] = useState<string>("");
    const [description, setDescription] = useState("");
    const [time, setTime] = useState("09:00");

    const { toast } = useToast();
    const queryClient = useQueryClient();

    // Fetch Schedules
    const { data: schedules, isLoading: isLoadingSchedules } = useQuery({
        queryKey: ["schedules"],
        queryFn: schedulesApi.getAll,
    });

    // Fetch Leads for the dropdown
    const { data: leads } = useQuery({
        queryKey: ["leads"],
        queryFn: leadsApi.getAll,
    });

    // Filter schedules for the selected date
    const selectedDateSchedules = schedules?.filter((schedule) => {
        if (!date) return false;
        // Assuming schedule.date is "YYYY-MM-DD" or ISO string
        // We need to compare just the date part
        const scheduleDate = new Date(schedule.date);
        return (
            scheduleDate.getDate() === date.getDate() &&
            scheduleDate.getMonth() === date.getMonth() &&
            scheduleDate.getFullYear() === date.getFullYear()
        );
    }) || [];

    const createScheduleMutation = useMutation({
        mutationFn: (newSchedule: { lead_id: number; date: string; description: string }) =>
            schedulesApi.create(newSchedule),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["schedules"] });
            setOpen(false);
            setDescription("");
            setSelectedLeadId("");
            toast({
                title: "Agendamento criado!",
                description: "A visita foi agendada com sucesso.",
            });
        },
        onError: () => {
            toast({
                title: "Erro ao agendar",
                description: "Não foi possível criar o agendamento.",
                variant: "destructive",
            });
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (date && selectedLeadId) {
            // Combine date and time
            const dateTime = new Date(date);
            const [hours, minutes] = time.split(':');
            dateTime.setHours(parseInt(hours), parseInt(minutes));

            // Format as ISO string or whatever backend expects. 
            // Backend expects string. Let's send ISO for now or YYYY-MM-DD HH:mm
            // The backend domain says `Date string`.
            // Let's try sending ISO string.

            createScheduleMutation.mutate({
                lead_id: parseInt(selectedLeadId),
                date: dateTime.toISOString(),
                description: description || "Visita agendada",
            });
        }
    };

    // Create a set of dates that have events to highlight them
    const eventDates = schedules?.map(s => new Date(s.date)) || [];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-foreground">Agenda</h1>
                <p className="text-muted-foreground mt-1">Gerencie as visitas e compromissos</p>
            </div>

            <div className="grid md:grid-cols-[300px_1fr] gap-6">
                <Card className="h-fit">
                    <CardContent className="p-0">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            locale={ptBR}
                            className="rounded-md border"
                            modifiers={{
                                booked: eventDates
                            }}
                            modifiersStyles={{
                                booked: { fontWeight: 'bold', textDecoration: 'underline', color: 'var(--primary)' }
                            }}
                        />
                    </CardContent>
                </Card>

                <Card className="flex-1">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>
                            {date ? format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : "Selecione uma data"}
                        </CardTitle>
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button disabled={!date}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Novo Agendamento
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <form onSubmit={handleSubmit}>
                                    <DialogHeader>
                                        <DialogTitle>Agendar Visita</DialogTitle>
                                        <DialogDescription>
                                            Marque uma visita para um lead nesta data.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="lead">Lead</Label>
                                            <Select value={selectedLeadId} onValueChange={setSelectedLeadId}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione o lead" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {leads?.map((lead) => (
                                                        <SelectItem key={lead.id} value={lead.id.toString()}>
                                                            {lead.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="time">Horário</Label>
                                            <Input
                                                id="time"
                                                type="time"
                                                value={time}
                                                onChange={(e) => setTime(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="description">Descrição</Label>
                                            <Input
                                                id="description"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                placeholder="Ex: Reunião de apresentação"
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit" disabled={createScheduleMutation.isPending}>
                                            {createScheduleMutation.isPending ? "Agendando..." : "Confirmar Agendamento"}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4 mt-4">
                            {isLoadingSchedules ? (
                                <p className="text-muted-foreground">Carregando agenda...</p>
                            ) : selectedDateSchedules.length === 0 ? (
                                <div className="text-center py-10 text-muted-foreground">
                                    <CalendarIcon className="mx-auto h-10 w-10 mb-3 opacity-20" />
                                    <p>Nenhum agendamento para este dia.</p>
                                </div>
                            ) : (
                                selectedDateSchedules.map((schedule) => (
                                    <div
                                        key={schedule.id}
                                        className="flex items-center p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors"
                                    >
                                        <div className="mr-4 bg-primary/10 p-2 rounded-full">
                                            <Clock className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-foreground">
                                                {schedule.lead?.name || `Lead #${schedule.lead_id}`}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {format(new Date(schedule.date), "HH:mm")} - {schedule.description}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default CalendarPage;
