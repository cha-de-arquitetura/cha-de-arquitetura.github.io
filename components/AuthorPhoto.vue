<template>
  <img
    id="author-photo"
    :src="`/photos/${author}`"
    alt="Author photo"
    class="w-12 rounded-3xl"/>
</template>

<script>
export default {
  name: 'AuthorPhoto',
  props: {
    author: {
      type: String,
      default: 'placeholder.png'
    }
  }
};
</script>
