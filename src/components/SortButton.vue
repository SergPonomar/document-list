<script setup lang="ts">
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
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    ><path
      d="M4 6H11L7.5 10.5L4 6Z"
      fill="currentColor"
    /></svg>
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
