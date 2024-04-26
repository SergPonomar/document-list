<script setup lang="ts">
</script>

<template>
  <button class="add-filter-button">
    Применить
  </button>
</template>

<style lang="scss">
.add-filter-button {
  padding: 5px 10px;
  background: $label;
  border-radius: 3px;
  cursor: pointer;

  &:disabled {
    background: $border;
    color: $text-grey;
    cursor: default;
  }
}
</style>