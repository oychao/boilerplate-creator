<template>
  <div>
    <counter></counter>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Counter from 'comps/Counter.vue';

@Component({
  name: 'app',
  components: { Counter }
})
export default class App extends Vue {}
</script>

<style lang="less">
</style>
