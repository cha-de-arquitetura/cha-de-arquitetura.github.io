<template>
  <button
    ref="button"
    type="button"
    class="social-button"
    @click="share">
    <LinkIcon/>
  </button>
</template>

<script>
import LinkIcon from '~/assets/icons/link.svg?inline'

export default {
  name: 'FacebookButton',
  components: {
    LinkIcon
  },
  props: ['article'],
  methods: {
    share() {
      const input = document.createElement('input');
      input.value = this.article.url;
      this.$refs.button.appendChild(input);
      input.select();
      document.execCommand('copy');
      this.$refs.button.removeChild(input);
    }
  }
};
</script>
