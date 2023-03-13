import { ref, type Ref, computed } from "vue";
import { defineStore } from "pinia";
import {
  fetchTasks as fetch,
  fetchTask as fetchOne,
  createTask as create,
  updateTask as update,
  deleteTask as remove,
} from "@/api/tasksApi";
import type { IListing } from "@/types/listing";
import type {
  ITask,
  IFetchTasksPayload,
  ICreateTaskPayload,
  IUpdateTaskPayload,
} from "@/types/tasks";

export interface IStore {
  tasks: Ref<IListing<ITask[]>>;
  fetchTasks: (payload?: IFetchTasksPayload) => Promise<void>;
  fetchTask: (payload: string) => Promise<ITask>;
  createTask: (payload: ICreateTaskPayload) => Promise<void>;
  updateTask: (payload: IUpdateTaskPayload) => Promise<void>;
  deleteTask: (payload: string) => Promise<void>;
}

export const useTasksStore = defineStore("tasks", (): IStore => {
  const tasks = ref({
    data: [],
    meta: {
      currentPage: 1,
      lastPage: 1,
    },
  });

  async function fetchTasks(payload: IFetchTasksPayload) {
    tasks.value = await fetch(payload);
  }

  async function fetchTask(id: string) {
    return await fetchOne(id);
  }

  async function createTask(payload: ICreateTaskPayload) {
    await create(payload);
  }

  async function updateTask(payload: IUpdateTaskPayload) {
    return await update(payload);
  }

  async function deleteTask(id: string) {
    await remove(id);
  }

  return {
    tasks,
    fetchTasks,
    fetchTask,
    createTask,
    updateTask,
    deleteTask,
  };
});
