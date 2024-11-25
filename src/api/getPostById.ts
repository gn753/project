import axiosInstance from "@/api/axiosInstance";
import { PostDetailResponse } from "@/types/post";

const getPostById = async (id: number): Promise<PostDetailResponse> => {
  const response = await axiosInstance.get<PostDetailResponse>(`/boards/${id}`);
  return response.data;
};

export default getPostById;
