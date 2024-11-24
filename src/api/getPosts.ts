import axiosInstance from "@/api/axiosInstance";
import { PostListResponse } from "./../types/post";

const getPosts = async (
  page: number,
  size: number = 10
): Promise<PostListResponse> => {
  try {
    const response = await axiosInstance.get<PostListResponse>(
      `/boards?page=${page}&size=${size}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("게시글을 불러오는 중 오류가 발생했습니다.");
  }
};

export default getPosts;
