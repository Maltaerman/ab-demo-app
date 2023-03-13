<script lang="ts">
import { defineComponent, shallowRef, defineAsyncComponent } from "vue";

import LogoIcon from "@/components/icons/LogoIcon.vue";

export default defineComponent({
  components: {
    LogoIcon,
  },
});
</script>

<template>
  <div class="flex flex-col items-center justify-start">
    <LogoIcon class="mt-2" />
  </div>
</template>
