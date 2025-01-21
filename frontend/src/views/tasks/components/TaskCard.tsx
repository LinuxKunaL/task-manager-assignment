import { Badge, Card, Dropdown } from "flowbite-react";
import { FaClock } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { MdCheck, MdDelete, MdEdit, MdOpenWith, MdRedo } from "react-icons/md";
import { TTask } from "../../../types/task";

type Props = TTask & {
  handleViewTask: (id: number) => void;
  handleEditTask: (id: number) => void;
  handleDeleteTask: (id: number) => void;
  handleCheckTask: (id: number) => void;
};

function TaskCard(props: Props) {
  const lineThrough =
    props.status === "completed" ? "line-through italic opacity-50" : "";
  const isCompleted = props?.status === "completed";

  return (
    <Card
      key={props.id}
      className="bg-white hover:bg-gray-50  hover:dark:bg-gray-800/90  dark:bg-gray-800"
    >
      <div className="flex justify-between w-full sm:flex-row flex-col sm:gap-0 gap-4">
        <div
          className="flex flex-row gap-4 items-center w-full cursor-pointer"
          onClick={() => props.handleViewTask(props.id)}
        >
          <span
            className={`text-sm font-medium text-gray-900 dark:text-gray-400 ${lineThrough}`}
          >
            {new Date(props.createdAt).toLocaleDateString()}
          </span>
          <h5
            className={`text-lg font-semibold tracking-tight text-gray-800 dark:text-gray-200 ${lineThrough}`}
          >
            {props.title}
          </h5>
        </div>
        <div className="flex gap-4 items-center select-none  justify-end">
          <Badge
            color={!isCompleted ? "warning" : "green"}
            icon={!isCompleted ? FaClock : MdCheck}
          >
            {props.status}
          </Badge>
          <Dropdown
            color="dark"
            dismissOnClick={false}
            arrowIcon={false}
            inline
            label={<HiDotsVertical className="text-teal-500" />}
          >
            <Dropdown.Item
              onClick={() => props.handleViewTask(props.id)}
              icon={MdOpenWith}
            >
              Open
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => props.handleCheckTask(props.id)}
              icon={isCompleted ? MdRedo : MdCheck}
            >
              {isCompleted ? "Uncheck" : "check"}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => props.handleEditTask(props.id)}
              icon={MdEdit}
            >
              Edit
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => props.handleDeleteTask(props.id)}
              icon={MdDelete}
              color="red"
              theme={{ icon: "text-red-500 mr-2" }}
            >
              Delete
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    </Card>
  );
}

export default TaskCard;
