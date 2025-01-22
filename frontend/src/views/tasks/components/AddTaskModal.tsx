import React from "react";
import {
  Button,
  Datepicker,
  Label,
  Modal,
  Textarea,
  TextInput,
} from "flowbite-react";
import useTasks from "../../../hooks/useTasks";
import { FieldValues, useForm } from "react-hook-form";
import useToast from "../../../hooks/useToast";

type Props = {
  openAddTask: boolean;
  setOpenAddTask: React.Dispatch<React.SetStateAction<boolean>>;
  setStateRefresh: React.Dispatch<React.SetStateAction<number>>;
};
type TTask = {
  title: string;
  date: string;
  description: string;
};
function AddTaskModal(props: Props) {
  const { addTask } = useTasks();
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { toastSuccess, toastError } = useToast();

  const handleAddTask = async (data: FieldValues) => {
    const task: TTask = {
      title: data.title as string,
      date: data.date as string,
      description: data.description as string,
    };
    const taskWithDate = {
      ...task,
      date: new Date(task.date).toDateString() || new Date().toDateString(),
    };
    const result = await addTask(taskWithDate);

    if (result.error) {
      return toastError(result.error);
    }
    toastSuccess(result.message);
    props.setOpenAddTask(false);
    props.setStateRefresh((prev: number) => prev + 1);
  };

  return (
    <Modal
      show={props.openAddTask}
      onClose={() => props.setOpenAddTask(false)}
      className="select-none animate-fade "
    >
      <form onSubmit={handleSubmit(handleAddTask)}>
        <Modal.Header className="dark:bg-gray-800 bg-white">
          Add Task
        </Modal.Header>
        <Modal.Body className="dark:bg-gray-800 bg-white gap-5 flex flex-col scrollbar-thin dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800 scrollbar-thumb-gray-400 scrollbar-track-gray-300">
          <div className="flex w-full items-center gap-5">
            <div className="flex-1">
              <div className="mb-2 block bg-">
                <Label htmlFor="title" value="Title" />
              </div>
              <TextInput
                id="title"
                placeholder="Enter title"
                {...register("title", {
                  required: "title is required",
                })}
              />
              {errors.title && (
                <p className="text-red-500 text-sm absolute">
                  {errors.title.message?.toString()}
                </p>
              )}
            </div>
            <div className="flex-1">
              <div className="mb-2 block">
                <Label htmlFor="date" value="Date" />
              </div>
              <Datepicker
                placeholder="Select date"
                language="en"
                onChange={(date) => setValue("date", date)}
                required
              />
            </div>
          </div>
          <div className="flex w-full items-center gap-4">
            <div className="flex-1">
              <div className="mb-2 block">
                <Label htmlFor="Description" value="Description" />
              </div>
              <Textarea
                id="Description"
                rows={4}
                placeholder="Enter Description"
                {...register("description", {
                  required: "description is required",
                })}
              />
              {errors.description && (
                <p className="text-red-500 text-sm absolute">
                  {errors.description.message?.toString()}
                </p>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="dark:bg-gray-800 bg-white">
          <Button type="submit">Save</Button>
          <Button onClick={() => props.setOpenAddTask(false)} color="failure">
            Discard
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default AddTaskModal;
