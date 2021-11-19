<template>
  <div>
    <Table v-for="item in tableData" :tableData="item" :key="item.title" />
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
      tableData: {
        transactionsData: {
          title: "Проводки",
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
            fetch: "fetchAcctPos",
            fetchField: ["OpDate", "AcctNumDB", "AcctNumCr"],
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
          select: true,
        },
        scoreData: {
          title: "Счета проводок",
          headers: [
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
            item: "getAcctPos",
          },
          search: {
            type: "text",
            label: "Поиск по полям",
          },
          actions: {
            put: "putAcctPos",
            post: "postAcctPos",
            delete: "deleteAcctPos",
          },
          intField: "Balance",
          expand: true,
          select: true,
        },
      },
    };
  },
  computed: {},
  mounted() {
    this.$store.dispatch("fetchTransactions");
  },
};
</script>

<style>
</style>