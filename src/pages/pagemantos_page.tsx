import { FaBox } from "react-icons/fa6";
import GlobalInput from "../components/global_input";
import { useState } from "react";
import GlobalButton from "../components/global_button";


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

const PagamentosPage = () => {
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
        {mockMetrics.map((metric, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
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
        <CustomerPaymentTable />
      </div>
    </div>
  );
};

const CustomerPaymentTable = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Record<number, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 

  const data = [
    {
      name: "Sophia Davis",
      email: "sophiadavis@gmail.com",
      avatar: "https://i.pravatar.cc/50?img=1",
      payment: "100.000 Kz",
      method: "TPA",
      date: "01.04.2024 / 12:45",
      services: "Viatura+Fotógrafo"
    },
    {
      name: "Liam Brown",
      email: "liambrown@gmail.com",
      avatar: "https://i.pravatar.cc/50?img=1",
      payment: "100.000 Kz",
      method: "Transferência Bancária",
      date: "01.04.2024 / 12:45",
      services: "Garçom"
    },
    {
      name: "Ethan Wilson",
      email: "ethanwilson@gmail.com",
      avatar: "https://i.pravatar.cc/50?img=1",
      payment: "100.000 Kz",
      method: "Foi de Kilape",
      date: "01.04.2024 / 12:45",
      services: "Ex da noiva"
    },
    {
      name: "Olivia Johnson",
      email: "oliviajohnson@gmail.com",
      avatar: "https://i.pravatar.cc/50?img=1",
      payment: "100.000 Kz",
      method: "Dinheiro em espécie",
      date: "01.04.2024 / 12:45",
      services: "Salão de eventos"
    },
    {
      name: "Liam Brown",
      email: "liambrown@gmail.com",
      avatar: "https://i.pravatar.cc/50?img=1",
      payment: "100.000 Kz",
      method: "Transferência Bancária",
      date: "01.04.2024 / 12:45",
      services: "Garçom"
    },
    {
      name: "Ethan Wilson",
      email: "ethanwilson@gmail.com",
      avatar: "https://i.pravatar.cc/50?img=1",
      payment: "100.000 Kz",
      method: "Foi de Kilape",
      date: "01.04.2024 / 12:45",
      services: "Ex da noiva"
    }
  ];

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    const newSelectedRows: Record<number, boolean> = {};
    
    paginatedData.forEach((_, index) => {
      newSelectedRows[index] = newSelectAll;
    });

    setSelectedRows(newSelectedRows);
  };

  const handleRowSelect = (index: number) => {
    const newSelectedRows = { ...selectedRows, [index]: !selectedRows[index] };
    setSelectedRows(newSelectedRows);
    setSelectAll(Object.values(newSelectedRows).every(Boolean));
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-slate-700">Título</h2>
        <div className="flex gap-2">
          <GlobalButton>+Adicionar</GlobalButton>
          <GlobalInput
            placeholder="Search"
            className="border rounded-md px-1 py-3 text-slate-500 border-slate-500"
          />
        </div>
      </div>

      <table className="w-full border-collapse rounded-lg overflow-hidden">
        <thead className="bg-slate-50 text-slate-500 text-left">
          <tr>
            <th className="p-3">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th className="p-3">Nome do Cliente</th>
            <th className="p-3">Pagamento</th>
            <th className="p-3">Modo de pagamento</th>
            <th className="p-3">Data do pagamento</th>
            <th className="p-3">S/P Pagos</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((customer, index) => (
            <tr key={index} className="border-b text-slate-500">
              <td className="p-3">
                <input
                  type="checkbox"
                  checked={selectedRows[index] || false}
                  onChange={() => handleRowSelect(index)}
                />
              </td>
              <td className="p-3 flex items-center gap-2">
                <img
                  src={customer.avatar}
                  alt={customer.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold text-neutral-900">
                    {customer.name}
                  </p>
                  <p className="text-sm text-neutral-900">{customer.email}</p>
                </div>
              </td>
              <td className="p-3">{customer.payment}</td>
              <td className="p-3">{customer.method}</td>
              <td className="p-3">{customer.date}</td>
              <td className="p-3">{customer.services}</td>
              <td className="p-3">
                <button className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-500 hover:bg-gray-100">
                  <span className="text-slate-500 text-lg">•••</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
        <p>
          Mostrando <span className="font-bold">{startIndex + 1}</span> -{" "}
          <span className="font-bold">{Math.min(endIndex, data.length)}</span>{" "}
          de <span className="font-bold">{data.length}</span> resultados
        </p>
        <div className="flex gap-2">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-600 hover:bg-gray-200"
            }`}
          >
            ←
          </button>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-600 hover:bg-gray-200"
            }`}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default PagamentosPage;