<script setup lang="ts">
import { ref, onMounted } from 'vue'

const emit = defineEmits(['fetchNext'])
const anchor = ref()

onMounted(() => {
  const marginBottom = -window.innerHeight + 1.2 * 1080
  const observer = new IntersectionObserver(
    ([{ isIntersecting }], _observerElement) => {
      if (isIntersecting) {
        emit('fetchNext')
      }
    },
    {
      rootMargin: `0px 0px ${marginBottom}px 0px`,
      threshold: 0.0
    }
  )
  observer.observe(anchor.value)
})
</script>

<template>
  <div ref="anchor" />
</template>
