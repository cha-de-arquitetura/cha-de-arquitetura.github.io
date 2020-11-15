<template>
  <img
    id="author-photo"
    :src="`/photos/${author}`"
    alt="Author photo" />
</template>

<script>
export default {
  name: 'AuthorPhoto',
  props: {
    author: {
      type: String,
      default: 'placeholder.png'
    },
    normal: {
      type: Boolean
    },
    small: {
      type: Boolean
    },
    large: {
      type: Boolean
    }
  }
};
</script>

<style lang="scss" scoped>
#author-photo {
  width: 40px;
  height: auto;
  border-radius: 40px;
}
</style>
