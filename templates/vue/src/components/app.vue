<template>
  <div class="example">
    <p>
      <router-link to="/demo-counter">demo-counter</router-link>
      <router-link to="/demo-model">demo-model</router-link>
      <router-link to="/demo-alive">demo-alive</router-link>
    </p>
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