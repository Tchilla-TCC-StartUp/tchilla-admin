import { Card, CardContent } from "../components/card";
import GlobalHelloUser from "../components/global_hello_user";
import MetricCard from "../components/metric_card";
import NewUserList from "../components/news_user_list";
import SalesChart from "../components/sales_chart";
import Typography from "../components/typography";

const mockMetrics = [
  {
    title: "Total de Agendamentos",
    value: "5",
    description: "Número de Agendamentos",
  },
  { title: "Receita mensal", value: "23 000 kz", description: "View sales" },
  {
    title: "Agendamentos concluídos",
    value: "3000",
    description: "Total de Agendamentos concluídos",
  },
  {
    title: "Agendamentos cancelados",
    value: "30%",
    description: "Total de agendamentos cancelados",
  },
];

const salesData = [
  { month: "JAN", sales: 1200 },
  { month: "FEB", sales: 1500 },
  { month: "MAR", sales: 1100 },
  { month: "APR", sales: 2900 },
  { month: "MAY", sales: 3200 },
  { month: "JUN", sales: 2700 },
  { month: "JUL", sales: 3400 },
  { month: "AUG", sales: 3300 },
  { month: "SEP", sales: 2500 },
  { month: "OCT", sales: 2200 },
  { month: "NOV", sales: 2800 },
  { month: "DEC", sales: 3700 },
];

const newUsers = [
  {
    name: "Paulo Lopes Estêvão",
    joinedAt: "2 minutes ago",
    avatar: "https://i.pravatar.cc/50?img=1",
  },
  {
    name: "Jorge Cristo Neto",
    joinedAt: "2 hours ago",
    avatar: "https://i.pravatar.cc/50?img=2",
  },
  {
    name: "Wagner Coche",
    joinedAt: "1 month ago",
    avatar: "https://i.pravatar.cc/50?img=3",
  },
  {
    name: "Paulo Lopes Estêvão",
    joinedAt: "2 minutes ago",
    avatar: "https://i.pravatar.cc/50?img=1",
  },
  {
    name: "Jorge Cristo Neto",
    joinedAt: "2 hours ago",
    avatar: "https://i.pravatar.cc/50?img=2",
  },
  {
    name: "Wagner Coche",
    joinedAt: "1 month ago",
    avatar: "https://i.pravatar.cc/50?img=3",
  },
];

const Dashboard = () => {
  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex items-center justify-between">
        <GlobalHelloUser name="Celson Paixão" rule="Admin" />
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {mockMetrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      <div className="mt-10 grid  gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Typography variant="h2_bold">Rendimento</Typography>
              <div className="flex space-x-2"></div>
            </div>
            <div className="h-64 mt-4">
              <SalesChart data={salesData} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Typography variant="h2_bold">Novos clientes</Typography>
            </div>
            <NewUserList users={newUsers} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
