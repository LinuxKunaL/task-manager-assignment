import { Button, Card, Label, TextInput } from "flowbite-react";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useToast from "../hooks/useToast";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { AuthLogin } = useAuth();
  const { toastSuccess, toastError } = useToast();
  const navigate = useNavigate();
  const onSubmit = async (data: FieldValues): Promise<void> => {
    const result = await AuthLogin(data);
    if (result?.error) {
      return toastError(result?.error);
    }
    if (result?.token) {
      localStorage.setItem("token", result?.token);
    }
    toastSuccess(result?.message);
    setTimeout(() => {
      navigate("/tasks");
    }, 1000);
  };

  return (
    <form
      className="h-screen w-full flex justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card className="flex lg:w-4/12 w-5/6 flex-col gap-4 ">
        <h3 className="text-2xl dark:text-gray-100 font-semibold">Login</h3>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput
            id="email"
            type="email"
            placeholder="name@flowbite.com"
            {...register("email", {
              required: "Email required",
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">
              {errors?.email?.message?.toString()}
            </p>
          )}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput
            id="password1"
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password required",
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors?.password?.message?.toString()}
            </p>
          )}
        </div>
        <Button type="submit">Submit</Button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          {" "}
          Not registered?{" "}
          <Link
            to={"/signup"}
            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
          >
            Sign Up
          </Link>
        </p>
      </Card>
    </form>
  );
};

export default Login;
