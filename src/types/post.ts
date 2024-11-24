export interface Post {
  id: number;
  title: string;
  category: string;
  createdAt: string;
}

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
