import { useEffect, useState } from "react";
import Navbar from "../../components/layouts/Navbar";
import TasksView from "./TasksView";
import useAuth from "../../hooks/useAuth";
import { TUser } from "../../types/user";

const Index = () => {
  const { me } = useAuth();
  const [userData, setUserData] = useState<TUser>();

  useEffect(() => {
    me()
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Navbar data={userData as TUser} />
      <TasksView />
    </div>
  );
};

export default Index;
