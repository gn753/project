import { Box, Button, HStack, Spinner, VStack } from "@chakra-ui/react";
import { useCategories } from "@/context/CategoriesContext";

interface MenubarProps {
  selectedCategory?: string | null; // 현재 선택된 카테고리
  onSelectCategory: (category: string | null) => void; // 카테고리 선택 콜백
}

const Menubar: React.FC<MenubarProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  // Context에서 카테고리 데이터 로드
  const { categories, isLoading, error } = useCategories();

  if (isLoading) {
    return (
      <Box textAlign="center" my="4">
        <Spinner />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" my="4" color="red.500">
        카테고리를 불러오는 중 오류가 발생했습니다.
      </Box>
    );
  }

  return (
    <VStack spacing={2} align="stretch" mb="4">
      <HStack spacing={2}>
        {/* 전체 버튼 */}
        <Button
          colorScheme={!selectedCategory ? "blue" : "gray"}
          onClick={() => onSelectCategory(null)}
        >
          전체
        </Button>
        {/* 카테고리 버튼들 */}
        {categories?.map((category) => (
          <Button
            key={category.key}
            colorScheme={selectedCategory === category.key ? "blue" : "gray"}
            onClick={() => onSelectCategory(category.key)}
          >
            {category.label}
          </Button>
        ))}
      </HStack>
    </VStack>
  );
};

export default Menubar;
