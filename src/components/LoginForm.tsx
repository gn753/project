import React from "react";
import { useForm } from "react-hook-form";
import { Button, VStack, useToast, Text, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import FormPageInput from "./FormPageInput";
import getLogin from "@/api/getLogin";
import handleError from "@/api/handleError";
import { BaseUser } from "@/types/auth";

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BaseUser>();
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = async (data: BaseUser) => {
    try {
      const response = await getLogin(data); // getLogin 함수 호출
      const { accessToken, refreshToken } = response;

      // 로컬 스토리지에 토큰 저장
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      toast({
        title: "로그인 성공",
        description: "대시보드로 이동합니다.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/dashboard"); // 로그인 성공 시 대시보드로 이동
    } catch (error) {
      const errorMessage = handleError(error); // handleError 함수 호출

      toast({
        title: "로그인 실패",
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing="4">
        <FormPageInput
          label="이메일"
          type="email"
          placeholder="developer@bigs.or.kr"
          register={register("username", {
            required: "이메일을 입력해주세요.",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "유효한 이메일 형식을 입력해주세요.",
            },
          })}
          errorMessage={errors.username?.message}
        />
        <FormPageInput
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          register={register("password", {
            required: "비밀번호를 입력해주세요.",
          })}
          errorMessage={errors.password?.message}
        />
        <Button colorScheme="blue" type="submit" width="full">
          로그인
        </Button>
        <Text fontSize="sm" textAlign="center" mt="4">
          계정이 없으신가요?{" "}
          <Link
            color="blue.500"
            onClick={() => navigate("/signup")} // 회원가입 페이지로 이동
          >
            회원가입
          </Link>
        </Text>
      </VStack>
    </form>
  );
};

export default LoginForm;
