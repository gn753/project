// 기본 사용자 정보 타입
export interface BaseUser {
  username: string; // 이메일
  password: string;
}

// 회원가입 요청 타입
export interface SignupRequest extends BaseUser {
  name: string; // 회원 이름
  confirmPassword: string; // 비밀번호 확인
}

// (회원가입 시 반환되는 데이터)
export interface LoginResponse {
  accessToken: string;
  refreshTokens: string;
}
