import {
  FormControl,
  FormLabel,
  Textarea,
  Button,
  FormErrorMessage,
  Select,
  Input,
  Box,
} from "@chakra-ui/react";
import { PatchPostRequest, PostDetailResponse } from "@/types/post";
import { useForm } from "react-hook-form";
import { observer } from "mobx-react-lite"; // MobX 사용하지 않으면 제거 가능
import { useCategories } from "@/context/CategoriesContext";

interface PostEditFormProps {
  post: Partial<PostDetailResponse>; // 수정할 데이터
  isSaving: boolean;
  onSave: (data: PatchPostRequest) => void;
  onCancel: () => void;
}

const PostEditForm: React.FC<PostEditFormProps> = observer(
  ({ post, isSaving, onSave, onCancel }) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      defaultValues: {
        title: post?.title || "",
        content: post?.content || "",
        category: post?.boardCategory || "",
      },
    });

    // Context에서 카테고리 데이터 가져오기
    const { categories, isLoading, error } = useCategories();

    const onSubmit = (data: {
      title: string;
      content: string;
      category: string;
    }) => {
      onSave({
        id: Number(post.id),
        title: data.title,
        content: data.content,
        category: data.category,
      });
    };

    return (
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        {/* 제목 입력 필드 */}
        <FormControl mb="4" isInvalid={!!errors.title}>
          <FormLabel>제목</FormLabel>
          <Input
            type="text"
            placeholder="제목을 입력하세요"
            {...register("title", {
              required: "제목은 필수 입력 항목입니다.",
              maxLength: {
                value: 10,
                message: "제목은 10자 이내로 입력해주세요.",
              },
            })}
          />
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>

        {/* 내용 입력 필드 */}
        <FormControl mb="4" isInvalid={!!errors.content}>
          <FormLabel>내용</FormLabel>
          <Textarea
            placeholder="내용을 입력하세요"
            rows={8}
            {...register("content", {
              required: "내용은 필수 입력 항목입니다.",
              minLength: {
                value: 4,
                message: "내용은 최소 4자 이상 입력해주세요.",
              },
            })}
          />
          <FormErrorMessage>
            {errors.content && errors.content.message}
          </FormErrorMessage>
        </FormControl>

        {/* 카테고리 선택 필드 */}
        <FormControl mb="4" isInvalid={!!errors.category}>
          <FormLabel>카테고리</FormLabel>
          {isLoading ? (
            <p>카테고리를 불러오는 중...</p>
          ) : error ? (
            <p>카테고리를 불러오는 데 실패했습니다.</p>
          ) : (
            <Select
              placeholder="카테고리를 선택하세요"
              {...register("category", {
                required: "카테고리는 필수 입력 항목입니다.",
              })}
              defaultValue={post.boardCategory}
            >
              {categories?.map((category) => (
                <option key={category.key} value={category.label}>
                  {category.label}
                </option>
              ))}
            </Select>
          )}
          <FormErrorMessage>
            {errors.category && errors.category.message}
          </FormErrorMessage>
        </FormControl>

        {/* 저장 및 취소 버튼 */}
        <Box display="flex" justifyContent="flex-end" gap="4">
          <Button colorScheme="blue" type="submit" isLoading={isSaving}>
            저장
          </Button>
          <Button colorScheme="gray" onClick={onCancel}>
            취소
          </Button>
        </Box>
      </Box>
    );
  }
);

export default PostEditForm;
