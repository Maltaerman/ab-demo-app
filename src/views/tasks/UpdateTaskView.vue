<script setup lang="ts">
import { ref, type Ref, inject, type InjectionKey, watchEffect } from "vue";
import EditForm, { type IFormData } from "@/components/tasks/EditForm.vue";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton.vue";
import { useRoute, useRouter, type RouteComponent } from "vue-router";
import { useTasksStore } from "@/stores/tasks";
import type { ITask } from "@/types/tasks";
import {
  setLoader as setLoaderInjectionKey,
  addAlert as addAlertInjectionKey,
} from "@/types/injectionKeys";

const route = useRoute();
const router = useRouter();

const store = useTasksStore();

const isLoading = ref(false);
const value: Ref<null | ITask> = ref(null);

const setLoader = inject(setLoaderInjectionKey, () => {});
const addAlert = inject(addAlertInjectionKey, () => {});

watchEffect(async () => {
  try {
    isLoading.value = true;
    setLoader(true);
    value.value = await store.fetchTask(route.params.id as string);
  } finally {
    isLoading.value = false;
    setLoader(false);
  }
});

async function updateTask(formData: IFormData) {
  try {
    isLoading.value = true;
    setLoader(true);
    await store.updateTask({
      id: route.params.id as string,
      ...formData,
    });
    router.push({
      name: "Tasks",
    });
    addAlert({
      message: "Task data has been successfully updated.",
      delay: 3,
    });
  } finally {
    isLoading.value = false;
    setLoader(false);
  }
}

async function deleteTask(id: string) {
  try {
    isLoading.value = true;
    setLoader(true);
    await store.deleteTask(route.params.id as string);
    router.push({
      name: "Tasks",
    });
    addAlert({
      message: "Task has been delete.",
      delay: 3,
    });
  } finally {
    isLoading.value = false;
    setLoader(false);
  }
}
</script>

<template>
  <EditForm
    @submit="updateTask"
    v-bind="{ disabled: isLoading, value }"
    @delete="deleteTask"
  />
</template>
