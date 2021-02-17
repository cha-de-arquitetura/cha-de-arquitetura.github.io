<template>
  <button
    type="button"
    class="socialButton"
    aria-label="Share on Twitter"
    @click="share">
    <span class="icon-twitter"></span>
  </button>
</template>

<script>
import { CreateShareURL } from '~/utils/twitter';

export default {
  name: 'TwitterButton',
  props: ['article'],
  methods: {
    share() {
      window.open(CreateShareURL(this.article, this.$i18n.locale));
    }
  }
};
</script>
