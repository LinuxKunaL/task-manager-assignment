import { Button, Datepicker, Dropdown } from "flowbite-react";
import TaskCard from "./components/TaskCard";
import { useEffect, useState } from "react";
import demoData from "../../utils/demoData";
import { TTask } from "../../types/task";
import AddTaskModal from "./components/AddTaskModal";
import ViewTaskModal from "./components/ViewTaskModal";
import EditTaskModal from "./components/EditTaskModal";

function Tasks() {
  const [openAddTask, setOpenAddTask] = useState(false);
  const [openEditTask, setOpenEditTask] = useState(false);
  const [openTaskView, setOpenTaskView] = useState<boolean>(false);
  const [singleTaskData, setSingleTaskData] = useState<TTask>();
  const [tasksList, setTasksList] = useState<TTask[]>();

  useEffect(() => {
    setTasksList(demoData as unknown as TTask[]);
  }, []);

  const handleAddTask = () => {
    setOpenAddTask(true);
  };

  const handleCheckTask = (id: number) => {
    const data = tasksList?.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          status: task.status === "completed" ? "pending" : "completed",
        };
      }
      return task;
    });
    setTasksList(data as TTask[]);
    setOpenTaskView(false);
  };

  const handleViewTask = (id: number) => {
    const data = tasksList?.find((task) => task.id === id);
    setSingleTaskData(data as TTask);
    setOpenTaskView(true);
  };

  const handleEditTask = (id: number) => {
    const data = tasksList?.find((task) => task.id === id);
    setSingleTaskData(data as TTask);
    setOpenTaskView(false);
    setOpenEditTask(true);
  };

  const handleDeleteTask = (id: number): void => {
    const data = tasksList?.filter((task) => task.id !== id);
    setTasksList(data as TTask[]);
    setOpenTaskView(false);
  };

  return (
    <main className="p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl dark:text-gray-100 font-semibold">
            Task List
          </h1>
          <p className="text-gray-500 font-normal">
            Lorem ipsum dolor sit adipisicing elit. Ex?
          </p>
        </div>
        <div className="flex gap-3">
          <Datepicker placeholder="Select date" language="en" />
          <Dropdown label="Filter" color="dark" dismissOnClick={false}>
            <Dropdown.Item>pending</Dropdown.Item>
            <Dropdown.Item>completed</Dropdown.Item>
          </Dropdown>
          <Button onClick={handleAddTask}>Add Task</Button>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-4 h-[40pc]s overflow-y-scroll">
        {tasksList?.map((task: TTask) => (
          <TaskCard
            {...task}
            handleCheckTask={handleCheckTask}
            handleViewTask={handleViewTask}
            handleEditTask={handleEditTask}
            handleDeleteTask={handleDeleteTask}
          />
        ))}
      </div>
      {openAddTask && (
        <AddTaskModal
          setOpenAddTask={setOpenAddTask}
          openAddTask={openAddTask}
        />
      )}
      {openTaskView && (
        <ViewTaskModal
          actions={{
            handleDeleteTask,
            handleEditTask,
            handleCheckTask,
          }}
          data={singleTaskData as TTask}
          setOpenModal={setOpenTaskView}
          openModal={openTaskView}
        />
      )}
      {openEditTask && (
        <EditTaskModal
          show={openEditTask}
          setClose={setOpenEditTask}
          data={singleTaskData as TTask}
        />
      )}
    </main>
  );
}

export default Tasks;
