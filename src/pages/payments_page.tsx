import { useEffect, useState } from "react";
import { GlobalTable } from "../components/Global/global_table";
import { AppGlobalUserAvatarName } from "../components/Global/global_user_avatar_name";
import GlobalHelloUser from "../components/Global/global_hello_user";
import Typography from "../components/typography";
import GlobalButton from "../components/Global/global_button";
import GlobalInput from "../components/Global/global_input";
import { IoArrowDownOutline, IoSearchOutline } from "react-icons/io5";
import paymentsData from "../data/jsons/payments.json";
import { Card } from "../components/Global/global_cards";

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
    <Card>
      <div className="flex justify-between items-center p-4">
        <Typography variant="h2_bold">Histórico de Pagamentos</Typography>
        <div className="flex gap-2">
          <GlobalInput
            placeholder="Pesquisar"
            icon={<IoSearchOutline />}
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            className="border rounded-md px-1 py-3 text-primary-950 w-[30rem]"
          />
        </div>
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
