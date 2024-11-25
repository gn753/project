import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import getPostById from "@/api/getPostById";
import patchPost from "@/api/patchPost"; // 분리된 API 로직
import PostEditForm from "@/components/Post/PostEditForm";
import { PatchPostRequest, PostDetailResponse } from "@/types/post";
import { useToast } from "@chakra-ui/react";

interface PostEditContainerProps {
  id: string; // 게시글 ID
}

const PostEditContainer: React.FC<PostEditContainerProps> = ({ id }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [post, setPost] = useState<PostDetailResponse | null>(
    location.state || null
  ); // 전달받은 state를 초기값으로 사용
  const [isLoading, setIsLoading] = useState(!post); // state가 없으면 로딩 필요
  const [isSaving, setIsSaving] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (!post) {
      const fetchPostDetails = async () => {
        try {
          const data = await getPostById(Number(id));
          setPost(data);
        } catch (err) {
          console.error("Error loading post details:", err);
          toast({
            title: "오류",
            description: "게시글을 불러올 수 없습니다.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          // navigate(-1); // 에러 시 이전 페이지로 이동
        } finally {
          setIsLoading(false);
        }
      };

      fetchPostDetails();
    }
  }, [id, post, navigate, toast]);

  const onSave = async ({ title, category, content, id }: PatchPostRequest) => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    setIsSaving(true);

    try {
      await patchPost({
        id: Number(id),
        title,
        content,
        category,
      }); // patchPost API 호출
      alert("게시글이 수정되었습니다.");
      navigate(`/posts/${id}`); // 저장 후 상세 페이지로 이동
    } catch (err) {
      console.error("Error updating post:", err);
      alert("게시글 수정에 실패했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  const onCancel = () => {
    navigate(-1); // 취소 시 이전 페이지로 이동
  };

  return (
    <>
      {post && (
        <PostEditForm
          post={post}
          isSaving={isSaving}
          onSave={onSave}
          onCancel={onCancel}
        />
      )}
    </>
  );
};

export default PostEditContainer;
