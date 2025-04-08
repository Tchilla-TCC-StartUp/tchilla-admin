import { useEffect } from "react";
import { Card, CardContent } from "../components/global_cards";
import GlobalHelloUser from "../components/global_hello_user";
import MetricCard from "../components/metric_card";
import NewUserList from "../components/news_user_list";
import SalesChart from "../components/sales_chart";
import Typography from "../components/typography";
import newUserData from "../data/jsons/new_users.json";
import UserService from "../service/user_service";
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

const newUsers = newUserData;

const Dashboard = () => {
  const { fetchUserData } = UserService();
  useEffect(() => {
    const fetchData = async () => {
      await fetchUserData();
    };
    fetchData();
  }, []);
  return (
    <div className="w-full h-screen overflow-hidden flex-1">
      <div className="flex items-center justify-between">
        <GlobalHelloUser />
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {mockMetrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      <div className="flex items-center justify-between mt-6 gap-4">
        <Card className="flex-1">
          <CardContent className="p-4 h-[28rem]">
            <Typography variant="h2_bold">Rendimento</Typography>
            <SalesChart data={salesData} />
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardContent className="p-4 h-[28rem]">
            <Typography variant="h2_bold">Novos clientes</Typography>
            <NewUserList users={newUsers} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
