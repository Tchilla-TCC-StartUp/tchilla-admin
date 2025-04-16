import { CategoryModel, deleteCategoryResponse } from "../model/category_model";
import BaseRepository from "./base_repository";

const CategoryRepository = () => {
    const { get, delete: del } = BaseRepository();
    return {
        getAllCategories: async (token: string): Promise<CategoryModel[]> => {
            const response = await get("/api/Categoria/getAll", undefined, token) as { data: CategoryModel[] };
            return response.data;
        }

        , deleteCategory: async (token: string, id: number): Promise<deleteCategoryResponse> => {
            const response = await del(`/api/Categoria/deletar/${id}`, token) as deleteCategoryResponse;
            return response;
        }
    }
}

export default CategoryRepository;
