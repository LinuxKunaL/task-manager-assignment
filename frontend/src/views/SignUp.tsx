import { Button, Card, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="h-full w-full flex justify-center items-center">
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
            required
          />
        </div>
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
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput
            id="password"
            type="password"
            required
            placeholder="Password"
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="confirm_password" value="confirm password" />
          </div>
          <TextInput
            id="confirm_password"
            type="password"
            required
            placeholder="confirm Password"
          />
        </div>
        <Button type="submit">Submit</Button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          {" "}
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
          >
          Login
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default SignUp;
