import axios from 'axios'

export default {
  state: {
    operDay: "",
    scoreItems: [],
    transactions: []
  },
  mutations: {
    setScoreItems(state, payload) {
      state.scoreItems = payload
    },
    updateScoreItems(state, payload) {
      state.scoreItems = state.scoreItems.map((itm) => {
        if (itm.id === payload.id) {
          return payload;
        } else {
          return itm;
        }
      })
    },
    addScoreItems(state, payload) {
      state.scoreItems.push(payload)
    },
    filterScoreItems(state, payload) {
      state.scoreItems = state.scoreItems.filter((v) => v.id !== payload)
    },
    setOperDay(state, payload) {
      state.operDay = payload
    },
    setTransactions(state, payload) {
      state.transactions = payload
    },
    updateTransactions(state, payload) {
      state.transactions = state.transactions.map((itm) => {
        if (itm.id === payload.id) {
          return payload;
        } else {
          return itm;
        }
      })
    },
    addTransactions(state, payload) {
      state.transactions.push(payload)
    },
    filterTransactions(state, payload) {
      state.transactions = state.transactions.filter((v) => v.id !== payload)
    },
  },
  actions: {
    fetchScoreItems(context, val = false) {
      axios
        .get(`http://localhost:3000/OpDate`)
        .then((days) => {
          let lastDay = days.data[days.data.length - 1].OpDate;
          context.commit('setOperDay', val ? val : lastDay)
          axios.get("http://localhost:3000/Acct").then((scores) => {
            axios
              .get(`http://localhost:3000/AcctPos?${scores.data.map((n, index) => `AcctNum[${index}]=${n.AcctNum}`).join('&')}&OpDate=${val ? val : lastDay}`)
              .then(({ data }) => {
                context.commit('setScoreItems', data)
              });
          })
        });
    },
    putScoreItems(context, itmObj) {
      axios
        .put(`http://localhost:3000/AcctPos/${itmObj.id}`, itmObj)
        .then(({ data }) => {
          context.commit('updateScoreItems', data)
        });
    },
    postScoreItems(context, itmObj) {
      axios
        .post(`http://localhost:3000/AcctPos`, itmObj)
        .then(({ data }) => {
          context.commit('addScoreItems', data)
        });
    },
    deleteScoreItems(context, itmObj) {
      axios
        .delete(`http://localhost:3000/AcctPos/${itmObj.id}`)
        .then(() => {
          context.commit('filterScoreItems', itmObj.id)
        });
    },

    fetchTransactions(context, val = '') {
      axios
        .get(`http://localhost:3000/OpEntry?q=${val}`)
        .then(({ data }) => {
          context.commit('setTransactions', data)
        });
    },
    putTransactions(context, itmObj) {
      axios
        .put(`http://localhost:3000/OpEntry/${itmObj.id}`,itmObj)
        .then(({ data }) => {
          context.commit('updateTransactions', data)
        });
    },
    postTransactions(context, itmObj) {
      axios
        .post(`http://localhost:3000/OpEntry`, itmObj)
        .then(({ data }) => {
          context.commit('addTransactions', data)
        });
    },
    deleteTransactions(context, itmObj) {
      axios
        .delete(`http://localhost:3000/OpEntry/${itmObj.id}`)
        .then(() => {
          context.commit('filterTransactions', itmObj.id)
        });
    },
  },
  getters: {
    getScoreItems({ scoreItems }) {
      return scoreItems;
    },
    getOperDay({ operDay }) {
      return operDay;
    },
    getTransactions({ transactions }) {
      return transactions;
    }
  }
}