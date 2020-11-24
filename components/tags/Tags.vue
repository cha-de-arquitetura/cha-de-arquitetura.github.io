<template>
  <ul class="list-none">
    <li
      v-for="tag in article.tags"
      :key="`${article}-${tag}`"
      class="font-code font-light inline mr-2 text-xs text-gray-700">#{{tag}}</li>
  </ul>
</template>

<script>

export default {
  name: 'Tags',
  props: ['article']
};
</script>
