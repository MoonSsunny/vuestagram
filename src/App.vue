<template>
  <div class="header">
    <ul class="header-button-left">
      <li>Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="step == 1" @click="step++">Next</li>
      <li v-if="step == 2" @click="publish">발행</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>

  <Container
    :contentData="contentData"
    :step="step"
    :imgUrl="imgUrl"
    @write="text = $event"
  />
  <button @click="more">더보기</button>

  <div class="footer">
    <ul class="footer-button-plus">
      <input @change="upload" type="file" id="file" class="inputfile" />
      <label for="file" class="input-plus">+</label>
    </ul>
  </div>
  <h4>안녕 {{ name }}</h4>
  <button @click="$store.commit('changeAge')">버튼</button>
  <p>{{ $store.state.more }}</p>
  <button @click="$store.dispatch('getData')">더보기</button>
</template>

<script>
import Container from "./components/Container.vue";
import contentData from "./data";
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "App",
  data() {
    return {
      contentData: contentData,
      clickNum: 0,
      step: 0,
      imgUrl: "",
      text: "",
      selectFilter: "",
    };
  },
  computed: {
    name() {
      return this.$store.state.name;
    },
    ...mapState(["name", "age", "likes"]),
  },
  mounted() {
    this.emitter.on("boxClick", (a) => {
      this.selectFilter = a;
    });
  },
  methods: {
    more() {
      axios
        .get(`https://codingapple1.github.io/vue/more${this.clickNum}.json`)
        .then((result) => {
          // console.log(result.data)
          this.contentData.push(result.data);
          this.clickNum++;
        });
    },
    upload(e) {
      let image = e.target.files;
      let imageUrl = URL.createObjectURL(image[0]);
      this.step++;
      this.imgUrl = imageUrl;
    },
    publish() {
      const mypage = {
        name: "Kim Hyun",
        userImage: "https://placeimg.com/100/100/arch",
        postImage: this.imgUrl,
        likes: 36,
        date: "May 15",
        liked: false,
        content: this.text,
        filter: this.selectFilter,
      };
      this.contentData.unshift(mypage);
      this.step = 0;
    },
  },
  components: {
    Container,
  },
};
</script>

<style>
body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
