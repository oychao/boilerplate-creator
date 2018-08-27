<!-- src/components/HelloDecorator.vue -->
<!-- This is an alternative way to define the Hello component using decorators -->
<template>
  <div>
    <div class="greeting">{{value}}</div>
    <button @click="decrement">-</button>
    <button @click="increment">+</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Counter extends Vue {
  value = 1;
  increment() {
    this.value++;
  }
  decrement() {
    this.value--;
  }
}
</script>

<style lang="less">
@size: 20px;
.greeting {
  font-size: @size;
}
</style>
