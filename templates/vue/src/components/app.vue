<template>
  <div class="app">
    <h1>Hello Vue</h1>
    <p>
      <router-link to="/counter">
        counter
      </router-link>
      <router-link to="/field">
        field
      </router-link>
    </p>
    <hr>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="less">
</style>
