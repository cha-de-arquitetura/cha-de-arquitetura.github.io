<template>
  <li>
    <nuxt-link
      :to="localePath(to)"
      class="link tag-link"
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

<style
  lang="scss"
  scoped>
li {
  display: inline;
  margin-right: $margin;
  padding: $small-padding;

  .tag-link {
    font-family: 'Fira Code';
    font-weight: 100;
    font-size: 12px;
    color: $darker;

    &.active {
      background-color: $darker;
      color: $lightest;
      padding: $small-padding;
    }
  }
}
</style>
