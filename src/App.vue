<script lang="ts">
import { defineComponent } from "vue";
import GlobalAlerts from "@/components/ui/GlobalAlerts.vue";
import Loader from "@/components/ui/Loader.vue";
import RouteLayout from "@/layouts/RouteLayout.vue";

export default defineComponent({
  components: {
    GlobalAlerts,
    Loader,
    RouteLayout,
  },
});
</script>

<template>
  <GlobalAlerts>
    <Loader>
      <RouteLayout />
    </Loader>
  </GlobalAlerts>
</template>
