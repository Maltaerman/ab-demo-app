<script lang="ts" setup>
import { ref, watch, provide, computed } from "vue";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";

export interface IProps {
  readonly id: string;
  readonly message: string;
  readonly delay: number;
}

const props: IProps = withDefaults(defineProps<IProps>(), {
  id: "",
  message: "",
  delay: 0,
});

const t = ref(props.delay);
const interval = setInterval((): number => (t.value -= 1), 1000);

const position = computed(
  () => `${100 - Math.floor((100 * t.value) / props.delay)}%`
);

const emits = defineEmits<{ (e: "delete"): void }>();

watch(t, (value) => {
  value <= 0 && clearInterval(interval);
  value === 0 && emits("delete");
});
</script>

<template>
  <div class="p-2 border rounded flex flex-col">
    <div
      class="absolute top-0 left-0 h-1 bg-primary-900 rounded"
      :style="`width: ${position}; transition: all 1s;`"
    />

    <div class="flex flex-row items-start justify-between">
      <p class="text-white" v-text="message" />
      <button type="button" class="text-white p-1" @click="$emit('delete')">
        <DeleteIcon fill="red" />
      </button>
    </div>
  </div>
</template>
