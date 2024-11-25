import { List } from "@chakra-ui/react";
import PostListItem from "@/components/Post/PostIListtem";
import { Post } from "@/types/post";

interface PostListProps {
  posts: Post[];
  isLoading: boolean;
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <>
      <List spacing={4}>
        {posts.map((post) => (
          <PostListItem key={post.id} post={post} />
        ))}
      </List>
    </>
  );
};

export default PostList;
