import FormPageLayout from "@/layouts/FormPageLayout";
import LoginForm from "@/components/LoginForm";

const LoginPage = () => {
  return (
    <FormPageLayout title="로그인">
      <LoginForm />
    </FormPageLayout>
  );
};

export default LoginPage;
