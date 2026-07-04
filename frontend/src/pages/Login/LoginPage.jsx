import LoginForm from "@/features/auth/components/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-3xl font-bold text-white">
            P
          </div>
          <h1 className="text-3xl font-bold">
            PharmaFlow
          </h1>
          <p className="mt-2 text-slate-500">
            Pharmacy Management System
          </p>
        </div>
        <LoginForm/>
      </div>
    </div>
  );
};


export default LoginPage;
