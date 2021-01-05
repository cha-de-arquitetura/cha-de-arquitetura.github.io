<template>
  <button
    type="button"
    class="social-button"
    @click="share">
    <FacebookIcon/>
  </button>
</template>

<script>
import { facebookScripts } from '~/utils/head';
import FacebookIcon from '~/assets/icons/facebook.svg?inline';

export default {
  name: 'FacebookButton',
  components: {
    FacebookIcon
  },
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
