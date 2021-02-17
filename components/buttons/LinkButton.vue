<template>
  <button
    ref="button"
    type="button"
    class="socialButton"
    aria-label="Copy URL"
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
