import { Button, Datepicker, Dropdown, TextInput } from "flowbite-react";
import TaskCard from "./components/TaskCard";
import { Fragment, useEffect, useState } from "react";
import { TTask } from "../../types/task";
import AddTaskModal from "./components/AddTaskModal";
import ViewTaskModal from "./components/ViewTaskModal";
import EditTaskModal from "./components/EditTaskModal";
import { MdClose, MdList, MdSearch } from "react-icons/md";
import useTasks from "../../hooks/useTasks";
import useToast from "../../hooks/useToast";

function Tasks() {
  const [openAddTask, setOpenAddTask] = useState(false);
  const [openEditTask, setOpenEditTask] = useState(false);
  const [openTaskView, setOpenTaskView] = useState<boolean>(false);
  const [singleTaskData, setSingleTaskData] = useState<TTask>();
  const [tasksList, setTasksList] = useState<TTask[]>();
  const [filteredTasksList, setFilteredTasksList] = useState<TTask[]>();
  const [filterLabel, setFilterLabel] = useState("Filter");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [stateRefresh, setStateRefresh] = useState<number>(0);
  const { toastError, toastSuccess } = useToast();
  const { getTasks, checkTask, deleteTask } = useTasks();

  useEffect(() => {
    getTasks().then((data) => {
      if (data.success) {
        setTasksList(data.data as unknown as TTask[]);
        setFilteredTasksList(data.data as unknown as TTask[]);
      }
      if (data.error) {
        toastError(data.error);
      }
    });
  }, [stateRefresh]);

  const handleAddTask = () => {
    setOpenAddTask(true);
  };

  const handleCheckTask = async (id: string) => {
    const result = await checkTask(id);
    if (result.error) {
      return toastError(result.error);
    }
    toastSuccess(result.message);
    setOpenTaskView(false);
    setStateRefresh((prev: number) => prev + 1);
  };

  const handleViewTask = (id: string) => {
    const data = filteredTasksList?.find((task) => task._id === id);
    setSingleTaskData(data as TTask);
    setOpenTaskView(true);
  };

  const handleEditTask = (id: string) => {
    const data = filteredTasksList?.find((task) => task._id === id);
    setSingleTaskData(data as TTask);
    setOpenTaskView(false);
    setOpenEditTask(true);
  };

  const handleDeleteTask = (id: string): void => {
    deleteTask(id).then((data) => {
      if (data.error) {
        return toastError(data.error);
      }
      toastSuccess(data.message);
      setStateRefresh((prev: number) => prev + 1);
      setOpenTaskView(false);
    });
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
      const taskDate = new Date(task.date);
      return taskDate.toDateString() === date?.toDateString();
    });
    setFilteredTasksList(data as TTask[]);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toastError("Please enter a search query");
      setFilteredTasksList(tasksList ?? []);
      return;
    }

    const filteredData = tasksList?.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredTasksList(filteredData ?? []);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setFilteredTasksList(tasksList ?? []);
  };

  return (
    <main className="p-4 h-full">
      <div className="flex justify-between items-start  md:items-center md:flex-row flex-col gap-6">
        <div>
          <h1 className="text-2xl dark:text-gray-100 font-semibold">
            Task List{" "}
          </h1>{" "}
          <p className="text-gray-500 font-normal">
            {filteredTasksList?.length} tasks
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
            <Dropdown label={filterLabel} color="dark" arrowIcon={false}>
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
            <div className="relative select-none">
              <TextInput
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
              {searchQuery && (
                <MdClose
                  onClick={handleClearSearch}
                  className="absolute right-2 top-0 bottom-0 my-auto cursor-pointer text-teal-500 transition-all hover:text-teal-300 size-5"
                />
              )}
            </div>

            <Button onClick={handleSearch}>
              <MdSearch className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        {filteredTasksList?.map((task: TTask) => (
          <Fragment key={task._id}>
            <TaskCard
              {...task}
              handleCheckTask={handleCheckTask}
              handleViewTask={handleViewTask}
              handleEditTask={handleEditTask}
              handleDeleteTask={handleDeleteTask}
            />
          </Fragment>
        ))}
      </div>
      {filteredTasksList?.length === 0 && (
        <div className="flex justify-center items-center w-full p-4 h-[50%] ">
          <div className="flex flex-col gap-2 w-auto text-center justify-center items-center">
            <MdList size={23} className="text-teal-500" />
            <p className="text-gray-500 font-semibold">No tasks found</p>
          </div>
        </div>
      )}
      {openAddTask && (
        <AddTaskModal
          setOpenAddTask={setOpenAddTask}
          openAddTask={openAddTask}
          setStateRefresh={setStateRefresh}
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
          setStateRefresh={setStateRefresh}
        />
      )}
    </main>
  );
}

export default Tasks;
