<template>
  <div
    class="filter-item"
    :class="filterName"
    :style="{ backgroundImage: `url(${imgUrl})` }"
    @click="fire"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "filterbox",
  props: {
    imgUrl: String,
    filterName: String,
  },
  methods: {
    fire() {
      this.emitter.emit("boxClick", this.filterName);
    },
  },
};
</script>

<style>
.filter-item {
  width: 100px;
  height: 100px;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
  background-position: center;
}
</style>
