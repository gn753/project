import React from "react";
import { Box, Heading, IconButton } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
}

const FormPageLayout: React.FC<AuthLayoutProps> = ({ title, children }) => {
  const navigate = useNavigate();

  return (
    <Box
      maxW="400px"
      mx="auto"
      mt="50px"
      p="6"
      boxShadow="lg"
      borderRadius="md"
    >
      {/* 뒤로가기 버튼 */}
      <IconButton
        icon={<ArrowBackIcon />}
        aria-label="뒤로가기"
        onClick={() => navigate(-1)}
        variant="ghost"
        colorScheme="blue"
        mb="4"
        fontSize="2xl" // 아이콘 크기
      />
      {/* 페이지 제목 */}
      <Heading as="h1" size="lg" textAlign="center" mb="6">
        {title}
      </Heading>
      {/* 자식 컴포넌트 렌더링 */}
      {children}
    </Box>
  );
};

export default FormPageLayout;
