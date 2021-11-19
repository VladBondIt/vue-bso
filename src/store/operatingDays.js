import axios from 'axios'

export default {
  state: {
    operDays: []
  },
  mutations: {
    setOperDays(state, payload) {
      state.operDays = payload
    },
    updateOperDays(state, payload) {
      state.operDays = state.operDays.map((itm) => {
        if (itm.id === payload.id) {
          return payload;
        } else {
          return itm;
        }
      })
    },
    addOperDays(state, payload) {
      state.operDays.push(payload)
    },
    filterOperDays(state, payload) {
      state.operDays = state.operDays.filter((v) => v.id !== payload)
    },
  },
  actions: {
    fetchOpDate(context) {
      axios
        .get(`http://localhost:3000/OpDate`)
        .then((days) => {
          context.commit('setOperDays', days.data)
        });
    },
    putOpDate(context, itmObj) {
      axios
        .put(`http://localhost:3000/OpDate/${itmObj.id}`, itmObj)
        .then(({ data }) => {
          context.commit('updateOperDays', data)
        });
    },
    postOpDate(context, itmObj) {
      axios
        .post(`http://localhost:3000/OpDate`, itmObj)
        .then(({ data }) => {
          context.commit('addOperDays', data)
        });
    },
    deleteOpDate(context, itmObj) {
      axios
        .delete(`http://localhost:3000/OpDate/${itmObj.id}`)
        .then(() => {
          context.commit('filterOperDays', itmObj.id)
        });
    },
  },
  getters: {
    getOperDays({ operDays }) {
      return operDays;
    },
  }
}