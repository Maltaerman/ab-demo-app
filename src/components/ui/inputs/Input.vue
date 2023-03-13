<script lang="ts" setup>
import { computed } from "vue";

export type TInputType = "text" | "email" | "date";

export interface IProps {
  readonly type?: TInputType;
  readonly disabled?: boolean;
  readonly errors?: string[];
  readonly modelValue?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  type: "text",
  disabled: false,
  errors: (): string[] => [],
  modelValue: "",
});

const emits = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();

const model = computed({
  get: (): string => props.modelValue,
  set: (value: string): void => emits("update:modelValue", value),
});
</script>

<template>
  <div>
    <input
      v-model="model"
      v-bind="{
        ...$attrs,
        type,
        autocomplete: 'off',
      }"
      class="block w-full rounded-md px-3 py-2 border border-gray-200"
    />

    <div class="mt-1 relative" style="min-height: 20px">
      <transition
        enter-active-class="transition ease-in"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition ease-in-out"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <p
          v-if="errors.length"
          class="text-sm text-red-500"
          v-text="errors[0]"
        />
      </transition>
    </div>
  </div>
</template>
