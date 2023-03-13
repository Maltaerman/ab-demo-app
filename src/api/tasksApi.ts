import { isEqual, set } from "date-fns";
import type {
  ITask,
  IFetchTasksPayload,
  ICreateTaskPayload,
  IUpdateTaskPayload,
} from "@/types/tasks";
import type { IListing } from "@/types/listing";
import Ostrov from "@/assets/img/Ostrov.png";
import Flora from "@/assets/img/Flora.png";

/** Fake tasks */
const data: IListing<ITask> = {
  data: [
    {
      id: "task-0-id",
      name: "Task 1",
      isComplted: true,
      description: "Lorem ipsum dolor sit amet.",
      expiredAt: "2020-12-12",
      images: [Ostrov, Flora],
    },
    {
      id: "task-2-id",
      name: "Task 2",
      description: "Lorem ipsum dolor sit amet.",
      isComplted: true,
      expiredAt: "2023-03-13",
      images: [Flora],
    },
    {
      id: "task-3-id",
      name: "Task 3",
      description: "Lorem ipsum dolor sit amet.",
      isComplted: false,
      expiredAt: "2025-12-12",
      images: [],
    },
  ],
  meta: {
    currentPage: 1,
    lastPage: 1,
  },
};

/** Base CRUD imitation  */

export async function fetchTasks(
  payload?: IFetchTasksPayload
): Promise<IListing<ITask>> {
  return new Promise((resolve) =>
    setTimeout(() => {
      if (payload?.isComplted) {
        resolve({
          data: data.data.filter(({ isComplted }) => isComplted),
          meta: data.meta,
        });
      }

      if (payload?.expired === "today") {
        const config = {
          hours: 0,
          minutes: 0,
          seconds: 0,
          milliseconds: 0,
        };
        resolve({
          data: data.data.filter((item) =>
            isEqual(
              set(new Date(), config),
              set(new Date(item.expiredAt), config)
            )
          ),
          meta: data.meta,
        });
      }

      resolve(data);
    }, 1000)
  );
}

export function fetchTask(payload: string): Promise<ITask> {
  return new Promise((resolve) =>
    setTimeout(() => {
      const task: ITask = data.data.find(({ id }) => id === payload) as ITask;
      resolve(task);
    }, 1000)
  );
}

export function createTask(payload: ICreateTaskPayload): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(() => {
      data.data.push({
        id: `task-${new Date().valueOf()}-id`,
        ...payload,
      });
      resolve();
    }, 1000)
  );
}

export function deleteTask(payload: string): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(() => {
      const index: number = data.data.findIndex(({ id }) => id === payload);
      data.data.splice(index, 1);
      resolve();
    }, 1000)
  );
}

export function updateTask(payload: IUpdateTaskPayload): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(() => {
      const index: number = data.data.findIndex(({ id }) => id === payload.id);
      data.data[index] = payload;
      resolve();
    }, 1000)
  );
}
