<template>
  <div class="flex flex-row">
    <nuxt-link
      id="pt-br"
      class="locale"
      :to="switchLocalePath('pt')">
      Português
    </nuxt-link>

    <nuxt-link
      id="en-us"
      class="locale"
      :to="switchLocalePath('en')">
      English
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'LocaleSwitcher'
};
</script>

<style
  lang="scss"
  scoped>
.locale {
  @apply align-middle self-center text-white font-light;

  &:first-child {
    @apply mr-2 pr-2 border-r border-gray-600;
  }

  &.nuxt-link-exact-active {
    @apply text-ti-blue underline font-normal;
  }

  &:hover:not(.nuxt-link-exact-active) {
    @apply text-ti-green;
  }
}
</style>
