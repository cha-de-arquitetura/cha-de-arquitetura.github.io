<template>
  <div class="flex flex-row justify-between max-w-screen-lg mx-auto">
    <nuxt-link :to="localePath('/')">
      <img
        class="hidden md:block h-6"
        src="~/assets/icons/t.issues.min.svg"
        alt="Tech Issues Logo" />
      <img
        class="h-8 md:hidden"
        src="~/assets/icons/t.issues-short.min.svg"
        alt="Tech Issues Logo - Mobile version"/>
    </nuxt-link>
    <LocaleSwitcher/>
  </div>
</template>

<script>
export default {
  name: 'Header'
};
</script>
