import { useEffect, useState } from "react";
import GlobalBackButton from "../Global/GlobalBackButton";
import GlobalButton from "../Global/GlobalButton";
import { Card } from "../Global/GlobalCards";
import GlobalInput from "../Global/GlobalInput";
import Typography from "../Global/Typography";
import {
  CategoryDetailsProps,
  CategoryFormFields,
} from "../../interfaces/CategoryInterface";
import UploadImagemPreview from "../Global/UploadImagemPreview";
import useSubCategory from "../../hooks/SubCategoryHook";
import { SubCategoryTable } from "../SubCategory/SubCategoryTable";
import GlobalConfirmModal from "../Global/GloalModals";

export const CategoryDetails: React.FC<CategoryDetailsProps> = ({
  categoria,
  onSave,
  onBack,
}) => {
  const [formFields, setFormFields] = useState<CategoryFormFields>({
    nome: categoria?.nome || "",
    descricao: categoria?.descricao || "",
    foto: null,
  });

  const handleFormChange = (
    key: keyof CategoryFormFields,
    value: string | File | null
  ) => {
    setFormFields((prev) => ({ ...prev, [key]: value }));
  };

  const {
    subCategory,
    fetchSubCategories,
    currentPage,
    setCurrentPage,
    handleDeleteClick,
    addSubCategory,
    showDeleteModal,
    subcategoriaToDelete,
    confirmDelete,
    cancelDelete,
  } = useSubCategory();
  useEffect(() => {
    fetchSubCategories(categoria?.id || 0);
  }, []);

  return (
    <Card className="bg-white w-full p-6">
      <GlobalBackButton onClick={onBack} />
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <Typography variant="h2_bold">Detalhes da Categoria</Typography>
          <GlobalButton variant="primary" className="w-[30%]" onClick={() => onSave(formFields)}>
            Salvar
          </GlobalButton>
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-gray-500">Imagem</label>
          <UploadImagemPreview
            foto={formFields.foto}
            index={0}
            initialImage={categoria?.foto}
            className="w-[200px] h-[200px]"
            onChange={(_, file) => {
              handleFormChange("foto", file);
            }}
          />
          <label className="text-gray-500">Name</label>
          <GlobalInput
            placeholder="Nome da categoria"
            value={formFields.nome}
            onChange={(e) => handleFormChange("nome", e.target.value)}
          />
          <label className="text-gray-500">Descrição</label>
          <GlobalInput
            placeholder="Descrição"
            value={formFields.descricao}
            onChange={(e) => handleFormChange("descricao", e.target.value)}
          />
          <div className="flex flex-col gap-4 mt-4">
            <SubCategoryTable
              categoriaId={categoria?.id || 0}
              subCategorias={subCategory}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              onAdd={addSubCategory}
              onDelete={handleDeleteClick}
            />
          </div>
        </div>
      </div>
      <GlobalConfirmModal
        show={showDeleteModal}
        title="Confirmar Exclusão"
        message={`Você tem certeza que deseja excluir a subcategoria "${subcategoriaToDelete?.nome}"?`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </Card>
  );
};
