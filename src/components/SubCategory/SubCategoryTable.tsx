import { GlobalTable } from "../Global/GlobalTable";
import Typography from "../Global/Typography";
import {
  SubCategoryData,
  SubCategoryTableProps,
} from "../../interfaces/SubCategoryInterface";
import { SubCategoryForm } from "./SubCategoryForm";

export const SubCategoryTable: React.FC<SubCategoryTableProps> = ({
  subCategorias,
  currentPage,
  onPageChange,
  onAdd,
  onDelete,
  categoriaId,
}) => {
  const columns = [
    { key: "nome", title: "Nome" },
    { key: "descricao", title: "Descrição" },
    {
      key: "delete",
      title: "Apagar SubCategoria",
      render: (item: SubCategoryData) => (
        <button
          onClick={() => onDelete(item)}
          className="bg-red-500 p-2 rounded-md text-white"
        >
          Deletar
        </button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6 flex-1">
      <SubCategoryForm
        categoriaId={categoriaId}
        title="Adicionar Uma Sub Categoria"
        onSubmit={onAdd}
      />
      <Typography variant="h2_bold" className="w-full my-4">
        SubCategorias
      </Typography>
      {subCategorias.length > 0 ? (
        <GlobalTable
          data={subCategorias}
          columns={columns}
          selectable
          paginated
          itemsPerPage={6}
          withCheckbox={false}
          currentPage={currentPage}
          onPageChange={onPageChange}
          styleVariant="clean"
          onRowSelect={(selected) => console.log("Selecionados:", selected)}
        />
      ) : (
        <div className="text-center text-gray-500 py-10">
          <Typography variant="p_normal">
            Nenhuma SubCategoria encontrada.
          </Typography>
        </div>
      )}
    </div>
  );
};
