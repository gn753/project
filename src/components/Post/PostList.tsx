import { List, Center, Spinner, Text } from "@chakra-ui/react";
import PostListItem from "@/components/Post/PostIListtem";
import { Post } from "@/types/post";
import { useNavigate } from "react-router-dom";

interface PostListProps {
  posts: Post[];
  isLoading: boolean;
  hasMore: boolean;
}

const PostList: React.FC<PostListProps> = ({ posts, isLoading, hasMore }) => {

  return (
    <>
      <List spacing={4}>
        {posts.map((post) => (
          <PostListItem key={post.id} post={post}  />
        ))}
      </List>
      {isLoading && hasMore && (
        <Center mt="4">
          <Spinner />
        </Center>
      )}
      {!hasMore && !isLoading && (
        <Text mt="4" textAlign="center" color="gray.500">
          더 이상 불러올 게시물이 없습니다.
        </Text>
      )}
    </>
  );
};

export default PostList;
