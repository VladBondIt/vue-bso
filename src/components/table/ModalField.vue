<template>
  <v-col v-if="checkLabel" cols="12" sm="6" md="4">
    <v-text-field @input="handleInput" :value="inp" :label="label"></v-text-field>
  </v-col>
</template>

<script>
export default {
  props: ["value", "label"],
  data() {
    return {
      inp: this.value,
    };
  },
  methods: {
    // Через v-modal работает не правильно
    handleInput(val) {
      this.$emit("input", val);
    },
  },
  computed: {
    checkLabel() {
      return this.label !== 'Действия' && this.label;
    },
  },
  watch: {
    value: function (newValue) {
      this.inp = newValue;
    },
  },
};
</script>

<style>
</style>