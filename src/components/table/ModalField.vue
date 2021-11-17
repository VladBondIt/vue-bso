<template>
  <v-col v-if="label !== 'Действия'" cols="12" sm="6" md="4">
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
    handleInput(val) {
      this.$emit("input", val);
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