<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    showErrors: {
      type: Boolean,
      default: true,
    },
    errors: {
      type: Array as () => string[],
      default: (): string[] => [],
    },
  },
  data: () => ({
    model: null,
    isValidFormat: true,
    availableFormats: ["image/gif", "image/jpeg", "image/svg+xml", "image/png"],
  }),
  emits: ["update:modelValue"],
  methods: {
    chooseImage() {
      document.getElementById("image-picker").click();
    },
    setImage(files: any): void {
      if (files && files[0]) {
        this.isValidFormat = this.availableFormats.some(
          (format: string): boolean => format === files[0]?.type
        );
      }
      if (this.isValidFormat) {
        this.model = files[0];
        this.$emit("update:modelValue", this.model);
      } else {
        this.model = null;
        this.$emit("update:modelValue", this.model);
      }
    },
  },
});
</script>

<template>
  <div class="flex flex-col items-center">
    <div
      class="border bortder-2 border-dashed w-full flex items-center justify-center h-full"
    >
      <input
        id="image-picker"
        type="file"
        class="file-input border bortder-2 border-dashed p-2 w-full"
        @change="(event) => setImage(event.target.files)"
      />
      <slot>
        <p class="p-2">
          Drag the file or
          <span class="text-primary-400">choose from your pc</span>
        </p>
      </slot>
    </div>

    <div
      v-if="showErrors"
      class="mt-1 relative flex-1 w-full"
      style="min-height: 20px"
    >
      <transition
        enter-active-class="transition ease-in"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition ease-in-out"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <p
          v-if="errors[0] || !isValidFormat"
          class="text-sm text-red-500 w-full"
          v-text="
            (() => {
              if (!isValidFormat) return 'invalidImageFormat';
              return errors[0];
            })()
          "
        />
      </transition>
    </div>
  </div>
</template>

<style scoped>
.file-input {
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 1;
  cursor: pointer;
}
</style>
