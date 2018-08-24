<template>
    <div>
        <span>{{count}}</span>
        <br>
        <button @click="increment">Increment</button>
        <button @click="decrement">Decrement</button>
    </div>
</template>

<script>
import Vuex from 'vuex';
export default {
  name: 'demo-counter',
  computed: {
    ...Vuex.mapState(['count'])
  },
  methods: {
    ...Vuex.mapMutations(['increment', 'decrement'])
  }
};
</script>

<style scoped>
</style>
