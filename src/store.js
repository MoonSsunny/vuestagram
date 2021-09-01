import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state() {
    return {
      name: "민수",
      age: 20,
      likes: 30,
      checkLike: false,
      more: {},
    };
  },
  mutations: {
    changeAge(state) {
      state.age++;
    },
    like(state) {
      if (state.checkLike == false) {
        state.likes++;
        state.checkLike = true;
      } else {
        state.like--;
        state.checkLike = false;
      }
    },
    setMore(state, data) {
      state.more = data;
    },
  },
  actions: {
    getData(context) {
      axios.get("https://codingapple1.github.io/vue/more0.json").then((a) => {
        console.log(a.data);
        context.commit("setMore", a.data);
      });
    },
  },
});

export default store;
