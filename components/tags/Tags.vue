<template>
  <ul class="tag-list">
    <li
      v-for="tag in article.tags"
      :key="`${article}-${tag}`"
      class="tag">#{{tag}}</li>
  </ul>
</template>

<script>
export default {
  name: 'Tags',
  props: ['article']
};
</script>

<style
  lang="scss"
  scoped>
.tag-list {
  @apply list-none;

  .tag {
    @apply font-code font-light inline mr-2 text-xs text-gray-300;
  }
}
</style>
