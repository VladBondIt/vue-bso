<template>
  <div>
    <Table v-for="item in data" :tableData="item" :key="item.title" />
  </div>
</template>

<script>
import Table from "../components/table/Main.vue";
export default {
  components: {
    Table,
  },
  data() {
    return {
      data: {
        scoreTableData: {
          title: "Счета с остатками на дату",
          headers: [
            {
              text: "Дата операционного дня",
              align: "start",
              value: "OpDate",
            },
            { text: "Номер счета", value: "AcctNum" },
            { text: "Остаток", value: "Balance" },
            { text: "Действия", value: "actions", sortable: false },
            { text: "", value: "data-table-expand", sortable: false },
          ],
          editedItem: {
            OpDate: "",
            AcctNum: 0,
            Balance: 0,
          },
          defaultItem: {
            OpDate: "",
            AcctNum: 0,
            Balance: 0,
          },
          getters: {
            item: "getScoreItems",
            search: "getOperDay",
          },
          search: {
            type: "date",
            label: "Выберите дату опер дня",
          },
          actions: {
            fetch: "fetchTransactions",
            delete: "deleteScoreItems",
            post: "postScoreItems",
            put: "putScoreItems",
          },
          intField: "Balance",
          expand: true,
          select: true,
        },
        transactTableData: {
          title: "Проводки по счету",
          headers: [
            {
              text: "Дата операционного дня",
              align: "start",
              // sortable: false,
              value: "OpDate",
            },
            { text: "Счет дебета", value: "AcctNumDB" },
            { text: "Счет кредита", value: "AcctNumCr" },
            { text: "Сумма", value: "Amount" },
            { text: "Действия", value: "actions", sortable: false },
            { text: "", value: "data-table-expand", sortable: false },
          ],
          editedItem: {
            OpDate: "",
            AcctNumDB: 0,
            AcctNumCr: 0,
            Amount: 0,
          },
          defaultItem: {
            OpDate: "",
            AcctNumDB: 0,
            AcctNumCr: 0,
            Amount: 0,
          },
          getters: {
            item: "getTransactions",
          },
          actions: {
            delete: "deleteTransactions",
            post: "postTransactions",
            put: "putTransactions",
          },
          search: {
            type: "text",
            label: "Поиск по полям",
          },
          intField: "Amount",
          expand: true,
          select: false,
        },
      },
    };
  },
  computed: {},
  mounted() {
    this.$store.dispatch("fetchScoreItems");
    this.$store.dispatch("fetchTransactions");
  },
};
</script>

<style>
</style>