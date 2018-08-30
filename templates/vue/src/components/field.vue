<template>
  <div class="field">
    <input v-model="content" ref="field">
    <br>
    <span>{{status}}</span>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

const EMTPY_MSG = 'Input something please';
export default {
  name: 'field',
  computed: {
    content: {
      get() {
        return this.$store.state.content;
      },
      set(value) {
        this.setContent(value);
      }
    },
    status() {
      return this.$store.state.content === ''
        ? EMTPY_MSG
        : this.$store.state.content;
    }
  },
  methods: {
    ...mapActions(['setContent'])
  },
  mounted() {
    this.$refs.field.focus();
  }
};
</script>

<style lang="less" scoped>
</style>
