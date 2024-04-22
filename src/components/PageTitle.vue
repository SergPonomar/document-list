<script setup lang="ts">
interface Props {
  title?: string;
}

withDefaults(defineProps<Props>(), {
  title: ''
})
</script>

<template>
  <h1
    v-if="title"
    class="page-title"
  >
    {{ title }}
  </h1>
</template>

<style lang="scss">
.page-title {
  font-size: 24px;
  margin-bottom: 12px;
  margin-left: 2px;
}
</style>
