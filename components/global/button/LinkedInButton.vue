<template>
  <button
    type="button"
    class="social-button"
    aria-label="share-on-linkedin"
    @click="share">
    <span class="icon-linkedin"></span>
  </button>
</template>

<script>

export default {
  name: 'LinkedInButton',
  props: ['article'],
  methods: {
    share() {
      // https://www.linkedin.com/shareArticle
      // ?mini=true
      // &url=https://dev.to/prashanthwagle/css-pseudo-selectors-what-are-they-479f
      // &title=CSS%20Pseudo%20Selectors:%20What%20are%20they?
      // &summary=Cover%20Photo%20by%20Tirachard%20Kumtanom%20from%20Pexels%20%20%20%20%20%20%20%20%20%20%20Basics%20%20%20Selectors%20are%20patterns%20used%20to%20ident...
      // &source=DEV
      window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${this.article.url}&title=${this.article.title}&summary=${this.article.description}`);
    }
  }
};
</script>
