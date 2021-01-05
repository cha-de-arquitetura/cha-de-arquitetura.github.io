<template>
  <div v-lazy-container="{ selector: 'img' }" class="inline-block">
    <img
      class="w-12 rounded-full"
      :data-src="require(`~/assets/photos/${src}`)"
      :data-loading="require(`~/assets/photos/${src}?lqip`)"
      :alt="alt"
      :class="classes"
    />
  </div>
</template>

<script>
export default {
  name: 'LazyPhoto',
  props: ['src', 'alt', 'classes']
};
</script>

<style scoped>
img[lazy='loading'] {
  filter: blur(2px);
}
</style>
