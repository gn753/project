import axios from "axios";

const handleError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message || "서버와 통신 중 오류가 발생했습니다."
    );
  } else if (error instanceof Error) {
    return error.message;
  } else {
    return "알 수 없는 오류가 발생했습니다.";
  }
};

export default handleError;
