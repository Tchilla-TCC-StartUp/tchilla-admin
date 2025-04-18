import { useBaseRequestHook } from "../hooks/BaseRequestHook";
import {
  SubCategoryData,
  SubCategoryFormData,
} from "../interfaces/SubCategoryInterface";
import SubCategoryRepository from "../repository/SubCategoryRepository";
import { useSnackbarStore } from "../stores/snackbar_store";

const SubCategoryService = () => {
  const {
    getSubCategories: repositoryGetSubCategories,
    createSubCategory: repositoryCreateSubCategory,
    deleteSubCategory: repositoryDeleteSubCategory,
  } = SubCategoryRepository();
  const { onRequest } = useBaseRequestHook();
  const { showSnackbar } = useSnackbarStore();
  return {
    getSubCategories: async (
      categoryId: number
    ): Promise<SubCategoryData[]> => {
      return onRequest(
        (token?: string) => repositoryGetSubCategories(token!, categoryId),
        undefined,
        undefined,
        true,
        true
      );
    },
    deleteSubCategory: async (id: number) => {
      return onRequest(
        (token?: string) => repositoryDeleteSubCategory(token!, id),
        (response) => showSnackbar(response.message, "success"),
        undefined,
        true,
        true
      );
    },
    createSubCategory: async (data: SubCategoryFormData) => {
      return onRequest(
        (token?: string) => repositoryCreateSubCategory(token!, data),
        (response) => showSnackbar(response.message, "success"),
        undefined,
        true,
        true
      );
    },
  };
};

export default SubCategoryService;
