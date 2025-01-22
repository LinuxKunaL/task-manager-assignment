import { Avatar, DarkThemeToggle, Dropdown, Navbar } from "flowbite-react";
import { TUser } from "../../types/user";

type Props = {
  data:TUser;
};
function NavbarComp({ data }: Props) {
  return (
    <Navbar
      rounded={true}
      className="p-4 border-b-[1px] border-l-[1px] border-r-[1px] border-gray-200 sticky top-0 z-50 dark:bg-gray-800/80 bg-white/80 backdrop-blur-md"
    >
      <Navbar.Brand>
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Task Manager
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2 gap-4">
        <DarkThemeToggle />
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://avatar.iran.liara.run/public/19"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{data?.name}</span>
            <span className="block truncate text-sm font-medium">
              {data?.email}
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
      </div>
    </Navbar>
  );
}

export default NavbarComp;
