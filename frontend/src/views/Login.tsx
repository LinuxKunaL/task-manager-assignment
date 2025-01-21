import { Button, Card, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

type Props = {};

const Login = (props: Props) => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Card className="flex lg:w-4/12 w-5/6 flex-col gap-4 ">
        <h3 className="text-2xl dark:text-gray-100 font-semibold">Login</h3>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput
            id="email1"
            type="email"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput
            id="password1"
            type="password"
            required
            placeholder="Password"
          />
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
    </div>
  );
};

export default Login;
