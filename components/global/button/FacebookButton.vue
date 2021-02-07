<template>
  <button
    type="button"
    class="social-button"
    aria-label="share-on-facebook"
    @click="share">
    <span class="icon-facebook"/>
  </button>
</template>

<script>
import { facebookScripts } from '~/utils/head';

export default {
  name: 'FacebookButton',
  props: ['article'],
  head: {
    script: facebookScripts
  },
  methods: {
    share() {
      // window.open(`https://www.facebook.com/sharer.php?u=${href}`);
      window.FB.ui({
        method: 'share',
        display: 'dialog',
        href: this.article.url
      }, function (response) {
        console.log(response);
      });
    }
  }
};
</script>
