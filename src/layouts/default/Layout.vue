<script lang="ts">
import { defineComponent } from "vue";
import Sidebar from "./Sidebar.vue";

export default defineComponent({
  components: {
    Sidebar,
  },
});
</script>

<template>
  <div class="min-h-screen h-max flex flex-row">
    <Sidebar class="bg-primary-400 p-2" />

    <main class="flex-grow mx-auto w-full flex flex-col min-h-screen h-max">
      <router-view class="min-h-screen h-max p-2 md:p-4" />
    </main>
  </div>
</template>
