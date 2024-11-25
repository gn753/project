import { Box, Button, Center, HStack, Spinner, Text } from "@chakra-ui/react";
import PostDetails from "@/components/Post/PostDetails";
import { useEffect, useState } from "react";
import getPostById from "@/api/getPostById";
import { PostDetailResponse } from "@/types/post";
import { useNavigate } from "react-router-dom";
import deletePost from "@/api/deletePost";

interface PostDetailContainerProps {
  id: string; // 게시글 ID
}

const PostDetailContainer: React.FC<PostDetailContainerProps> = ({ id }) => {
  const [post, setPost] = useState<PostDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const onPostDetails = async () => {
      try {
        const data = await getPostById(Number(id));
        setPost(data);
      } catch (err) {
        console.error("Error loading post details:", err);
        setError("게시글을 불러올 수 없습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    onPostDetails();
  }, [id]);

  if (isLoading) {
    return (
      <Center mt="4">
        <Spinner />
      </Center>
    );
  }

  if (error || !post) {
    return (
      <Box maxW="600px" mx="auto" mt="6" p="4">
        <Text textAlign="center" color="red.500">
          {error || "게시글을 불러올 수 없습니다."}
        </Text>
      </Box>
    );
  }

  const onEdit = () => {
    if (post) {
      navigate(`/posts/edit/${id}`, { state: post }); // 데이터 전달
    }
  };

  const onDeleteSuccess = async () => {
    try {
      await deletePost(Number(id));
      navigate("/");
    } catch {
      alert("실패했습니다.");
    }
  };

  return (
    <Box>
      <PostDetails
        title={post.title}
        content={post.content}
        boardCategory={post.boardCategory}
        imageUrl={post.imageUrl}
        createdAt={post.createdAt}
      />
      {/* 수정 및 삭제 버튼 */}
      <HStack spacing={4} mt="4" justifyContent="flex-end">
        <Button colorScheme="blue" onClick={onEdit}>
          수정
        </Button>
        <Button colorScheme="red" onClick={onDeleteSuccess}>
          삭제
        </Button>
      </HStack>
    </Box>
  );
};

export default PostDetailContainer;
