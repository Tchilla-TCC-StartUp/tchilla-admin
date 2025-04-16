import { useBaseRequestHook } from "../hooks/base_request_hook";
import { CategoryModel, deleteCategoryResponse } from "../model/category_model";
import CategoryRepository from "../repository/category_repository";
import { useSnackbarStore } from "../stores/snackbar_store";

const CategoryService = () => {
    const { getAllCategories, deleteCategory } = CategoryRepository();
    const { onRequest } = useBaseRequestHook();
    const { showSnackbar } = useSnackbarStore();
    return {
        fetchAllCategories: async (): Promise<CategoryModel[]> => {
            return onRequest(
                (token?: string) => getAllCategories(token!),
                undefined,
                undefined,
                true,
                true
            );
        },
        deleteCategory: async (id: number): Promise<deleteCategoryResponse> => {
            return onRequest(
                (token?: string) => deleteCategory(token!, id),
                (response) => showSnackbar(response.message ?? "", "success"),
                undefined,
                true,
                true
            );
        }
    }
}

export default CategoryService;
