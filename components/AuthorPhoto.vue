<template>
  <img
    id="author-photo"
    :src="require(`~/assets/photos/${author}`)"
    alt="Author photo" />
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

<style lang="scss" scoped>
#author-photo {
  width: 50px;
  height: auto;
  border-radius: 40px;
}
</style>
