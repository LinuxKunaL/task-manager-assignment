import { Button, Card, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import useToast from "../hooks/useToast";

type TSubmitData = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
};

function SignUp() {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { AuthRegister } = useAuth();
  const { toastSuccess, toastError } = useToast();

  const onSubmit = async (data: TSubmitData | FieldValues): Promise<void> => {
    const result = await AuthRegister(data);
    if (result?.error) {
      return toastError(result?.error);
    }
    toastSuccess(result?.message);
  };

  const password = watch("password");

  return (
    <form
      className="h-screen w-full flex justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card className="flex lg:w-4/12 w-5/6 flex-col gap-4 ">
        <h3 className="text-2xl dark:text-gray-100 font-semibold">Sign Up</h3>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Your name" />
          </div>
          <TextInput
            id="name"
            type="text"
            placeholder="name"
            {...register("name", {
              required: "Name is required",
            })}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">
              {errors?.name?.message?.toString()}
            </p>
          )}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput
            id="email"
            type="email"
            placeholder="name@flowbite.com"
            {...register("email", {
              required: "Email is required",
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
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput
            id="password"
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors?.password?.message?.toString()}
            </p>
          )}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="confirm_password" value="confirm password" />
          </div>
          <TextInput
            id="confirm_password"
            type="password"
            placeholder="confirm Password"
            {...register("confirm_password", {
              required: "confirm password is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.confirm_password && (
            <p className="text-red-500 text-xs mt-1">
              {errors?.confirm_password?.message?.toString()}
            </p>
          )}
        </div>
        <Button type="submit">Submit</Button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
          >
            Login
          </Link>
        </p>
      </Card>
    </form>
  );
}

export default SignUp;
