import { useState } from "react";
import { CategoryData } from "../interfaces/CategoryInterface";
import { useCategories } from "../hooks/CategoryHook";
import { CategoryDetails } from "../components/Category/CategoryDetails";
import { CategoryForm } from "../components/Category/CategoryForm";
import GlobalConfirmModal from "../components/Global/gloal_modals";
import CategoryService from "../service/CategoryService";
import { useSnackbarStore } from "../stores/snackbar_store";
import { CategoryTable } from "../components/Category/CategoryTable";

interface CategoryFormFields {
  nome: string;
  descricao: string;
  foto: File | null;
}

const CategoriasPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategoria, setSelectedCategoria] =
    useState<CategoryData | null>(null);

  const {
    categorias,
    filteredCategorias,
    searchTerm,
    currentPage,
    categoriaToDelete,
    showDeleteModal,
    handleSearch,
    handleDeleteClick,
    confirmDelete,
    cancelDelete,
    setCurrentPage,
    fetchCategorias,
  } = useCategories();

  const { showSnackbar } = useSnackbarStore();
  const { createCategory } = CategoryService();

  const handleAddCategoria = async (formFields: CategoryFormFields) => {
    const { nome, descricao, foto } = formFields;
    if (!nome || !descricao || !foto) {
      showSnackbar("Todos os campos são obrigatórios", "warning");
      return;
    }

    const formData = new FormData();
    formData.append("Nome", nome);
    formData.append("Descricao", descricao);
    formData.append("Foto", foto);

    try {
      await createCategory(formData);
      await fetchCategorias();
      setShowForm(false);
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
      showSnackbar("Erro ao criar categoria. Tente novamente.", "error");
    }
  };

  const handleUpdateCategoria = async (formFields: CategoryFormFields) => {
    if (!selectedCategoria) return;

    const { nome, descricao, foto } = formFields;
    if (!nome || !descricao) {
      showSnackbar("Nome e descrição são obrigatórios", "warning");
      return;
    }

    const formData = new FormData();
    formData.append("Nome", nome);
    formData.append("Descricao", descricao);
    if (foto) formData.append("Foto", foto);

    try {
      await fetchCategorias();
      setIsEditing(false);
      setShowDetails(false);
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error);
      showSnackbar("Erro ao atualizar categoria. Tente novamente.", "error");
    }
  };

  const openDetails = (categoria: CategoryData) => {
    setSelectedCategoria(categoria);
    setShowDetails(true);
  };

  return (
    <div className="flex flex-col bg-white min-h-screen gap-5">
      {!showForm && !showDetails ? (
        <CategoryTable
          categorias={categorias}
          filteredCategorias={filteredCategorias}
          searchTerm={searchTerm}
          currentPage={currentPage}
          onSearch={handleSearch}
          onPageChange={setCurrentPage}
          onAdd={() => setShowForm(true)}
          onViewDetails={openDetails}
          onDelete={handleDeleteClick}
        />
      ) : showForm ? (
        <CategoryForm
          onSubmit={handleAddCategoria}
          onCancel={() => setShowForm(false)}
          title="Nova Categoria"
          subtitle="Adicione uma nova categoria e subcategorias associadas"
        />
      ) : (
        <CategoryDetails
          categoria={selectedCategoria}
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          onCancelEdit={() => setIsEditing(false)}
          onSave={handleUpdateCategoria}
          onBack={() => setShowDetails(false)}
        />
      )}

      <GlobalConfirmModal
        show={showDeleteModal}
        title="Confirmar Exclusão"
        message={`Tem certeza que deseja excluir a categoria "${categoriaToDelete?.nome}"?`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default CategoriasPage;
