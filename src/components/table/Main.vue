<template>
  <v-data-table
    @input="handleSelect"
    :headers="tableData.headers"
    :items="$store.getters[tableData.getters.item]"
    :search="search"
    :single-expand="true"
    :expanded.sync="expanded"
    :single-select="true"
    item-key="id"
    :show-expand="tableData.expand"
    :show-select="tableData.select"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>{{ tableData.title }}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-card-title>
          <DatePicker
            v-if="tableData.search.type === 'date'"
            :getter="tableData.getters.search"
            :label="tableData.search.label"
          />
          <v-text-field
            v-else
            v-model="search"
            append-icon="mdi-magnify"
            :label="tableData.search.label"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Добавить
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <ModalField
                    v-for="{ text, value } in tableData.headers"
                    :key="text"
                    :label="text"
                    :classN="tableData.fieldClass"
                    v-model="tableData.editedItem[value]"
                  />
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Отменить
              </v-btn>
              <v-btn color="blue darken-1" text @click="save">
                Сохранить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Вы хотите удалить пункт?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Отменить</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">More info about {{ item }}</td>
    </template>
    <!-- <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Сбросить </v-btn>
    </template> -->
  </v-data-table>
</template>

<script>
import ModalField from "./ModalField.vue";
import DatePicker from "./DatePicker.vue";
export default {
  components: {
    ModalField,
    DatePicker,
  },
  props: ["tableData"],
  data: () => ({
    selected: [],
    expanded: [],
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu: false,
    search: "",
    dialog: false,
    dialogDelete: false,
    editedIndex: 1,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === 1 ? "Добавить пункт" : "Изменить пункт";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {},

  methods: {
    handleSelect(val) {
      const field = this.tableData.actions.fetchField;
      this.$store.dispatch(
        this.tableData.actions.fetch,
        val.length
          ? Array.isArray(field)
            ? field.map((f) => val[0][f])
            : val[0][field]
          : ""
      );
    },
    editItem(item) {
      this.editedIndex = -1;
      this.tableData.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.tableData.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.$store.dispatch(
        this.tableData.actions.delete,
        this.tableData.editedItem
      );
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.tableData.editedItem = Object.assign(
          {},
          this.tableData.defaultItem
        );
        this.editedIndex = 1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.tableData.editedItem = Object.assign(
          {},
          this.tableData.defaultItem
        );
        this.editedIndex = 1;
      });
    },

    save() {
      let tempObj = {};
      tempObj = this.tableData.intField
        ? {
            ...this.tableData.editedItem,
            [this.tableData.intField]:
              +this.tableData.editedItem[this.tableData.intField],
          }
        : this.tableData.editedItem;

      if (this.editedIndex > -1) {
        this.$store.dispatch(this.tableData.actions.post, {
          ...tempObj,
          id: Date.now(),
        });
      } else {
        this.$store.dispatch(this.tableData.actions.put, tempObj);
      }
      this.close();
    },
  },
};
</script>

<style>
</style>