
import { CategoryData } from "../interfaces/CategoryInterface";
import ResponseInterface from "../interfaces/response_interface";
import BaseRepository from "./base_repository";

const CategoryRepository = () => {
    const { get, delete: del, post } = BaseRepository();
    return {
      getAllCategories: async (token: string): Promise<CategoryData[]> => {
        const response = (await get(
          "/api/Categoria/getAll",
          undefined,
          token
        )) as { data: CategoryData[] };
        return response.data;
      },

      deleteCategory: async (
        token: string,
        id: number
      ): Promise<ResponseInterface> => {
        const response = (await del(
          `/api/Categoria/Delete/${id}`,
          token
        )) as ResponseInterface;
        return response;
      },
      createCategory: async (
        token: string,
        data: FormData
      ): Promise<ResponseInterface> => {
        const response = (await post(
          "/api/Categoria/create",
          data,
          token
        )) as ResponseInterface;
        return response;
      },
      updateCategory: async (
        token: string,
        id: number,
        data: FormData
      ): Promise<ResponseInterface> => {
        const response = (await post(
          `/api/Categoria/update/${id}`,
          data,
          token
        )) as ResponseInterface;
        return response;
      },
    };
}

export default CategoryRepository;
