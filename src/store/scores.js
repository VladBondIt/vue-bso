import axios from 'axios'
export default {
    state: {
        scoreItems: []
    },
    mutations: {
        setScoreItems(state, payload) {
            state.scoreItems = payload
        }
    },
    actions: {
        fetchScoreItems(context) {
            axios.get("http://localhost:3000/Acct").then((res) => {
                context.commit('setScoreItems', res.data)
            })
        }
    },
    getters: {
        getScoreItems({ scoreItems }) {
            return scoreItems;
        }
    }
}