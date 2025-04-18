import { IoSearchOutline, IoAddCircleOutline } from "react-icons/io5";
import {
  CategoryData,
  CategoryTableProps,
} from "../../interfaces/CategoryInterface";
import GlobalAvatar from "../Global/GlobalAvatar";
import GlobalButton from "../Global/GlobalButton";
import { Card, CardContent } from "../Global/GlobalCards";
import GlobalHelloUser from "../Global/GlobalHelloUser";
import GlobalInput from "../Global/GlobalInput";
import { GlobalTable } from "../Global/GlobalTable";
import Typography from "../Global/Typography";

export const CategoryTable: React.FC<CategoryTableProps> = ({
  categorias,
  filteredCategorias,
  searchTerm,
  currentPage,
  onSearch,
  onPageChange,
  onAdd,
  onViewDetails,
  onDelete,
}) => {
  const columns = [
    {
      key: "foto",
      title: "Imagem",
      render: (item: CategoryData) => (
        <GlobalAvatar src={item.foto} alt="Imagem" />
      ),
    },
    { key: "nome", title: "Nome" },
    { key: "descricao", title: "Descrição" },
    {
      key: "detail",
      title: "Ver Detalhes",
      render: (item: CategoryData) => (
        <button
          onClick={() => onViewDetails(item)}
          className="bg-gray-500 w-[100px] h-[30px]   rounded-md text-white"
        >
          Detalhes
        </button>
      ),
    },
    {
      key: "delete",
      title: "Apagar Categoria",
      render: (item: CategoryData) => (
        <button
          onClick={() => onDelete(item)}
          className="bg-red-500 w-[100px] h-[30px]   rounded-md text-white"
        >
          Apagar
        </button>
      ),
    },
  ];

  return (
    <>
      <GlobalHelloUser />
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-3">
            <Typography variant="h2_bold" className="w-full">
              Lista de Categorias
            </Typography>
            <GlobalInput
              placeholder="Pesquisar"
              icon={<IoSearchOutline />}
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              className="border rounded-md px-1 py-3 text-primary-950 w-[25rem]"
            />
            <GlobalButton variant="primary" fullWidth onClick={onAdd}>
              Adicionar Categoria <IoAddCircleOutline />
            </GlobalButton>
          </div>

          {filteredCategorias.length > 0 ? (
            <GlobalTable
              data={categorias}
              filteredData={filteredCategorias}
              columns={columns}
              selectable
              paginated
              itemsPerPage={5}
              withCheckbox={false}
              currentPage={currentPage}
              onPageChange={onPageChange}
              styleVariant="clean"
              onRowSelect={(selected) => console.log("Selecionados:", selected)}
            />
          ) : (
            <div className="text-center text-gray-500 py-10">
              <Typography variant="p_normal">
                Nenhuma categoria encontrada.
              </Typography>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};
