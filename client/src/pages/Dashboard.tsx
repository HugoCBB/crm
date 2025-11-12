import { StatCard } from "@/components/StatCard";
import { Users, UserPlus, DollarSign, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { statsApi } from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const { data: stats } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => statsApi.getDashboard(),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Visão geral do sistema CRM</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total de Usuários"
          value={stats?.usersCount || 0}
          icon={Users}
          description="Usuários cadastrados"
        />
        <StatCard
          title="Total de Leads"
          value={stats?.leadsCount || 0}
          icon={UserPlus}
          description="Leads ativos"
        />
        <StatCard
          title="Receita Total"
          value={`R$ ${stats?.totalRevenue.toFixed(2) || "0.00"}`}
          icon={DollarSign}
          description="Total de pagamentos"
        />
        <StatCard
          title="Pagamentos Pendentes"
          value={stats?.pendingPayments || 0}
          icon={TrendingUp}
          description="Aguardando confirmação"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Nenhuma atividade recente</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status dos Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Estatísticas em desenvolvimento</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
