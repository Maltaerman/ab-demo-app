<script lang="ts" setup>
import { ref, type Ref, computed, defineComponent, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { cloneDeep } from "lodash";
import Toggle from "@/components/ui/Toggle.vue";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton.vue";
import SecondaryButton from "@/components/ui/buttons/SecondaryButton.vue";
import Input from "@/components/ui/inputs/Input.vue";
import Textarea from "@/components/ui/Textarea.vue";
import ImagePicker from "@/components/ui/ImagePicker.vue";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon.vue";
import ImageIcon from "@/components/icons/ImageIcon.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";
import { mapState } from "pinia";
import { useTasksStore } from "@/stores/tasks";
import Validation from "@/mixins/validations/design/EditFormValidation.vue";

export interface IFormData {
  name: string;
  description: string;
  isComplted: boolean;
  expiredAt: string;
  images: (string | File)[];
}

export interface IErrors {
  name: string[];
  description: string[];
  expiredAt: string[];
  images: string[];
}

export interface IProps {
  readonly value?: IFormData;
}

const props = withDefaults(defineProps<IProps>(), {});

const formData: Ref<IFormData> = ref({
  name: "",
  description: "",
  images: [],
});

const isValid = computed(() => {
  const { name, code, images } = formData.value;
  return name && code && images[0];
});

const emits = defineEmits<{ (e: "submit", value: IFormData): void }>();

function getSrc(file: File | string) {
  if (typeof file === "string") return file;
  return file ? URL.createObjectURL(file) : "";
}

const errors = ref({
  name: [],
  description: [],
  images: [],
});

function submit() {
  // resetErrors();
  if (isValid) {
    emits("submit", formData.value);
  } else {
    // setErrors();
  }
}

watchEffect(() => {
  if (props.value) {
    formData.value = cloneDeep(props.value);
  }
});
</script>

<template>
  <form @submit.prevent="submit">
    <div
      class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6"
    >
      <div class="flex flex-wrap">
        <router-link :to="{ name: 'Tasks' }">
          <ArrowLeftIcon width="24" height="24" class="mr-2 sm:mr-16" />
        </router-link>
        <Toggle
          v-model="formData.isComplted"
          class="w-20"
          v-bind="{
            label: formData.isComplted ? 'Completed' : 'Incompleted',
          }"
        />
      </div>
      <div class="flex flex-row">
        <SecondaryButton
          type="button"
          v-bind="{ disabled }"
          class="mr-2"
          @click="$emit('delete')"
        >
          Delete
        </SecondaryButton>
        <PrimaryButton type="submit" v-bind="{ disabled }">
          Save and exit
        </PrimaryButton>
      </div>
    </div>

    <div class="grid grid-cols-6 gap-1" style="max-width: 600px">
      <div
        class="col-start-1 col-end-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-6 gap-2"
      >
        <div
          v-for="(image, key) in formData.images"
          :key="image.name"
          class="relative group"
        >
          <img
            :src="getSrc(formData.images[key])"
            alt=""
            class="rounded-sm cursor-pointer"
          />
          <button
            type="button"
            class="hidden group-hover:block absolute right-2 bottom-2 p-2 rounded"
            style="background-color: rgba(0, 0, 0, 0.5)"
            @click="formData.images.splice(key, 1)"
          >
            <DeleteIcon fill="white" />
          </button>
        </div>

        <ImagePicker
          @update:modelValue="(image) => formData.images.push(image)"
          v-bind="{ showErrors: false }"
          style="min-height: 120px; height: 100%"
        >
          <PlusIcon
            v-if="!formData.images.length"
            class="h-full"
            @update:modelValue="(image) => formData.images.push(image)"
          />
          <ImageIcon v-else width="60px" heigth="48px" class="h-full" />
        </ImagePicker>
      </div>

      <Input
        v-model="formData.name"
        v-bind="{
          placeholder: 'Task name',
          errors: errors.name,
        }"
        class="col-start-1 col-end-7"
      />

      <Textarea
        v-model="formData.description"
        v-bind="{
          placeholder: 'Task description',
          errors: errors.description,
        }"
        class="col-start-1 col-end-7"
      />

      <Input
        v-model="formData.expiredAt"
        v-bind="{
          placeholder: '11.11.12',
          errors: errors.name,
          type: 'date',
        }"
        class="col-start-1 col-end-7"
      />

      <div v-if="formData.images.length" class="col-start-1 col-end-7">
        <div
          v-for="image in formData.images"
          :key="image.name"
          class="w-full bg-gray-50 mb-2 p-2 flex flex-row justify-between items-center"
        >
          <div class="flex flex-row items-center">
            <ImageIcon class="mr-2 text-gray-600" width="16" height="16" />
            <p class="text-primary-400" v-text="image.name" />
          </div>

          <button type="button" @click="formData.images.splice(key, 1)">
            <DeleteIcon fill="red" />
          </button>
        </div>
      </div>

      <ImagePicker
        class="col-start-1 col-end-7"
        v-bind="{
          errors: errors.images,
        }"
        @update:modelValue="(image) => formData.images.push(image)"
      />
    </div>
  </form>
</template>
