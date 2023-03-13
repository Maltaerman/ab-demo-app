<script lang="ts" setup>
import { defineComponent, ref, inject } from "vue";
import EditForm, { type IFormData } from "@/components/tasks/EditForm.vue";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton.vue";
import { useRoute, useRouter } from "vue-router";
import { useTasksStore } from "@/stores/tasks";
import {
  setLoader as setLoaderInjectionKey,
  addAlert as addAlertInjectionKey,
} from "@/types/injectionKeys";

const route = useRoute();
const router = useRouter();

const store = useTasksStore();

const isLoading = ref(false);

const setLoader = inject(setLoaderInjectionKey, () => {});
const addAlert = inject(addAlertInjectionKey, () => {});

async function createTask(formData: IFormData) {
  try {
    isLoading.value = true;
    setLoader(true);
    await store.createTask(formData);
    router.push({
      name: "Tasks",
    });
    addAlert({
      message: "New task has been successfully created.",
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
    @submit="createTask"
    v-bind="{ disabled: isLoading }"
    @delete="
      addAlert({
        message: 'You need to create a task at first',
        delay: 3,
      })
    "
  />
</template>
