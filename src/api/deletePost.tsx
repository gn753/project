import axiosInstance from "@/api/axiosInstance";

const deletePost = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/boards/${id}`);
};

export default deletePost
