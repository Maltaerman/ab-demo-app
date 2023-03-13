<script setup lang="ts">
import CheckIcon from "@/components/icons/CheckIcon.vue";

export interface IProps {
  readonly name: string;
  readonly description: string;
  readonly expiredAt: string;
  readonly isComplted: boolean;
  readonly images: (string | File)[];
}

const props = withDefaults(defineProps<IProps>(), {
  name: "",
  description: "",
  expiredAt: "",
  isComplted: false,
  images: () => [],
});

function getSrc(file: File | string) {
  if (typeof file === "string") return file;
  return URL.createObjectURL(file);
}
</script>

<template>
  <div class="border border-gray-200 rounded dark:border-gray-700 p-4">
    <span
      class="font-bold tracking-tight text-gray-900 dark:text-white flex justify-between items-center"
    >
      {{ name }}
      <CheckIcon v-if="isComplted" class="text-primary-400" />
    </span>

    <p class="font-normal mb-2 text-gray-700">
      {{ description }} <br />
      {{ `Expired at: ${expiredAt}` }} <br />
      <span
        class="flex justify-end items-center"
        :class="isComplted ? 'text-primary-400' : 'text-red-400'"
        v-text="isComplted ? 'Completed' : 'Incompleted'"
      />
    </p>

    <div class="flex flex-wrap">
      <img
        v-for="(image, key) in images"
        :key="key"
        :src="getSrc(image)"
        class="rounded w-12 h-12 mr-2"
      />
    </div>
  </div>
</template>
