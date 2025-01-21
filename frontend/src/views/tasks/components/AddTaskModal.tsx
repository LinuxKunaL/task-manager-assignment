import React from "react";
import {
  Button,
  Datepicker,
  Label,
  Modal,
  Select,
  Textarea,
  TextInput,
} from "flowbite-react";

type Props = {
  openAddTask: boolean;
  setOpenAddTask: React.Dispatch<React.SetStateAction<boolean>>;
};

function AddTaskModal(props: Props) {
  return (
    <Modal
      show={props.openAddTask}
      onClose={() => props.setOpenAddTask(false)}
      className="select-none animate-fade"
    >
      <Modal.Header className="dark:bg-gray-800 bg-white">
        Add Task
      </Modal.Header>
      <Modal.Body className="dark:bg-gray-800 bg-white gap-3 flex flex-col">
        <div className="flex w-full items-center gap-4">
          <div className="flex-1">
            <div className="mb-2 block bg-">
              <Label htmlFor="title" value="Title" />
            </div>
            <TextInput id="title" placeholder="Enter title" required />
          </div>
          <div className="flex-1">
            <div className="mb-2 block">
              <Label htmlFor="date" value="Date" />
            </div>
            <Datepicker placeholder="Select date" language="en" />
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
              required
            />
          </div>
        </div>
        <div className="flex w-full items-center gap-4">
          <div className="flex-1">
            <div className="mb-2 block">
              <Label htmlFor="Priority" value="Priority" />
            </div>
            <Select id="Priority" required>
              <option>High Priority</option>
              <option>Low Priority</option>
              <option>No Priority</option>
            </Select>
          </div>
          <div className="flex-1">
            <div className="mb-2 block">
              <Label htmlFor="date" value="Status" />
            </div>
            <Select id="Priority" required>
              <option>In Progress</option>
              <option>Completed</option>
            </Select>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="dark:bg-gray-800 bg-white">
        <Button>Save</Button>
        <Button onClick={() => props.setOpenAddTask(false)} color="failure">
          Discard
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddTaskModal;
