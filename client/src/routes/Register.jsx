import { SignUp } from "@clerk/clerk-react";

function Register() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh - 80px)]">
      <SignUp signInUrl="/login" />
    </div>
  );
}

export default Register;
