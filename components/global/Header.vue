<template>
  <div class="header">
    <nuxt-link :to="localePath('/')">
      <img
        class="image"
        :src="require(`~/assets/icons/logo/${image}.svg`)"
        alt="Tech Issues Logo" />
      <img
        class="shortImage"
        :src="require(`~/assets/icons/logo/${shortImage}.svg`)"
        alt="Tech Issues Logo - Mobile version"/>
    </nuxt-link>
    <LocaleSwitcher/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Header',
  computed: {
    ...mapGetters(['isDarkMode']),
    image,
    shortImage
  }
};

function image() {
  return this.isDarkMode ? 't.issues-white.min' : 't.issues.min';
}

function shortImage() {
  return this.isDarkMode ? 't.issues-short-white.min' : 't.issues-short.min';
}
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
