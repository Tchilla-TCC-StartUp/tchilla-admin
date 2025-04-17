import { useState, useEffect } from "react";
import {
  CategoryData,
  CategoryFormFields,
} from "../interfaces/CategoryInterface";
import CategoryService from "../service/CategoryService";
import { useSnackbarStore } from "../stores/snackbar_store";
import { useErrorHandlerHook } from "./ErrorHandlerHook";

export const useCategories = () => {
  const [categorias, setCategorias] = useState<CategoryData[]>([]);
  const [filteredCategorias, setFilteredCategorias] = useState<CategoryData[]>(
    []
  );

  const { showSnackbar } = useSnackbarStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriaToDelete, setCategoriaToDelete] =
    useState<CategoryData | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

   const { isError, screenType } = useErrorHandlerHook();
   const showErrorScreen = isError && screenType === "fullScreen";

  const { fetchAllCategories, deleteCategory, updateCategory, createCategory } =
    CategoryService();

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    const data = await fetchAllCategories();
    setCategorias(data);
    setFilteredCategorias(data);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = categorias.filter((cat) =>
      cat.nome.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredCategorias(filtered);
  };

  const handleDeleteClick = (categoria: CategoryData) => {
    setCategoriaToDelete(categoria);
    setShowDeleteModal(true);
  };
  const handleEditCategory = async (id: number, data: CategoryFormFields) => {
    const { nome, descricao, foto } = data;
    if (!nome || !descricao || !foto) {
      showSnackbar("Todos os campos são obrigatórios", "warning");
      return;
    }
    const formData = new FormData();
    formData.append("Nome", nome);
    formData.append("Descricao", descricao);
    formData.append("Foto", foto);
    await updateCategory(id, formData);
  };

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
    await createCategory(formData);
    await fetchCategorias();
  };

  const confirmDelete = async () => {
    if (!categoriaToDelete) return;
    await deleteCategory(categoriaToDelete.id);
    const updatedList = categorias.filter(
      (cat) => cat.id !== categoriaToDelete.id
    );
    setCategorias(updatedList);
    setFilteredCategorias(updatedList);
    cancelDelete();
  };

  const cancelDelete = () => {
    setCategoriaToDelete(null);
    setShowDeleteModal(false);
  };

  return {
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
    handleAddCategoria,
    handleEditCategory,
    showErrorScreen,
  };
};
