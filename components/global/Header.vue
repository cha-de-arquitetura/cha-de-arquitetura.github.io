<template>
  <div class="header">
    <nuxt-link :to="localePath('/')">
      <img
        class="image"
        src="~assets/icons/t.issues-white.min.svg"
        alt="Tech Issues Logo"/>
      <img
        class="shortImage"
        src="~assets/icons/t.issues-short-white.min.svg"
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

<style
  lang="scss"
  scoped>
.header {
  @apply flex flex-row justify-between max-w-screen-lg mx-auto;

  .image {
    @apply hidden h-6;
  }

  .shortImage {
    @apply h-8;
  }
}

@screen md {
  .header {
    @apply py-4;

    .image {
      @apply block;
    }

    .shortImage {
      @apply hidden;
    }
  }
}
</style>
