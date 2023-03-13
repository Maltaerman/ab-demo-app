<script lang="ts" setup>
import { ref, type Ref, provide, computed } from "vue";
import Alert from "@/components/ui/Alert.vue";

export interface IAlert {
  message: string;
  id?: string;
  delay?: number;
}

export interface IAddAlertPayload extends IAlert {}

export interface IData {
  alerts: IAlert[];
  refs: Ref[];
  margin: number;
}

const alerts: Ref<IAlert[]> = ref([
  {
    id: "initial-message-id",
    message: `Hi. I hope your will enjoy this work.`,
    delay: 16,
  },
]);

/** Array of alert refs */
const refs = ref([]);

/** Alert margin */
const margin = 12;

/** Array of positions for each alert */
const positions = computed((): number[] => {
  /** Height of each alert*/
  const heights: number[] = refs.value.map(
    (item: any): number => item?.alert?.getBoundingClientRect()?.height || 0
  );

  return heights.map((_: number, key: number): number => {
    let position = margin;
    heights
      .filter((_: number, subKey: number): boolean => key > subKey)
      .forEach((height: number): number => (position += height + margin));

    return Math.floor(position);
  });
});

const setItemRef = (el: any, key: number): void => (refs.value[key] = el);

function deleteAlert(index: number): void {
  alerts.value.splice(index, 1);
  refs.value.splice(index, 1);
}

function addAlert(payload: IAddAlertPayload): void {
  alerts.value.push({
    ...payload,
    id: payload.id || `${alerts.value.length}-${Date.now()}`,
  });
}

provide("addAlert", addAlert);
</script>

<template>
  <transition-group
    leave-active-class="transform-gpu"
    leave-class="opacity-100"
    leave-to-class="opacity-0"
    enter-active-class="transform-gpu"
    enter-class="opacity-0"
    enter-to-class="opacity-100"
    tag="div"
  >
    <Alert
      v-for="({ id, message, delay }, key) in alerts"
      :key="id"
      :ref="(el) => setItemRef(el, key)"
      class="absolute z-40 transition-all duration-300 w-11/12 left-1/2 transform -translate-x-1/2 bg-primary-400"
      :style="`top: ${positions[key]}px;`"
      v-bind="{
        message,
        delay,
      }"
      @delete="deleteAlert(id)"
    />
  </transition-group>
  <div></div>
  <slot />
</template>
