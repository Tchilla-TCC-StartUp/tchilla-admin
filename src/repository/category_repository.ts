import { CategoryData, CategoryModel, deleteCategoryResponse } from "../model/category_model";
import BaseRepository from "./base_repository";

const CategoryRepository = () => {
    const { get, delete: del, post } = BaseRepository();
    return {
        getAllCategories: async (token: string): Promise<CategoryModel[]> => {
            const response = await get("/api/Categoria/getAll", undefined, token) as { data: CategoryModel[] };
            return response.data;
        }

        , deleteCategory: async (token: string, id: number): Promise<deleteCategoryResponse> => {
            const response = await del(`/api/Categoria/Delete/${id}`, token) as deleteCategoryResponse;
            return response;
        }

        , createCategory: async (token: string, data: FormData): Promise<deleteCategoryResponse> => {
            const response = await post("/api/Categoria/create", data, token) as deleteCategoryResponse;
            return response;
        }
        , updateCategory: async (token: string, id: number, data: CategoryData): Promise<deleteCategoryResponse> => {
            const response = await post(`/api/Categoria/update/${id}`, data, token) as deleteCategoryResponse;
            return response;
        }

    }
}

export default CategoryRepository;
