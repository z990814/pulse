<template>
  <div id="app">
    <!-- <router-view /> -->
    <PC />
  </div>
</template>

<script>
import PC from "./components/PC.vue";
export default {
  name: "App",
  components: { PC },
};
</script>

<style>
body {
  margin: 0;
}
</style>
