<script lang="ts" setup>
import { computed } from "vue";

export interface IProps {
  readonly label?: string;
  readonly modelValue?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  type: "text",
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
    <label class="relative inline-flex items-center cursor-pointer">
      <input v-model="model" type="checkbox" class="sr-only peer" />
      <div
        class="w-16 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-10 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-400"
      />
      <span
        v-if="label"
        class="ml-3 text-sm font-medium"
        :class="model ? 'text-primary-400' : 'text-black'"
        v-text="label"
      />
    </label>
  </div>
</template>
