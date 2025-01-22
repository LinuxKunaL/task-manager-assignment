export type TTask = {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "completed";
  createdAt: Date;
  updatedA: Date;
};
