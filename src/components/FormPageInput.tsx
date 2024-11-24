import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";

interface FormPageInputProps {
  label: string;
  type: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  errorMessage?: string;
}

const FormPageInput: React.FC<FormPageInputProps>= ({
  label,
  type,
  placeholder,
  register,
  errorMessage,
}) => (
  <FormControl isInvalid={!!errorMessage}>
    <FormLabel>{label}</FormLabel>
    <Input type={type} placeholder={placeholder} {...register} />
    <FormErrorMessage>{errorMessage}</FormErrorMessage>
  </FormControl>
);

export default FormPageInput;
 