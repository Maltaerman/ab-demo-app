<script lang="ts" setup>
import { computed } from "vue";

export interface IProps {
  readonly modelValue: string;
  readonly disabled: boolean;
  readonly placeholder: string;
  readonly errors: string[];
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: "",
  disabled: false,
  placeholder: '',
  errors: (): string[] => [],
});

const emits = defineEmits<{ (e: "update:modelValue", value: string): void }>();

const model = computed({
  get: (): string => props.modelValue,
  set: (value: string): void => emits("update:modelValue", value),
});
</script>

<template>
  <div>
    <div class="mt-1 relative rounded-md" :class="label ? 'mt-1' : 'mt-0'">
      <textarea
        v-model="model"
        v-bind="{ id, name, disabled, placeholder }"
        style="max-height: 300px"
        class="block w-full rounded-md px-3 py-2 border border-gray-200"
      />
    </div>

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
