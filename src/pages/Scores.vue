<template>
  <Table :tableData="tableData" />
</template>

<script>
import Table from "../components/table/Main.vue";
export default {
  components: {
    Table,
  },
  data() {
    return {
      tableData: {
        title: "Счета с остатками на дату",
        headers: [
          {
            text: "Номер счета",
            align: "start",
            sortable: false,
            value: "AcctNum",
          },
          { text: "Остаток", value: "Balance" },
          { text: "Действия", value: "actions", sortable: false },
        ],
        editedItem: {
          AcctNum: "",
          Balance: 0,
        },
        defaultItem: {
          AcctNum: "",
          Balance: 0,
        },
        getter:"getScoreItems",
      },
    };
  },
  computed: {},
  mounted() {
    this.$store.dispatch("fetchScoreItems");
  },
};
</script>

<style>
</style>