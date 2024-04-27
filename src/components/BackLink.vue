<script setup lang="ts">
import IconChevronLeft from '@/components/icons/IconChevronLeft.vue'
import { useRouter } from 'vue-router'

interface Props {
  title?: string;
  titleNoHistory?: string;
  to?: string;
}

withDefaults(defineProps<Props>(), {
  title: 'Назад',
  titleNoHistory: 'На главную',
  to: '/'
})

const noHistory = !window.history.state.back

const router = useRouter()
const onClick = (navigate: Function) => {
  noHistory
    ? navigate()
    : router.back()
}
</script>

<template>
  <div class="back-link">
    <IconChevronLeft class="back-link__icon" />
    <RouterLink
      v-slot="{ href, navigate }"
      class="back-link__to"
      :to="to"
      custom
    >
      <a
        v-bind="$attrs"
        :href="href"
        @click.prevent="onClick(navigate)"
      >
        {{ noHistory ? titleNoHistory : title }}
      </a>
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