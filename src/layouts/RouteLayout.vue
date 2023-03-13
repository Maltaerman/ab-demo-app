<script lang="ts" setup>
import { shallowRef, defineAsyncComponent, watch } from "vue";
import { useRoute } from "vue-router";

import { Namespace, type TNamespace } from "./types";

const route = useRoute();

const layout = shallowRef(null);

const setLayout = async (namespace: TNamespace): Promise<void> => {
  layout.value = await defineAsyncComponent(
    (): Promise<any> => import(`@/layouts/default/Layout.vue`)
  );
};

watch(
  () => route.meta?.layout,
  (): Promise<void> => setLayout(route.meta?.layout || Namespace.Default),
  {
    immediate: true,
  }
);
</script>

<template>
  <component :is="layout" />
</template>
