<template>
  <button
    type="button"
    class="socialButton"
    aria-label="Share"
    @click="share">
    <i class="icon-share"></i>
  </button>
</template>

<script>
export default {
  name: 'FacebookButton',
  props: ['article'],
  methods: {
    share() {
      navigator.share({
        url: this.article.url,
        text: this.article.description,
        title: this.article.title
      });
    }
  }
};
</script>
