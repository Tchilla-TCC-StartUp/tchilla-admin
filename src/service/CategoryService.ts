import { useBaseRequestHook } from "../hooks/BaseRequestHook";
import { CategoryData } from "../interfaces/CategoryInterface";
import ResponseInterface from "../interfaces/ResponseInterface";
import CategoryRepository from "../repository/CategoryRepository";
import { useSnackbarStore } from "../stores/snackbar_store";

const CategoryService = () => {
  const {
    getAllCategories: repositoryGetAllCategories,
    deleteCategory: repositoryDeleteCategory,
    createCategory: repositoryCreateCategory,
    updateCategory: repositoryUpdateCategory,
  } = CategoryRepository();
  const { onRequest } = useBaseRequestHook();
  const { showSnackbar } = useSnackbarStore();
  return {
    fetchAllCategories: async (): Promise<CategoryData[]> => {
      return onRequest(
        (token?: string) => repositoryGetAllCategories(token!),
        undefined,
        (response) => showSnackbar(response.message ?? "", "error"),
        true,
        true
      );
    },
    deleteCategory: async (id: number): Promise<ResponseInterface> => {
      return onRequest(
        (token?: string) => repositoryDeleteCategory(token!, id),
        (response) => showSnackbar(response.message ?? "", "success"),
        (response) => showSnackbar(response.message ?? "", "error"),
        true,
        true
      );
    },
    createCategory: async (data: FormData): Promise<ResponseInterface> => {
      return onRequest(
        (token?: string) => repositoryCreateCategory(token!, data),
        (response) => showSnackbar(response.message ?? "", "success"),
        (response) => showSnackbar(response.message ?? "", "error"),
        true,
        true
      );
    },

    updateCategory: async (
      id: number,
      data: FormData
    ): Promise<ResponseInterface> => {
      return onRequest(
        (token?: string) => repositoryUpdateCategory(token!, id, data),
        (response) => showSnackbar(response.message ?? "", "success"),
        (response) => showSnackbar(response.message ?? "", "error"),
        true,
        true
      );
    },
  };
};

export default CategoryService;
