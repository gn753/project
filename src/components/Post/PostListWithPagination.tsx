import { Box, Heading, Button, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Post, PostListResponse } from "@/types/post";
import getPosts from "@/api/getPosts";
import PostList from "@/components/Post/PostList";
import Menubar from "@/components/Post/Menubar";
import HeaderWithButtons from "./HeaderWithButtons";

const PostListWithPagination: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]); // 현재 페이지의 포스트 상태
  const [page, setPage] = useState(0); // 현재 페이지 번호
  const [totalPages, setTotalPages] = useState<number>(0); // 전체 페이지 수
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // 선택된 카테고리
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리

  // 데이터 로드 함수
  useEffect(() => {
    const onLoadPosts = async () => {
      setIsLoading(true); // 로딩 상태 설정
      try {
        const data: PostListResponse = await getPosts(page); // getPosts 호출
        setPosts(data.content); // 현재 페이지 데이터로 상태 갱신
        setTotalPages(data.totalPages); // 전체 페이지 수 갱신
      } catch (error) {
        console.error("Error loading posts:", error);
      } finally {
        setIsLoading(false); // 로딩 상태 해제
      }
    };

    onLoadPosts();
  }, [page]);

  // 카테고리 필터 적용된 포스트 목록
  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.category === selectedCategory)
    : posts;

  // 페이지 변경 함수
  const changePage = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage); // 새로운 페이지 번호 설정
    }
  };

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
      <PostList posts={filteredPosts} isLoading={isLoading} />

      {/* 페이지네이션 UI */}
      <HStack justify="center" mt="4" spacing="2">
        <Button
          onClick={() => changePage(page - 1)}
          isDisabled={page <= 0}
          colorScheme="blue"
        >
          이전
        </Button>
        {[...Array(totalPages)].map((_, idx) => (
          <Button
            key={idx}
            onClick={() => changePage(idx)}
            colorScheme={page === idx ? "blue" : "gray"}
          >
            {idx + 1}
          </Button>
        ))}
        <Button
          onClick={() => changePage(page + 1)}
          isDisabled={page >= totalPages - 1}
          colorScheme="blue"
        >
          다음
        </Button>
      </HStack>
    </Box>
  );
};

export default PostListWithPagination;
