import { VStack, Text, ListItem } from "@chakra-ui/react";
import { Post } from "@/types/post";
import { Link } from "react-router-dom";
interface PostListItemProps {
  post: Post;
}

const PostListItem: React.FC<PostListItemProps> = ({ post }) => {
  return (
    <ListItem borderWidth="1px" borderRadius="md" p="4" shadow="sm">
      <VStack align="start" spacing={2}>
        <Link to={`/posts/${post.id}`}>
          <Text fontSize="lg" fontWeight="bold" color="blue.500">
            {post.title}
          </Text>
        </Link>
        <Text fontSize="sm" color="gray.500">
          {post.category}
        </Text>
        <Text fontSize="sm" color="gray.400">
          {post.createdAt && new Date(post.createdAt).toLocaleDateString()}
        </Text>
      </VStack>
    </ListItem>
  );
};

export default PostListItem;
