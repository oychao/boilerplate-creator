<template>
  <div>
    <input type="text" v-model="content">
    <br>
    <span>{{content}}</span>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  computed: {
    content: {
      get() {
        return this.$store.getters.content;
      },
      set(val) {
        this.$store.dispatch('setContent', val);
      }
    }
  }
})
export default class Counter extends Vue {}
</script>

<style lang="less">
@size: 20px;
.greeting {
  font-size: @size;
}
</style>
