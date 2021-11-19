import axios from 'axios'

export default {
  state: {
    acctPos: []
  },
  mutations: {
    setAcctPos(state, payload) {
      state.acctPos = payload
    },
    updateAcctPos(state, payload) {
      state.acctPos = state.acctPos.map((itm) => {
        if (itm.id === payload.id) {
          return payload;
        } else {
          return itm;
        }
      })
    },
    addAcctPos(state, payload) {
      state.acctPos.push(payload)
    },
    filterAcctPos(state, payload) {
      state.acctPos = state.acctPos.filter((v) => v.id !== payload)
    },
  },
  actions: {
    fetchAcctPos(context, arr) {
      axios
        .get(`http://localhost:3000/AcctPos?OpDate=${arr[0]}&AcctNum=${arr[1]}&AcctNum=${arr[2]}`)
        .then(({ data }) => {
          context.commit('setAcctPos', data)
        });
    },
    putAcctPos(context, itmObj) {
      axios
        .put(`http://localhost:3000/AcctPos/${itmObj.id}`, itmObj)
        .then(({ data }) => {
          context.commit('updateAcctPos', data)
        });
    },
    postAcctPos(context, itmObj) {
      axios
        .post(`http://localhost:3000/AcctPos`, itmObj)
        .then(({ data }) => {
          context.commit('addAcctPos', data)
        });
    },
    deleteAcctPos(context, itmObj) {
      axios
        .delete(`http://localhost:3000/AcctPos/${itmObj.id}`)
        .then(() => {
          context.commit('filterAcctPos', itmObj.id)
        });
    },
  },
  getters: {
    getAcctPos({ acctPos }) {
      return acctPos;
    },
  }
}