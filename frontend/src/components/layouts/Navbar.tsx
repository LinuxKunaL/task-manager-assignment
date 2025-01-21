import { Avatar, DarkThemeToggle, Dropdown, Navbar } from "flowbite-react";

function NavbarComp() {
  return (
    <Navbar
      fluid
      rounded={true}
      className="p-4 border-b-[1px] border-l-[1px] border-r-[1px]  border-gray-200"
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
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
}

export default NavbarComp;
