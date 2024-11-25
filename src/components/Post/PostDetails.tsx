import { PostDetailResponse } from "@/types/post";
import { Box, Heading, Text, Image } from "@chakra-ui/react";

const PostDetails: React.FC<PostDetailResponse> = ({
  title,
  content,
  boardCategory,
  imageUrl,
  createdAt,
}) => {
  return (
    <Box maxW="600px" mx="auto" mt="6" p="4">
      <Heading as="h1" size="lg" mb="4">
        {title}
      </Heading>
      <Text mb="2" fontSize="sm" color="gray.500">
        카테고리: {boardCategory}
      </Text>
      <Text mb="4" fontSize="sm" color="gray.400">
        작성일: {createdAt && new Date(createdAt).toLocaleDateString()}
      </Text>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={title}
          mb="4"
          borderRadius="md"
          maxH="400px"
          objectFit="cover"
        />
      )}
      <Text fontSize="md">{content}</Text>
    </Box>
  );
};

export default PostDetails;
