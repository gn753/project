import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    Select,
    FormErrorMessage,
  } from "@chakra-ui/react";
  import { useForm } from "react-hook-form";
  
  interface PostCreateFormProps {
    onSubmit: (data: {
      title: string;
      category: string;
      content: string;
      file?: File | null;
    }) => void;
  }
  
  interface FormValues {
    title: string;
    category: string;
    content: string;
    file?: File | null;
  }
  
  const PostCreateForm: React.FC<PostCreateFormProps> = ({ onSubmit }) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm<FormValues>();
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null;
      setValue("file", file); // 파일 설정
    };
  
    const submitHandler = (data: FormValues) => {
      onSubmit(data);
    };
  
    return (
      <Box as="form" onSubmit={handleSubmit(submitHandler)}>
        <FormControl isInvalid={!!errors.title} mb="4">
          <FormLabel>제목</FormLabel>
          <Input
            type="text"
            placeholder="제목을 입력하세요"
            {...register("title", {
              required: "제목은 필수 입력 항목입니다.",
              maxLength: {
                value: 100,
                message: "제목은 최대 100자까지 입력 가능합니다.",
              },
            })}
          />
          <FormErrorMessage>{errors.title && errors.title.message}</FormErrorMessage>
        </FormControl>
  
        <FormControl isInvalid={!!errors.category} mb="4">
          <FormLabel>카테고리</FormLabel>
          <Select
            placeholder="카테고리를 선택하세요"
            {...register("category", {
              required: "카테고리는 필수 선택 항목입니다.",
            })}
          >
            <option value="NOTICE">공지</option>
            <option value="FREE">자유</option>
            <option value="QNA">Q&A</option>
            <option value="ETC">기타</option>
          </Select>
          <FormErrorMessage>
            {errors.category && errors.category.message}
          </FormErrorMessage>
        </FormControl>
  
        <FormControl isInvalid={!!errors.content} mb="4">
          <FormLabel>내용</FormLabel>
          <Textarea
            placeholder="내용을 입력하세요"
            rows={8}
            {...register("content", {
              required: "내용은 필수 입력 항목입니다.",
              minLength: {
                value: 10,
                message: "내용은 최소 10자 이상이어야 합니다.",
              },
            })}
          />
          <FormErrorMessage>{errors.content && errors.content.message}</FormErrorMessage>
        </FormControl>
  
        <FormControl mb="4">
          <FormLabel>파일 첨부 (선택)</FormLabel>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </FormControl>
  
        <Button colorScheme="blue" type="submit" width="full">
          작성 완료
        </Button>
      </Box>
    );
  };
  
  export default PostCreateForm;
  