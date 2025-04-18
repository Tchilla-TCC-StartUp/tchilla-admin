import ResponseInterface from "../interfaces/ResponseInterface";
import {
  SubCategoryData,
  SubCategoryFormData,
} from "../interfaces/SubCategoryInterface";
import BaseRepository from "./BaseRepository";

const SubCategoryRepository = () => {
  const { get, post, delete: deletar } = BaseRepository();
  return {
    getSubCategories: async (
      token: string,
      categoryId: number
    ): Promise<SubCategoryData[]> => {
      const response = (await get(
        `/api/SubCategoria/getAll/${categoryId}`,
        undefined,
        token
      )) as { data: SubCategoryData[] };
      return response.data;
    },
    deleteSubCategory: async (
      token: string,
      id: number
    ): Promise<ResponseInterface> => {
      const response = (await deletar(
        `/api/SubCategoria/Delete?id=${id}`,
        token
      )) as ResponseInterface;
      return response;
    },
    createSubCategory: async (
      token: string,
      data: SubCategoryFormData
    ): Promise<ResponseInterface> => {
      const response = (await post(
        "/api/SubCategoria/create",
        data,
        token
      )) as ResponseInterface;
      return response;
    },
  };
};

export default SubCategoryRepository;
