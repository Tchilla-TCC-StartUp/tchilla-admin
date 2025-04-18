import { IoSearchOutline } from "react-icons/io5";
import { GlobalTable } from "../Global/GlobalTable";
import { Card, CardContent } from "../Global/GlobalCards";
import Typography from "../Global/Typography";
import GlobalInput from "../Global/GlobalInput";
import { AppGlobalUserAvatarName } from "../Global/GlobalUserAvatarName";
import { ClientesData } from "../../interfaces/ClientsInterface";

interface ClientsTableProps {
  data: ClientesData[];
  filteredData: ClientesData[];
  currentPage: number;
  searchTerm: string;
  setCurrentPage: (page: number) => void;
  setSearchTerm: (term: string) => void;
  handleDeleteClick: (user: ClientesData) => void;
}

export const ClientsTable = ({
  data,
  filteredData,
  currentPage,
  searchTerm,
  setCurrentPage,
  setSearchTerm,
  handleDeleteClick,
}: ClientsTableProps) => {
  const columns = [
    {
      key: "avatar",
      title: "Avatar",
      render: (item: ClientesData) =>
        item.nome ? (
          <AppGlobalUserAvatarName size={30} name={item.nome} />
        ) : null,
    },
    { key: "nome", title: "Nome" },
    { key: "email", title: "Email" },
    { key: "telefone", title: "Telefone" },

    {
      key: "details",
      title: "Ver Detalhes",
      render: (item: ClientesData) => (
        <button
          className="bg-gray-500 text-white w-[100px] h-[30px] rounded"
          onClick={() => console.log("Ver Detalhes", item.id)}
        >
          <Typography variant="p_normal">Detalhes</Typography>
        </button>
      ),
    },
    {
      key: "delete",
      title: "Apagar",
      render: (item: ClientesData) => (
        <button
          className="bg-red-500 text-white w-[100px] h-[30px]   rounded"
          onClick={() => handleDeleteClick(item)}
        >
          <Typography variant="p_normal">Apagar</Typography>
        </button>
      ),
    },
  ];

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col justify-between items-center md:flex-row gap-6">
          <Typography variant="h2_bold" className="w-full">
            Lista de Clientes
          </Typography>
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

        {filteredData.length > 0 ? (
          <GlobalTable
            data={data}
            filteredData={filteredData}
            columns={columns}
            selectable
            paginated
            styleVariant="clean"
            itemsPerPage={10}
            withCheckbox={false}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onRowSelect={(selectedItems) =>
              console.log("Selecionados:", selectedItems)
            }
          />
        ) : (
          <div className="text-center text-gray-500 py-10">
            <Typography variant="p_normal">
              Nenhum cliente encontrado.
            </Typography>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
