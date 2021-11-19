<template>
  <v-col :class="makeClass" v-if="checkLabel" >
    <v-text-field
      @input="handleInput"
      :value="inp"
      :label="label"
    ></v-text-field>
  </v-col>
</template>

<script>
export default {
  props: ["value", "label", "classN"],
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
    makeClass() {
      return this.classN ? "col-12" : "col-12 col-md-6 col-sm-4";
    },
    checkLabel() {
      return this.label !== "Действия" && this.label;
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