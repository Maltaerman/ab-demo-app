<script lang="ts" setup>
export interface IProps {
  readonly disabled?: boolean;
}

withDefaults(defineProps<IProps>(), {
  disabled: false,
});
</script>

<template>
  <button
    v-bind="{ disabled }"
    class="relative border border-gray-300 rounded-md bg-white text-error py-1.5 px-3"
  >
    <slot />
  </button>
</template>
