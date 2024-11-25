import PostCreateContainer from "@/components/Post/PostCreateContainer";
import FormPageLayout from "@/layouts/FormPageLayout";

const PostCreatePage = () => {
  return (
    <FormPageLayout title="글 작성">
      <PostCreateContainer />
    </FormPageLayout>
  );
};

export default PostCreatePage;
