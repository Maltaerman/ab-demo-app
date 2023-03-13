export interface ITask {
  readonly id: string;
  readonly name: string;
  readonly isComplted: boolean;
  readonly description: string;
  readonly expiredAt: string;
  readonly images?: (string | File)[];
}

export type TExpired = "today" | "expired" | "all";

export interface IFetchTasksPayload {
  readonly expired?: TExpired;
  readonly isComplted?: boolean;
}

export interface ICreateTaskPayload {
  readonly name: string;
  readonly description: string;
  readonly isComplted: boolean;
  readonly expiredAt: string;
  readonly images?: (string | File)[];
}

export interface IUpdateTaskPayload {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly isComplted: boolean;
  readonly expiredAt: string;
  readonly images: (string | File)[];
}
