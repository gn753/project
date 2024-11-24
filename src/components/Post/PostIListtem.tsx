import { VStack, Text, ListItem } from "@chakra-ui/react";
import { Post } from "@/types/post";

interface PostListItemProps {
  post: Post;
}

const PostListItem: React.FC<PostListItemProps> = ({ post }) => {
  return (
    <ListItem borderWidth="1px" borderRadius="md" p="4" shadow="sm">
      <VStack align="start" spacing={2}>
        <Text fontSize="lg" fontWeight="bold">
          {post.title}
        </Text>
        <Text fontSize="sm" color="gray.500">
          {post.category}
        </Text>
        <Text fontSize="sm" color="gray.400">
          {new Date(post.createdAt).toLocaleDateString()}
        </Text>
      </VStack>
    </ListItem>
  );
};

export default PostListItem;
