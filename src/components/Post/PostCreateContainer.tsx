import { useNavigate } from "react-router-dom";
import postCreatePost from "@/api/postCreatePost";
import PostCreateForm from "./PostCreateForm";

const PostCreateContainer: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: {
    title: string;
    category: string;
    content: string;
    file?: File | null;
  }) => {
    try {
      await postCreatePost(data);
      alert("글 작성이 성공적으로 완료되었습니다!");
      navigate("/"); // 글 작성 후 메인 페이지로 이동
    } catch (error) {
      console.error("Error creating post:", error);
      alert("글 작성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return <PostCreateForm onSubmit={handleSubmit} />;
};

export default PostCreateContainer;
