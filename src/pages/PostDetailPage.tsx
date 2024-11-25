import { Box, IconButton } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import PostDetailContainer from "@/components/Post/PostDetailContainer";

const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <Box maxW="600px" mx="auto" mt="6" p="4">
      {/* 뒤로가기 버튼 */}
      <IconButton
        icon={<ArrowBackIcon />}
        aria-label="뒤로가기"
        onClick={() => navigate(-1)}
        variant="ghost"
        colorScheme="blue"
        mb="4"
        fontSize="2xl"
      />
      {/* 게시글 상세 정보 */}
      {id && <PostDetailContainer id={id} />}
    </Box>
  );
};

export default PostDetailPage;
