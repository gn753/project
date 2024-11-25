import { Box, Heading } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Post, PostListResponse } from "@/types/post";
import getPosts from "@/api/getPosts";
import PostList from "@/components/Post/PostList";
import LoadMoreObserver from "@/components/Post/LoadMoreObserver";
import Menubar from "@/components/Post/Menubar";
import getCategories from "@/api/getCategories";
import HeaderWithButtons from "./HeaderWithButtons";

const PostListInfinityScroll: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]); // 전체 포스트 상태
  const [page, setPage] = useState(0); // 현재 페이지 번호
  const [hasMore, setHasMore] = useState(true); // 더 로드할 데이터가 있는지 여부
  const [totalPages, setTotalPages] = useState<number | null>(null); // 전체
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // 선택된 카테고리
  const isLoadingRef = useRef(false); // 로딩 상태 관리
  const bottomRef = useRef<HTMLDivElement | null>(null); // 하단 감지용 ref

  // 데이터 로드 함수
  useEffect(() => {
    const onLoadPosts = async (page: number) => {
      if (isLoadingRef.current || (totalPages !== null && page >= totalPages)) {
        return; // 이미 로딩 중이거나 마지막 페이지를 초과하면 호출 중단
      }
      isLoadingRef.current = true; // 로딩 상태 설정

      try {
        const data: PostListResponse = await getPosts(page); // getPosts 호출
        setPosts((prev) => [...prev, ...data.content]); // 기존 데이터에 새 데이터 추가
        setHasMore(!data.last); // 마지막 페이지 여부 갱신
        setTotalPages(data.totalPages); // 전체 페이지 수 갱신
      } catch (error) {
        console.error("Error loading posts:", error);
      } finally {
        isLoadingRef.current = false; // 로딩 상태 해제
      }
    };

    onLoadPosts(page);
  }, [page]);

  // 페이지 증가 로직
  const loadNextPage = () => setPage((prevPage) => prevPage + 1);
  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.category === selectedCategory)
    : posts;

  return (
    <Box maxW="600px" mx="auto" mt="6" p="4">
      <HeaderWithButtons />
      <Menubar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <Heading as="h1" size="lg" mb="6" textAlign="center">
        글 목록
      </Heading>
      <PostList
        posts={filteredPosts}
        isLoading={isLoadingRef.current}
        hasMore={hasMore}
      />

      <LoadMoreObserver
        hasMore={hasMore}
        isLoading={isLoadingRef.current}
        onIntersect={loadNextPage}
        bottomRef={bottomRef}
      />
    </Box>
  );
};

export default PostListInfinityScroll;
