import axios from "axios";

const postRefreshToken = async (): Promise<{
  accessToken: string;
  refreshToken: string;
}> => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    throw new Error("리프레시 토큰이 없습니다.");
  }

  // API 호출
  const response = await axios.post<{
    accessToken: string;
    refreshToken: string;
  }>(
    "/api/auth/refresh",
    { refreshToken }, // body에 정확히 JSON 형식으로 전달
    {
      headers: {
        "Content-Type": "application/json", // Content-Type 명시
      },
      withCredentials: true,
    }
  );

  return response.data; // 새 토큰 반환
};
export default postRefreshToken;
