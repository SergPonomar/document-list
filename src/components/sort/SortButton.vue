<script setup lang="ts">
import IconTriangleUp from '@/components/icons/IconTriangleUp.vue'

interface Props {
  active?: boolean;
}

withDefaults(defineProps<Props>(), {
  active: false
})
</script>

<template>
  <button
    class="sort-button"
    :class="{'sort-button_active': active }"
  >
    <IconTriangleUp />
  </button>
</template>

<style lang="scss">
.sort-button {
  color: #cccccc;
  display: inline-flex;
  background: aliceblue;
  border-radius: 3px;
  margin-bottom: 1px;

  &_active {
    color: #404040;
  }
}
</style>
