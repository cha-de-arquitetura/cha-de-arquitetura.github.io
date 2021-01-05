<template>
  <div v-lazy-container="{ selector: 'img' }" class="inline-block">
    <img
      class="w-full"
      :data-src="require(`~/assets/images/${src}`)"
      :data-loading="require(`~/assets/images/${src}?lqip`)"
      :alt="alt"
    />
  </div>
</template>

<script>
export default {
  name: 'LazyImage',
  props: ['src', 'alt']
};
</script>

<style scoped>
img[lazy='loading'] {
  filter: blur(15px);
}
</style>
