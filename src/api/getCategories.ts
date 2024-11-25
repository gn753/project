import axiosInstance from "@/api/axiosInstance";
import { CategoriesResponse } from "@/types/categories";

const getCategories = async (): Promise<CategoriesResponse> => {
  const response = await axiosInstance.get("/boards/categories");
  return response.data;
};

export default getCategories;
