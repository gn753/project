import getRefreshToken from "@/api/getRefreshToken";
import axios from "axios";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: "/api", // API 기본 URL
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error) // 요청 실패 시 에러 전달
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response, // 성공한 응답 그대로 반환
  async (error) => {
    const { config, response } = error;

    // 401이 아니거나 이미 재요청된 경우 에러 반환
    if (
      response?.status !== 401 ||
      config.sent ||
      config.url === "/api/auth/refresh"
    ) {
      return Promise.reject(error);
    }

    // 토큰 갱신 처리
    config.sent = true; // 재요청 방지 플래그

    try {
      const token = await getRefreshToken(); // 새로운 토큰 요청
      if (token) {
        localStorage.setItem("accessToken", token.accessToken); // 새 토큰 저장
        localStorage.setItem("refreshToken", token.refreshToken); // 새 토큰 저장
        config.headers.Authorization = `Bearer ${token.accessToken}`; // 헤더에 새 토큰 추가
        return axiosInstance(config); // 원래 요청 재시도
      }
    } catch (refreshError) {
      // 갱신 실패 시 사용자 로그아웃
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login"; // 로그인 페이지로 리디렉트
    }

    return Promise.reject(error); // 갱신 실패 시 에러 반환
  }
);

export default axiosInstance;
