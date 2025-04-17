import { useState } from "react";
import {
  CategoryData,
  CategoryFormFields,
} from "../interfaces/CategoryInterface";
import { useCategories } from "../hooks/CategoryHook";
import { CategoryDetails } from "../components/Category/CategoryDetails";
import { CategoryForm } from "../components/Category/CategoryForm";
import GlobalConfirmModal from "../components/Global/GloalModals"; // Note: Fix typo in 'gloal_modals' if applicable
import { CategoryTable } from "../components/Category/CategoryTable";
import ErrorScreen from "./ErrorPage";

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
    handleAddCategoria,
    handleEditCategory,
    showErrorScreen,
  } = useCategories();

  const addCategoria = async (formFields: CategoryFormFields) => {
    await handleAddCategoria(formFields);
    setShowForm(false);
  };

  const updateCategoria = async (formFields: CategoryFormFields) => {
    if (!selectedCategoria) return;
    try {
      await handleEditCategory(selectedCategoria.id, formFields);
      setIsEditing(false);
      setShowDetails(false);
    } catch (error) {
      console.error("Error updating category:", error);
      // Optionally, show user-facing error (e.g., toast notification)
    }
  };

  const openDetails = (categoria: CategoryData) => {
    setSelectedCategoria(categoria);
    setShowDetails(true);
  };

  const renderBody = () => {
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
            onSubmit={addCategoria}
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
            onSave={updateCategoria}
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

  return showErrorScreen ? <ErrorScreen /> : renderBody();
};

export default CategoriasPage;
