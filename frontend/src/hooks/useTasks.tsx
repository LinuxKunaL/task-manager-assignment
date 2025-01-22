import api from "../app/api";
import { TEditTask, TTaskForm } from "../types/task";

function useTasks() {
  const getTasks = async () => {
    const result = await api.get("/task");
    if (result.data.error) {
      return { error: result.data.error };
    }
    return result.data;
  };

  const deleteTask = async (id: string) => {
    const result = await api.delete("/task", { params: { id } });
    if (result.data.error) {
      return { error: result.data.error };
    }
    return result.data;
  };

  const checkTask = async (id: string) => {
    const result = await api.post("/task", { id });
    if (result.data.error) {
      return { error: result.data.error };
    }
    return result.data;
  };

  const updateTask = async (id: string, data: TEditTask) => {
    const result = await api.patch("/task", { id, data });
    if (result.data.error) {
      return { error: result.data.error };
    }
    return result.data;
  };

  const addTask = async (data: TTaskForm) => {
    const result = await api.put("/task", data);
    if (result.data.error) {
      return { error: result.data.error };
    }
    return result.data;
  };

  return {
    addTask,
    getTasks,
    checkTask,
    deleteTask,
    updateTask,
  };
}

export default useTasks;
