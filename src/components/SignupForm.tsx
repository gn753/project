import React from "react";
import { useForm } from "react-hook-form";
import { Button, VStack, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import FormPageInput from "./FormPageInput";
import { SignupRequest } from "@/types/auth";
import postSignup from "@/api/getSignup";

const SignUpForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupRequest>();
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = async (data: SignupRequest) => {
    try {
      await postSignup(data);

      toast({
        title: "회원가입 성공",
        description: "로그인 페이지로 이동합니다.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/login");
    } catch {
      toast({
        title: "회원가입 실패",
        description: "오류가 발생했습니다. 다시 시도해주세요.",
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
          label="이름"
          type="text"
          placeholder="개발자"
          register={register("name", {
            required: "이름을 입력해주세요.",
          })}
          errorMessage={errors.name?.message}
        />
        <FormPageInput
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          register={register("password", {
            required: "비밀번호를 입력해주세요.",
            pattern: {
              value:
                /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!%*#?&])[A-Za-z\d!%*#?&]{8,}$/,
              message:
                "비밀번호는 8자 이상이며, 영문자, 숫자, 특수문자를 포함해야 합니다.",
            },
          })}
          errorMessage={errors.password?.message}
        />
        <FormPageInput
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
          register={register("confirmPassword", {
            required: "비밀번호 확인을 입력해주세요.",
            validate: (value) =>
              value === watch("password") || "비밀번호가 일치하지 않습니다.",
          })}
          errorMessage={errors.confirmPassword?.message}
        />
        <Button colorScheme="blue" type="submit" width="full">
          회원가입
        </Button>
      </VStack>
    </form>
  );
};

export default SignUpForm;
