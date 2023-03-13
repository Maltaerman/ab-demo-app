<script lang="ts" setup>
import { useRoute } from "vue-router";

export interface ITab {
  readonly value: string;
  readonly label: string;
}

export interface IProps {
  readonly tabs: ITab[];
}

withDefaults(defineProps<IProps>(), {
  tabs: (): ITab[] => [],
});

const route = useRoute();
</script>

<template>
  <nav class="flex flex-wrap items-center justify-center border-t">
    <router-link
      v-for="{ value: name, label } in tabs"
      :key="name"
      :class="[
        name === route.name
          ? ' border-t-gray-900 text-gray-900'
          : 'border-transparent text-gray-500 hover:text-gray-700',
        'whitespace-nowrap pt-4 pb-4 px-1 font-medium text-sm transition-all duration-200 border-t',
      ]"
      :to="{ name }"
      :text="label"
    />
  </nav>
</template>
