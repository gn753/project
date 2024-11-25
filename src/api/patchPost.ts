import axiosInstance from "@/api/axiosInstance";
import { PatchPostRequest } from "@/types/post";

const patchPost = async (data: PatchPostRequest): Promise<void> => {
  const formData = new FormData();

  // JSON 문자열 추가
  const jsonString = JSON.stringify({
    title: data.title,
    category: data.category,
    content: data.content,
  });
  const blob = new Blob([jsonString], { type: "application/json" });

  formData.append("request", blob);

  // 파일 추가 (선택적)
  if (data.file) {
    formData.append("file", data.file);
  }

  console.log("FormData:", formData);

  // API 호출
  await axiosInstance.patch(`/boards/${data.id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export default patchPost;
