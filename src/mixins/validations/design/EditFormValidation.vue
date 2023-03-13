<script>
const myMixin = {
  data() {
    return {
      errors: {
        name: [],
        code: [],
        images: [],
      },
    };
  },
  methods: {
    setErrors() {
      !this.formData.name && this.errors.name.push("Ім`я обов`язкове.");
      !this.formData.code && this.errors.code.push("Код обов`язковий.");
      !this.formData.images.length &&
        this.errors.images.push("Потрібно принаймні одне зображення.");
    },
    resetErrors() {
      this.errors = {
        name: [],
        code: [],
        images: [],
      };
    },
  },
};

export default myMixin;
</script>
