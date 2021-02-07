<template>
  <button
    ref="button"
    type="button"
    class="social-button"
    aria-label="copy-url"
    @click="share">
    <span class="icon-copy"></span>
  </button>
</template>

<script>
export default {
  name: 'LinkButton',
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
