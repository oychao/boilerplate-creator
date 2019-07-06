<template>
  <div class="field">
    <input
      ref="field"
      v-model="content"
    >
    <br>
    <span>{{ status }}</span>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

const EMTPY_MSG = 'Input something please';
export default {
  name: 'Field',
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
  mounted() {
    this.$refs.field.focus();
  },
  methods: {
    ...mapActions(['setContent'])
  }
};
</script>

<style lang="less" scoped>
</style>
