import PostEditContainer from "@/components/Post/PostEditContainer";
import FormPageLayout from "@/layouts/FormPageLayout";
import { Spinner, Center } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const PostEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <Center mt="4">
        <Spinner />
      </Center>
    );
  }

  return (
    <FormPageLayout title="글 수정">
      <PostEditContainer id={id} />
    </FormPageLayout>
  );
};

export default PostEditPage;
