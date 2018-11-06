<template>
  <div class="app">
    <h1>Vue</h1>
    <p>
      <router-link to="/counter">counter</router-link>
      <router-link to="/field">field</router-link>
    </p>
    <hr>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';
export default class App extends Vue {}
</script>

<style lang="less">
</style>
