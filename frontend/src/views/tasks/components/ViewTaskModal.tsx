import { Badge, Modal, Tooltip } from "flowbite-react";
import { FaClock } from "react-icons/fa";
import { MdCheck, MdDelete, MdEdit, MdRedo } from "react-icons/md";
import Hr from "../../../components/interface/Hr";

import { TTask } from "../../../types/task";

type Props = {
  openModal: boolean;
  setOpenModal: (param: boolean) => void;
  data: TTask | null;
  actions: {
    handleEditTask: (id: string) => void;
    handleDeleteTask: (id: string) => void;
    handleCheckTask: (id: string) => void;
  };
};

function ViewTaskModal(props: Props) {
  const isCompleted = props.data?.status === "completed";

  return (
    <Modal show={props.openModal} onClose={() => props.setOpenModal(false)}>
      <Modal.Header className="dark:bg-gray-800 bg-white">
        <div className="flex justify-between gap-3 items-center">
          <div className="flex flex-col gap-2">
            <p className="text-lg ">
              {new Date(props.data?.date as string).toDateString()}
            </p>
            {props.data?.updatedAt && (
              <p className="text-xs flex gap-1 text-gray-400">
                Update at :{" "}
                <p className="text-teal-400"> {props.data?.updatedAt}</p>
              </p>
            )}
          </div>

          <Hr />
          <Badge
            color={!isCompleted ? "warning" : "green"}
            icon={!isCompleted ? FaClock : MdCheck}
          >
            {props.data?.status}
          </Badge>
          <Hr />
          <Tooltip
            content={isCompleted ? "Uncheck task" : "Check task"}
            className="font-normal"
          >
            {isCompleted ? (
              <MdRedo
                onClick={() =>
                  props.actions.handleCheckTask(props.data?._id as string)
                }
                className="h-5 w-5 cursor-pointer"
              />
            ) : (
              <MdCheck
                onClick={() =>
                  props.actions.handleCheckTask(props.data?._id as string)
                }
                className="h-5 w-5 cursor-pointer"
              />
            )}
          </Tooltip>
          <Tooltip content="Edit task" className="font-normal">
            <MdEdit
              onClick={() =>
                props.actions.handleEditTask(props.data?._id as string)
              }
              className="h-5 w-5 cursor-pointer"
            />
          </Tooltip>
          <Tooltip content="Delete task" className="font-normal">
            <MdDelete
              onClick={() =>
                props.actions.handleDeleteTask(props.data?._id as string)
              }
              className="h-5 w-5 cursor-pointer text-red-500"
            />
          </Tooltip>
        </div>
      </Modal.Header>
      <Modal.Body className="dark:bg-gray-800 bg-white">
        <div className="space-y-6">
          <h1 className="text-xl font-medium dark:text-gray-100 text-gray-800 ">
            {props.data?.title}
          </h1>
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            {props.data?.description}
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ViewTaskModal;
