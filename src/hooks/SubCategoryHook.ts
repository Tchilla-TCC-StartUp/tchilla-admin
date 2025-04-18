import { useState } from "react";
import {
  SubCategoryData,
  SubCategoryFormData,
} from "../interfaces/SubCategoryInterface";
import { useSnackbarStore } from "../stores/snackbar_store";
import { useErrorHandlerHook } from "./ErrorHandlerHook";
import SubCategoryService from "../service/SubCategoryService";

const useSubCategory = () => {
  const [subCategory, setSubCategory] = useState<SubCategoryData[]>([]);
  const [filteredSubCategory, setFilteredSubCategory] = useState<
    SubCategoryData[]
  >([]);
  const { showSnackbar } = useSnackbarStore();
  const { isError, screenType } = useErrorHandlerHook();
  const showErrorScreen = isError && screenType === "fullScreen";
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { getSubCategories, createSubCategory, deleteSubCategory } =
    SubCategoryService();

  const [currentPage, setCurrentPage] = useState(1);
  const [subcategoriaToDelete, setSubCategoriaToDelete] =
    useState<SubCategoryData | null>(null);

  const fetchSubCategories = async (categoryId: number) => {
    const data = await getSubCategories(categoryId);
    setSubCategory(data);
    setFilteredSubCategory(data);
  };
  const handleDeleteClick = (categoria: SubCategoryData) => {
    setSubCategoriaToDelete(categoria);
    setShowDeleteModal(true);
  };
  const addSubCategory = async (data: SubCategoryFormData) => {
    await createSubCategory(data);
    await fetchSubCategories(data.categoriaId);
  };

  const confirmDelete = async () => {
    if (!subcategoriaToDelete) return;
    cancelDelete();
    await deleteSubCategory(subcategoriaToDelete.id);
    await fetchSubCategories(subcategoriaToDelete.categoriaId);
  };

  const cancelDelete = () => {
    setSubCategoriaToDelete(null);
    setShowDeleteModal(false);
  };

  return {
    subCategory,
    handleDeleteClick,
    filteredSubCategory,
    setFilteredSubCategory,
    fetchSubCategories,
    showSnackbar,
    isError,
    screenType,
    showErrorScreen,
    currentPage,
    setCurrentPage,
    addSubCategory,
    cancelDelete,
    subcategoriaToDelete,
    showDeleteModal,
    confirmDelete,
  };
};

export default useSubCategory;
