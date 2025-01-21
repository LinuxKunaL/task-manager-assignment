import React from "react";
import {
  Button,
  Datepicker,
  Label,
  Modal,
  Textarea,
  TextInput,
} from "flowbite-react";
import { TTask } from "../../../types/task";

type Props = {
  show: boolean;
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
  data: TTask | null;
};

function EditTaskModal(props: Props) {
  return (
    <Modal
      show={props.show}
      onClose={() => props.setClose(false)}
      className="select-none animate-fade"
    >
      <Modal.Header className="dark:bg-gray-800 bg-white">
        Edit Task
      </Modal.Header>
      <Modal.Body className="dark:bg-gray-800 bg-white gap-3 flex flex-col">
        <div className="flex w-full items-center gap-4">
          <div className="flex-1">
            <div className="mb-2 block bg-">
              <Label htmlFor="title" value="Title" />
            </div>
            <TextInput
              defaultValue={props.data?.title}
              placeholder="Enter title"
              id="title"
              required
            />
          </div>
          <div className="flex-1">
            <div className="mb-2 block">
              <Label htmlFor="date" value="Date" />
            </div>
            <Datepicker
              defaultValue={new Date(props.data?.createdAt as Date)}
              placeholder="Select date"
              language="en"
            />
          </div>
        </div>
        <div className="flex w-full items-center gap-4">
          <div className="flex-1">
            <div className="mb-2 block">
              <Label htmlFor="Description" value="Description" />
            </div>
            <Textarea
              defaultValue={props.data?.description}
              placeholder="Enter Description"
              id="Description"
              required
              rows={4}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="dark:bg-gray-800 bg-white">
        <Button>Save</Button>
        <Button onClick={() => props.setClose(false)} color="failure">
          Discard
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditTaskModal;
