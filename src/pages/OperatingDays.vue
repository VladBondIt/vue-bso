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
        operDaysData: {
          title: "Операционные дни",
          headers: [
            {
              text: "Дата операционного дня",
              align: "start",
              value: "OpDate",
            },
            { text: "Действия", value: "actions", sortable: false },
            { text: "", value: "data-table-expand", sortable: false },
          ],
          fieldClass: true,
          editedItem: {
            OpDate: "",
          },
          defaultItem: {
            OpDate: "",
          },
          getters: {
            item: "getOperDays",
          },
          search: {
            type: "text",
            label: "Выберите дату опер дня",
          },
          actions: {
            fetch: "fetchTransactions",
            fetchField: "OpDate",
            put: "putOpDate",
            post: "postOpDate",
            delete: "deleteOpDate",
          },
          expand: true,
          select: true,
        },
        transactionsData: {
          title: "Проводки операционного дня",
          headers: [
            {
              text: "Дата операционного дня",
              align: "start",
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
    this.$store.dispatch("fetchOpDate");
    this.$store.dispatch("fetchTransactions");
  },
};
</script>

<style>
</style>