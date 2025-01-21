import { Button, Datepicker, Dropdown, TextInput } from "flowbite-react";
import TaskCard from "./components/TaskCard";
import { useEffect, useState } from "react";
import demoData from "../../utils/demoData";
import { TTask } from "../../types/task";
import AddTaskModal from "./components/AddTaskModal";
import ViewTaskModal from "./components/ViewTaskModal";
import EditTaskModal from "./components/EditTaskModal";
import { MdSearch } from "react-icons/md";

function Tasks() {
  const [openAddTask, setOpenAddTask] = useState(false);
  const [openEditTask, setOpenEditTask] = useState(false);
  const [openTaskView, setOpenTaskView] = useState<boolean>(false);
  const [singleTaskData, setSingleTaskData] = useState<TTask>();
  const [tasksList, setTasksList] = useState<TTask[]>();
  const [filteredTasksList, setFilteredTasksList] = useState<TTask[]>();
  const [filterLabel, setFilterLabel] = useState("Filter");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    setTasksList(demoData as unknown as TTask[]);
    setFilteredTasksList(demoData as unknown as TTask[]);
  }, []);

  const handleAddTask = () => {
    setOpenAddTask(true);
  };

  const handleCheckTask = (id: number) => {
    const data = filteredTasksList?.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          status: task.status === "completed" ? "pending" : "completed",
        };
      }
      return task;
    });
    setFilteredTasksList(data as TTask[]);
    setOpenTaskView(false);
  };

  const handleViewTask = (id: number) => {
    const data = filteredTasksList?.find((task) => task.id === id);
    setSingleTaskData(data as TTask);
    setOpenTaskView(true);
  };

  const handleEditTask = (id: number) => {
    const data = filteredTasksList?.find((task) => task.id === id);
    setSingleTaskData(data as TTask);
    setOpenTaskView(false);
    setOpenEditTask(true);
  };

  const handleDeleteTask = (id: number): void => {
    const data = filteredTasksList?.filter((task) => task.id !== id);
    setFilteredTasksList(data as TTask[]);
    setOpenTaskView(false);
  };

  const filterTasks = (status: string) => {
    if (status === "all") {
      setFilterLabel("Filter");
      return setFilteredTasksList(tasksList as TTask[]);
    }
    setFilterLabel(status);
    const data = tasksList?.filter((task) => task.status === status);
    setFilteredTasksList(data as TTask[]);
  };

  const filterTasksByDate = (date: Date | null) => {
    if (!date) {
      return setFilteredTasksList(tasksList as TTask[]);
    }
    const data = tasksList?.filter((task) => {
      const taskDate = new Date(task.createdAt);
      return taskDate.toDateString() === date?.toDateString();
    });
    setFilteredTasksList(data as TTask[]);
  };

  const handleSearch = () => {
    if (!searchQuery) {
      return setFilteredTasksList(tasksList as TTask[]);
    }
    const data = tasksList?.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTasksList(data as TTask[]);
  };

  const handleClearSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (searchQuery === "") {
        setSearchQuery("");
        handleSearch();
      }
    }
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <main className="p-4 h-full">
      <div className="flex justify-between items-start  md:items-center md:flex-row flex-col gap-6">
        <div>
          <h1 className="text-2xl dark:text-gray-100 font-semibold">
            Task List
          </h1>
          <p className="text-gray-500 font-normal">
            Lorem ipsum dolor sit adipisicing elit. Ex?
          </p>
        </div>
        <div className="flex gap-3 flex-col sm:w-auto w-full">
          <div className="flex gap-3 !select-none">
            <Datepicker
              placeholder="Select date"
              language="en"
              onChange={filterTasksByDate}
              className="flex-auto"
            />
            <Button className="flex-auto text-nowrap" onClick={handleAddTask}>
              Add Task
            </Button>
          </div>
          <div className="flex gap-2">
            <Dropdown
              label={filterLabel}
              color="dark"
              arrowIcon={false}
              dismissOnClick={false}
            >
              <Dropdown.Item onClick={() => filterTasks("all")}>
                all
              </Dropdown.Item>
              <Dropdown.Item onClick={() => filterTasks("pending")}>
                pending
              </Dropdown.Item>
              <Dropdown.Item onClick={() => filterTasks("completed")}>
                completed
              </Dropdown.Item>
            </Dropdown>
            <TextInput
              placeholder="Search"
              onKeyDown={handleClearSearch}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
            <Button onClick={handleSearch}>
              <MdSearch className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        {filteredTasksList?.map((task: TTask) => (
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
