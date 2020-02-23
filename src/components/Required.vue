<template>
  <text :class="clazz">{{text}}</text>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Required extends Vue {
  @Prop({
    default: '*'
  }) readonly text!: string;

  @Prop({
    default: 'text-red text-xl margin-left-xs'
  }) readonly clazz!: string;


}
</script>

<style lang="scss">
</style>
