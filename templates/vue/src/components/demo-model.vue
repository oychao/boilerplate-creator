<template>
  <div>
    <input v-model="content" ref="input">
    <br>
    <span>{{status}}</span>
  </div>
</template>

<script>
import Vuex from 'vuex';

const EMTPY_MSG = 'Input something please';
export default {
  name: 'demo-model',
  data() {
    return {};
  },
  computed: {
    content: {
      get() {
        return this.$store.state.content;
      },
      set(value) {
        this.$store.commit('setContent', {
          content: value
        });
      }
    },
    status() {
      return this.$store.state.content === ''
        ? EMTPY_MSG
        : this.$store.state.content;
    }
  },
  methods: {},
  mounted() {
    this.$refs.input.focus();
  },
  watch: {}
};
</script>

<style scoped>
</style>