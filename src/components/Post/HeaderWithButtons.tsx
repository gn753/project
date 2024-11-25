import { useCategories } from "@/context/CategoriesContext";
import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const HeaderWithButtons = () => {
  const { categories } = useCategories();
  const navigate = useNavigate();

  const handleNavigateToCreatePost = () => {
    navigate("/posts/create"); // 글쓰기 페이지로 이동
  };
  const onLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    alert("로그아웃되었습니다.");
    window.location.href = "/login"; // 로그인 페이지로 리디렉트
  };
  return (
    <Box as="header" bg="blue.500" px="4" py="2" mb="4">
      {categories && categories.length > 0 && (
        <Flex align="center">
          <Spacer />
          <Button
            colorScheme="teal"
            size="sm"
            mr="2"
            onClick={handleNavigateToCreatePost}
          >
            글쓰기
          </Button>
          <Button colorScheme="red" size="sm" onClick={onLogout}>
            로그아웃
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default HeaderWithButtons;
