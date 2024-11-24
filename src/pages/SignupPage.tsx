import SignupForm from "@/components/SignupForm";
import FormPageLayout from "@/layouts/FormPageLayout";

const SignupPage = () => {
  return (
    <FormPageLayout title="회원가입">
      <SignupForm />;
    </FormPageLayout>
  );
};

export default SignupPage;
