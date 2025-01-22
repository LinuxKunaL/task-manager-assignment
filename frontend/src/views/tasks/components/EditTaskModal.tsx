import React, { useEffect } from "react";
import {
  Button,
  Datepicker,
  Label,
  Modal,
  Textarea,
  TextInput,
} from "flowbite-react";
import { TEditTask, TTask } from "../../../types/task";
import useTasks from "../../../hooks/useTasks";
import { FieldValues, useForm } from "react-hook-form";
import useToast from "../../../hooks/useToast";

type Props = {
  show: boolean;
  data: TTask | null;
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
  setStateRefresh: React.Dispatch<React.SetStateAction<number>>;
};

function EditTaskModal({ show, setClose, data, setStateRefresh }: Props) {
  const { updateTask } = useTasks();
  const { toastSuccess, toastError } = useToast();

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (data) {
      setValue("title", data.title);
      setValue("date", new Date(data.date).toDateString());
      setValue("description", data.description);
    }
  }, [data, setValue]);

  const handleEditTask = async (formData: FieldValues) => {
    const task: TEditTask = {
      title: formData.title,
      date: formData.date,
      description: formData.description,
    };
    const result = await updateTask(data?._id as string, task);
    if (result.error) {
      return toastError(result.error);
    }
    toastSuccess(result.message);
    setStateRefresh((prev: number) => prev + 1);
    setClose(false);
  };

  return (
    <Modal
      show={show}
      onClose={() => setClose(false)}
      className="select-none animate-fade"
    >
      <form onSubmit={handleSubmit(handleEditTask)}>
        <Modal.Header className="dark:bg-gray-800 bg-white">
          Edit Task
        </Modal.Header>
        <Modal.Body className="dark:bg-gray-800 bg-white gap-3 flex flex-col">
          <div className="flex w-full items-center gap-4">
            <div className="flex-1">
              <div className="mb-2 block">
                <Label htmlFor="title" value="Title" />
              </div>
              <TextInput
                id="title"
                placeholder="Enter title"
                {...register("title", {
                  required: "Title is required",
                })}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">
                  {errors.title.message?.toString()}
                </p>
              )}
            </div>

            <div className="flex-1">
              <div className="mb-2 block">
                <Label htmlFor="date" value="Date" />
              </div>
              <Datepicker
                id="date"
                placeholder="Select date"
                defaultValue={new Date(data?.date || new Date())}
                onChange={(date: Date | null) =>
                  setValue("date", date ? date.toDateString() : "")
                }
                showClearButton={false}
              />
              {errors.date && (
                <p className="text-red-500 text-sm">
                  {errors.date.message?.toString()}
                </p>
              )}
            </div>
          </div>

          <div className="flex w-full items-center gap-4">
            <div className="flex-1">
              <div className="mb-2 block">
                <Label htmlFor="description" value="Description" />
              </div>
              <Textarea
                id="description"
                placeholder="Enter description"
                rows={4}
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message?.toString()}
                </p>
              )}
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer className="dark:bg-gray-800 bg-white">
          <Button type="submit">Save</Button>
          <Button onClick={() => setClose(false)} color="failure">
            Discard
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default EditTaskModal;
