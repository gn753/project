// 공통 필드 타입 정의
export interface BasePost {
  title: string;
  category: string;
  createdAt?: string; // 수정 요청에는 필요 없으므로 선택적(optional)
}

// 리스트에서 사용하는 기본 타입
export interface Post extends BasePost {
  id: number; // 리스트 아이템에 필요한 ID
}

// 상세 조회에서 사용하는 타입
export interface PostDetailResponse extends Omit<BasePost, "category"> {
  id?: number;
  content: string;
  boardCategory: string;
  imageUrl?: string | null; // 이미지 URL 추가
}

// 수정 요청 타입
export interface PatchPostRequest extends BasePost {
  id: number;
  content: string;
}

// 생성 요청 타입
export interface CreatePostRequest extends Omit<BasePost, "createdAt"> {
  content: string; // 생성 시 상세 내용 포함
  file?: File | null; // 선택적 파일 첨부
}

// 게시글 목록 응답 타입
export interface PostListResponse {
  content: Post[];
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  number: number;
}
