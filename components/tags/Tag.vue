<template>
  <li>
    <nuxt-link
      :to="localePath(to)"
      class="font-code"
      v-class:active="isActive">#{{ tag }}</nuxt-link>
  </li>
</template>

<script>
export default {
  name: 'Tag',
  props: ['tag'],
  computed: {
    to({ tag }) {
      return {
        path: '/',
        query: {
          tags: tag
        }
      };
    },
    isActive({ tag }) {
      const tags = this.$route.query.tags;
      if (tags != null) {
        if (Array.isArray(tags)) {
          return tags.find(t => t === tag) != null
        }
        return tags === tag;
      }
      return false;
    }
  }
};
</script>
