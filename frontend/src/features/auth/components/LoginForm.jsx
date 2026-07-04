import { useState } from "react";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import loginSchema from "../validation/login.schema";
import useLogin from "../hooks/useLogin";

const LoginForm = () => {
    const [ showPassword, setShowPassword ] = useState(false);
    const loginMutation = useLogin();
    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    });

    const onSubmit = (data) => {
        loginMutation.mutate(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
        >
            <Input
                label="Username"
                placeholder="Enter username"
                leftIcon={<User size={18} />}
                error={errors.username?.message}
                {...register("username")}
            />
            <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                leftIcon={<Lock size={18} />}
                rightIcon={
                    <button
                        type="button"
                        onClick={()=>setShowPassword(!showPassword)}
                    >
                        {
                            showPassword
                            ? <EyeOff size={18}/>
                            : <Eye size={18}/>
                        }
                    </button>
                }
                error={errors.password?.message}
                {...register("password")}
            />
            <Button
                type="submit"
                loading={loginMutation.isPending}
                fullWidth
            >
                Login
            </Button>
        </form>
    );
};

export default LoginForm;