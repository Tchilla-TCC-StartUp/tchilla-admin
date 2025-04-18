import { useEffect, useState } from "react";
import { GlobalTable } from "../components/Global/GlobalTable";
import { AppGlobalUserAvatarName } from "../components/Global/GlobalUserAvatarName";
import GlobalHelloUser from "../components/Global/GlobalHelloUser";
import Typography from "../components/Global/Typography";
import GlobalButton from "../components/Global/GlobalButton";
import GlobalInput from "../components/Global/GlobalInput";
import { IoArrowDownOutline, IoSearchOutline } from "react-icons/io5";
import paymentsData from "../data/jsons/payments.json";
import { Card } from "../components/Global/GlobalCards";

const PaymentsPage = () => {
  return (
    <div className="bg-white min-h-screen gap-5 flex flex-col">
      <div className="flex justify-between items-center">
        <GlobalHelloUser />
        <GlobalButton>
          Baixar Relatório
          <IoArrowDownOutline />
        </GlobalButton>
      </div>
      <CustomerPaymentTable />
    </div>
  );
};

const CustomerPaymentTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(paymentsData);

  const data = paymentsData;

  const columns = [
    {
      key: "avatar",
      title: "Avatar",
      render: (item: any) =>
        item.avatar ? (
          <AppGlobalUserAvatarName size={30} name={item.name} />
        ) : null,
    },
    { key: "name", title: "Nome" },
    { key: "email", title: "Email" },
    { key: "payment", title: "Pagamento" },
    { key: "method", title: "Método de pagamento" },
    { key: "date", title: "Data" },
    { key: "services", title: "Serviços" },
  ];

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = data.filter((item: any) => {
      return (
        item.name?.toLowerCase().includes(term) ||
        item.email?.toLowerCase().includes(term) ||
        item.method?.toLowerCase().includes(term) ||
        item.date?.toLowerCase().includes(term) ||
        item.services?.toLowerCase().includes(term)
      );
    });
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <Card className="p-4">
      <div className="flex  flex-col justify-center items-start p-0 gap-3 mb-1 md:flex-row md:justify-between md:items-center md:gap-0 border-b pb-5">
        <Typography variant="h2_bold" className="w-full">
          Histórico de Pagamentos
        </Typography>
        <GlobalInput
          placeholder="Pesquisar"
          icon={<IoSearchOutline />}
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
        />
      </div>

      <GlobalTable
        data={data}
        filteredData={filteredData}
        columns={columns}
        selectable
        paginated
        styleVariant="clean"
        itemsPerPage={10}
        currentPage={currentPage}
        onPageChange={(page: number) => setCurrentPage(page)}
        onRowSelect={(selectedItems) =>
          console.log("Selecionados:", selectedItems)
        }
      />
    </Card>
  );
};

export default PaymentsPage;
