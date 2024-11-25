import { CreatePostRequest } from "@/types/post";
import axiosInstance from "./axiosInstance";

const postCreatePost = async (data: CreatePostRequest): Promise<void> => {
  const formData = new FormData();

  const jsonString = JSON.stringify({
    title: data.title,
    category: data.category,
    content: data.content,
  });
  const blob = new Blob([jsonString], { type: "application/json" });
  formData.append("request", blob);

  if (data.file) {
    formData.append("file", data.file);
  }

  await axiosInstance.post("/boards", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export default postCreatePost;
