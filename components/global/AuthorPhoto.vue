<template>
  <LazyPhoto
    id="author-photo"
    :src="author"
    alt="Author photo"
    />
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
