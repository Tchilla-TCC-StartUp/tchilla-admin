import { FaBox, FaEllipsisH } from "react-icons/fa";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area } from "recharts";
import { Card, CardContent } from "../components/card";



type Metric = {
  title: string;
  value: string | number;
  description: string;
};


const mockMetrics: Metric[] = [
  { title: "Total de Agendamentos", value: "5", description: "Número de Agendamentos" },
  { title: "Receita mensal", value: "23 000 kz", description: "View sales" },
  { title: "Agendamentos concluídos", value: "3000", description: "Total de Agendamentos concluídos" },
  { title: "Agendamentos cancelados", value: "30%", description: "Total de agendamentos cancelados" },
];

const Dashboard = () => {
  
  const metrics: Metric[] = mockMetrics;

  return (
    <div className="p-6 bg-white min-h-screen">
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-500">Hello Admin,</h2>
          <h1 className="text-2xl font-bold">Celson Mamboo</h1>
        </div>
        <button className="bg-blue-900 text-white px-4 py-2 rounded-md">
          + Create post
        </button>
      </div>

      
      <div className="mt-6 grid grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{metric.title}</h3>
              <FaBox className="text-gray-400" />
            </div>
            <p className="text-2xl font-bold mt-2">{metric.value}</p>
            <p className="text-gray-500 text-sm">{metric.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <SalesDashboard />
      </div>
      <div className="mt-10">
        <UserTable />
      </div>
    </div>

  );
};

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
  { month: "DEC", sales: 3700 }
];

const pendingOrders = [
  { name: "Paulo Lopes Estêvão", time: "2 minutes ago", avatar: "https://i.pravatar.cc/50?img=1" },
  { name: "Jorge Cristo Neto", time: "2 hours ago", avatar: "https://i.pravatar.cc/50?img=2" },
  { name: "Wagner Coche", time: "1 month ago", avatar: "https://i.pravatar.cc/50?img=3" },
  { name: "Wagner Coche", time: "1 month ago", avatar: "https://i.pravatar.cc/50?img=3" },
  { name: "Wagner Coche", time: "1 month ago", avatar: "https://i.pravatar.cc/50?img=3" }
];

function SalesDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Rendimento 2024</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm border rounded-md">Diário</button>
              <button className="px-3 py-1 text-sm border rounded-md">Semanal</button>
              <button className="px-3 py-1 text-sm border rounded-md bg-blue-900 text-white">Anual</button>
            </div>
          </div>
          <p className="text-2xl font-semibold mt-2">$12.7k <span className="text-green-500 text-sm">1.3% VS LAST YEAR</span></p>
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="sales" stroke="#2563eb" fill="#2563eb80" />
                <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={2} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Pedidos pendentes</h2>
            <a href="#" className="text-gray-500 text-sm">View requests →</a>
          </div>
          <div className="flex border-b mt-3">
            <button className="flex-1 py-2 border-b-2 border-black font-semibold">Pedidos pendentes (5)</button>
            <button className="flex-1 py-2 text-gray-500">Meus pedidos (120)</button>
          </div>
          <ul className="mt-4 space-y-3">
            {pendingOrders.map((order, index) => (
              <li key={index} className="flex items-center justify-between p-3 bg-neutral-100 rounded-lg">
                <div className="flex items-center space-x-3">
                  <img src={order.avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="font-medium">{order.name}</p>
                    <span className="text-sm text-gray-500">{order.time}</span>
                  </div>
                </div>
                <FaEllipsisH className="text-gray-500 cursor-pointer" />
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
const UserTable = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Record<number, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const data = [
    {
      name: "Marta Alvaro",
      email: "martaalvaro@gmail.com",
      avatar: "https://i.pravatar.cc/50?img=1",
      date: "01.04.2024 / 12:45",
      location: "Mutamba",
      status: "Pendente",
      statusColor: "bg-yellow-200 text-yellow-800",
    },
    {
      name: "Sophia Davis",
      email: "sophiadavis@gmail.com",
      avatar: "https://i.pravatar.cc/50?img=2",
      date: "01.04.2024 / 12:45",
      location: "Cazenga",
      status: "Aceite",
      statusColor: "bg-green-200 text-green-800",
    },
    {
      name: "Olivia Johnson",
      email: "oliviajohnson@gmail.com",
      avatar: "https://i.pravatar.cc/50?img=3",
      date: "01.04.2024 / 12:45",
      location: "Hoje ya Henda",
      status: "Cancelada",
      statusColor: "bg-red-200 text-red-800",
    },
    {
      name: "Sophia Davis",
      email: "sophiadavis@gmail.com",
      avatar: "https://i.pravatar.cc/50?img=2",
      date: "01.04.2024 / 12:45",
      location: "Cazenga",
      status: "Aceite",
      statusColor: "bg-green-200 text-green-800",
    },
    {
      name: "Marta Alvaro",
      email: "martaalvaro@gmail.com",
      avatar: "https://i.pravatar.cc/50?img=1",
      date: "01.04.2024 / 12:45",
      location: "Mutamba",
      status: "Pendente",
      statusColor: "bg-yellow-200 text-yellow-800",
    },
    {
      name: "Marta Alvaro",
      email: "martaalvaro@gmail.com",
      avatar: "https://i.pravatar.cc/50?img=1",
      date: "01.04.2024 / 12:45",
      location: "Mutamba",
      status: "Pendente",
      statusColor: "bg-yellow-200 text-yellow-800",
    },
    {
      name: "Marta Alvaro",
      email: "martaalvaro@gmail.com",
      avatar: "https://i.pravatar.cc/50?img=1",
      date: "01.04.2024 / 12:45",
      location: "Mutamba",
      status: "Pendente",
      statusColor: "bg-yellow-200 text-yellow-800",
    },
  ];

  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    const newSelectedRows: Record<number, boolean> = {};
    currentData.forEach((_, index) => {
      newSelectedRows[index] = newSelectAll;
    });
    setSelectedRows(newSelectedRows);
  };

  const handleRowSelect = (index: number) => {
    const newSelectedRows = { ...selectedRows, [index]: !selectedRows[index] };
    setSelectedRows(newSelectedRows);
    setSelectAll(Object.values(newSelectedRows).every(Boolean));
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Título</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-md text-gray-600">+ Adicionar</button>
          <input className="border rounded-md px-2 py-2 text-gray-600" placeholder="Search" />
        </div>
      </div>

      <table className="w-full border-collapse rounded-lg overflow-hidden">
        <thead className="bg-gray-50 text-slate-500 text-left">
          <tr>
            <th className="p-3">
              <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
            </th>
            <th className="p-3">Nome do Usuário</th>
            <th className="p-3">Data e Hora</th>
            <th className="p-3">Endereço</th>
            <th className="p-3">Estado</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((customer, index) => (
            <tr key={index} className="border-b text-gray-600">
              <td className="p-3">
                <input
                  type="checkbox"
                  checked={selectedRows[index] || false}
                  onChange={() => handleRowSelect(index)}
                />
              </td>
              <td className="p-3 flex items-center gap-2">
                <img src={customer.avatar} alt={customer.name} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-semibold text-zinc-900">{customer.name}</p>
                  <p className="text-sm text-zinc-900">{customer.email}</p>
                </div>
              </td>
              <td className="p-3 text-slate-500">{customer.date}</td>
              <td className="p-3 text-slate-500">{customer.location}</td>
              <td className="p-3">
                <span className={`px-3 py-1 rounded-full text-sm ${customer.statusColor} min-w-[100px] text-center inline-block`}>
                  {customer.status}
                </span>
              </td>
              <td className="p-3 text-center">
              <button className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-500 hover:bg-gray-100">
                  <span className="text-slate-500 text-lg">•••</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4 text-sm text-slate-500">
        <p>
          Mostrando <span className="font-bold">{startIndex + 1}</span> -{" "}
          <span className="font-bold">{Math.min(endIndex, data.length)}</span> de{" "}
          <span className="font-bold">{data.length}</span> resultados
        </p>
        <div className="flex gap-2">
          <button
            className={`w-8 h-8 flex items-center justify-center rounded-full border ${currentPage === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "hover:bg-gray-200"
              }`}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            ←
          </button>

          <button
            className={`w-8 h-8 flex items-center justify-center rounded-full border ${currentPage === totalPages ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "hover:bg-gray-200"
              }`}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};



export default Dashboard;