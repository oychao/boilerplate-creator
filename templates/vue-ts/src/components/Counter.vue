<template>
  <div>
    <div class="greeting">{{count}}</div>
    <button @click="decrement">-</button>
    <button @click="increment">+</button>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  computed: {
    ...mapGetters(['count'])
  },
  methods: {
    ...mapActions(['increment', 'decrement'])
  }
})
export default class Counter extends Vue {
  // value = 1;
  // increment() {
  //   this.value++;
  // }
  // decrement() {
  //   this.value--;
  // }
}
</script>

<style lang="less">
@size: 20px;
.greeting {
  font-size: @size;
}
</style>
