<template>
  <button
    type="button"
    class="social-button"
    @click="share">
    <TwitterIcon/>
  </button>
</template>

<script>
import { CreateShareURL } from '~/utils/twitter';
import TwitterIcon from '~/assets/icons/twitter.svg?inline';

export default {
  name: 'TwitterButton',
  components: {
    TwitterIcon
  },
  props: ['article'],
  methods: {
    share() {
      window.open(CreateShareURL(this.article, this.$i18n.locale));
    }
  }
};
</script>
