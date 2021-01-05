<template>
  <button
    type="button"
    class="social-button"
    @click="share">
    <ShareIcon/>
  </button>
</template>

<script>
import ShareIcon from '~/assets/icons/share.svg?inline';

export default {
  name: 'FacebookButton',
  components: {
    ShareIcon
  },
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
