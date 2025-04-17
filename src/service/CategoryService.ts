import { useBaseRequestHook } from "../hooks/BaseRequestHook";
import { CategoryData } from "../interfaces/CategoryInterface";
import ResponseInterface from "../interfaces/response_interface";
import CategoryRepository from "../repository/CategoryRepository";
import { useSnackbarStore } from "../stores/snackbar_store";

const CategoryService = () => {
    const { getAllCategories, deleteCategory, createCategory } = CategoryRepository();
    const { onRequest } = useBaseRequestHook();
    const { showSnackbar } = useSnackbarStore();
    return {
        fetchAllCategories: async (): Promise<CategoryData[]> => {
            return onRequest(
                (token?: string) => getAllCategories(token!),
                undefined,
                undefined,
                true,
                true
            );
        },
        deleteCategory: async (id: number): Promise<ResponseInterface> => {
            return onRequest(
                (token?: string) => deleteCategory(token!, id),
                (response) => showSnackbar(response.message ?? "", "success"),
                undefined,
                true,
                true
            );
        },
        createCategory: async (data: FormData): Promise<ResponseInterface> => {
            return onRequest(
                (token?: string) => createCategory(token!, data),
                (response) => showSnackbar(response.message ?? "", "success"),
                undefined,
                true,
                true
            );
        },
    }
}

export default CategoryService;
