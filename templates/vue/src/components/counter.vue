<template>
  <div class="counter">
    <span>{{ count }}</span>
    <br>
    <button @click="increment">
      Increment
    </button>
    <button @click="decrement">
      Decrement
    </button>
  </div>
</template>

<script>
import Vuex from 'vuex';

export default {
  name: 'Counter',
  computed: {
    ...Vuex.mapGetters(['count'])
  },
  methods: {
    ...Vuex.mapActions(['increment', 'decrement'])
  }
};
</script>

<style lang="less" scoped>
</style>
