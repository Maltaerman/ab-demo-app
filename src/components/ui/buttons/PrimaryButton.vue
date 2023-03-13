<script lang="ts" setup>
export type TButtonType = "button" | "submit";

export interface IProps {
  readonly type?: TButtonType;
  readonly disabled?: boolean;
}

withDefaults(defineProps<IProps>(), {
  type: "button",
  disabled: false,
});
</script>

<template>
  <button
    v-bind="{ type, disabled }"
    class="relative border rounded-md bg-primary-400 text-white py-1.5 px-3"
    style="border-color: rgba(0, 0, 0, 0.2)"
  >
    <slot />
  </button>
</template>
