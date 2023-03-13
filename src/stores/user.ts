import { ref, type Ref } from "vue";
import { defineStore } from "pinia";
import { fetchUser as fetch } from "@/api/userApi";
import type { IUser } from "@/types/user";
import Logo from "@/assets/img/Logo.jpeg";

export interface IStore {
  user: Ref<IUser>;
  fetchUser: () => Promise<IUser>;
}

export const useUserStore = defineStore("user", (): IStore => {
  const user: Ref<IUser> = ref(null);

  async function fetchUser(): Promise<IUser> {
    user.value = await fetch();
    return user.value;
  }

  return { user, fetchUser };
});
