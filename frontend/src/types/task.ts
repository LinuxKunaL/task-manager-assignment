export type TTask = {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "completed";
  date: string;
  updatedAt: string;
};

export type TEditTask = {
  title: string;
  date: string;
  description: string;
}

export type TTaskForm = {
  title: string;
  date: string;
  description: string;
};