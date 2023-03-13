<script setup lang="ts">
import { ref, computed, watchEffect, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton.vue";
import Tabs from "@/components/ui/Tabs.vue";
import ListItem from "@/components/tasks/ListItem.vue";
import { useUserStore } from "@/stores/user";
import { useTasksStore } from "@/stores/tasks";
import { setLoader as setLoaderInjectionKey } from "@/types/injectionKeys";

const store = useTasksStore();
const userStore = useUserStore();

const route = useRoute();
const router = useRouter();

const user = computed(() => userStore.user);
const tasks = computed(() => store.tasks.data);

const setLoader = inject(setLoaderInjectionKey, () => {});

const tabs = computed(() => [
  {
    value: "Tasks",
    label: "All tasks",
  },
  {
    value: "ExpiringToday",
    label: "Expiring today",
  },
  {
    value: "CompletedTasks",
    label: "Completed tasks",
  },
]);

watchEffect(async () => {
  try {
    setLoader(true);
    await userStore.fetchUser();
  } finally {
    setLoader(false);
  }
});

watchEffect(async () => {
  try {
    setLoader(true);
    await store.fetchTasks(route.meta);
  } finally {
    setLoader(false);
  }
});
</script>

<template>
  <div>
    <header class="flex justify-center items-center w-full flex-1">
      <img
        class="w-20 h-20 md:w-36 md:h-36 rounded-full border-2 border-primary-400 p-1"
        :src="user?.logo || ''"
      />
      <div class="ml-6">
        <div class="flex flex-col md:flex-row items-center justify-between">
          <h2
            class="text-3xl inline-block font-light"
            v-text="`${user?.name || ''} ${user?.age || ''}`"
          />
          <PrimaryButton
            class="w-full mt-2 md:mt-0 md:w-max"
            @click="
              router.push({
                name: 'CreateTask',
              })
            "
          >
            Add a task
          </PrimaryButton>
        </div>
        <div class="hidden md:block">
          <span
            class="font-semibold"
            v-text="`${user?.name || ''} task list`"
          />
          <p v-text="'Lorem ipsum dolor sit amet consectetur'" />
        </div>
      </div>
    </header>

    <Tabs class="md:space-x-4 my-4" v-bind="{ tabs }" />

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
    >
      <div
        v-for="{ id, ...props } in tasks"
        :key="id"
        class="flex items-center justify-center"
      >
        <ListItem
          class="h-full w-full cursor-pointer"
          v-bind="props"
          @click="
            router.push({
              name: 'EditTask',
              params: { id },
            })
          "
        />
      </div>
    </div>
  </div>
</template>
