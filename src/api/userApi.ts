import Logo from "@/assets/img/Logo.jpeg";
import type { IUser } from "@/types/user";

const user: IUser = {
  id: "user-1-id",
  name: "Eugene",
  age: 24,
  logo: Logo,
};

export function fetchUser(): Promise<IUser> {
  return new Promise((resolve) => setTimeout(() => resolve(user), 1000));
}
