<template>
  <ul id="tags-container" class="no-margin">
    <li
      v-for="tag in article.tags"
      :key="`${article}-${tag}`">#{{tag}}</li>
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
#tags-container {
  padding: 0;

  li {
    display: inline;
    margin-right: $margin;
    padding: $small-padding;
    font-family: 'Fira Code';
    font-weight: 100;
    font-size: 12px;
    color: $darker;
  }
}
</style>
