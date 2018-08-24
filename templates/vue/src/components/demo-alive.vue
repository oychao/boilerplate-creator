<template>
    <div>
        <input v-model="content" ref="input">
    </div>
</template>

<script>
import Vuex from 'vuex';

const EMTPY_MSG = 'Input something please';
export default {
  name: 'demo-alive',
  data() {
    return {
      content: ''
    };
  },
  computed: {},
  methods: {},
  mounted() {
    this.$refs.input.focus();
  },
  watch: {}
};
</script>

<style scoped>
</style>