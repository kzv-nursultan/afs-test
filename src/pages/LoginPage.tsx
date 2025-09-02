import { AuthLayout } from "../layouts/Authentication/Authentication";
import LoginForm from "../features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Sign in"
      subtitle="Access your All Funeral Services account"
    >
      <LoginForm />
    </AuthLayout>
  );
}
