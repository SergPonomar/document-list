<script setup lang="ts">
import IconChevronLeft from '@/components/icons/IconChevronLeft.vue'

interface Props {
  title?: string;
  to?: string;
}

withDefaults(defineProps<Props>(), {
  title: 'Назад',
  to: '/'
})
</script>

<template>
  <div class="back-link">
    <IconChevronLeft class="back-link__icon" />
    <RouterLink
      class="back-link__to"
      :to="to"
    >
      {{ title }}
    </RouterLink>
  </div>
</template>

<style lang="scss">
.back-link {
  margin-bottom: 12px;
  cursor: pointer;
  @include hover;

  &__icon {
    width: 20px;
    height: 20px;
    vertical-align: bottom;
  }
}
</style>