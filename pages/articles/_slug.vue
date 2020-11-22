<template>
  <ThreeColumnContent>
    <h1 id="article-title" class="no-margin big-margin-top big-margin-bottom">{{ article.title }}</h1>

    <Tags :article="article" class="margin-bottom" />

    <div id="article-description">
      <AuthorPreview id="author-preview" :article="article" />

      <div id="share-container">
        <FacebookButton :article="article" />
        <LinkedInButton :article="article" class="horizontal-margin" />
        <TwitterButton :article="article" />
      </div>
    </div>

    <div id="article-content">
      <nuxt-content :document="article" />
    </div>
  </ThreeColumnContent>
</template>

<script>
import AuthorPreview from '@/components/AuthorPreview';
import FacebookButton from '@/components/button/FacebookButton';
import LinkedInButton from '@/components/button/LinkedInButton';
import TwitterButton from '@/components/button/TwitterButton';
import ThreeColumnContent from '@/components/ThreeColumnContent';
import { ResolveContentLocale } from '~/utils/locale';
import { ArticleMetaTags } from '~/utils/head';

export default {
  name: 'BlogIndex',
  nuxtI18n: {
    paths: {
      en: '/articles/:slug',
      pt: '/artigos/:slug'
    }
  },
  components: { FacebookButton, TwitterButton, LinkedInButton, AuthorPreview, ThreeColumnContent },
  async asyncData({ $content, params, app }) {
    const contentPath = `${ResolveContentLocale('articles', app.i18n)}/${params.slug}`;

    const article = await $content(contentPath).fetch();

    const authorPath = `${ResolveContentLocale('authors', app.i18n)}/${article.author}`
    article.author = await $content(authorPath).without(['body', 'text']).fetch();

    return {
      article,
      locale: app.i18n.locale
    };
  },
  head() {
    return {
      title: this.article.title,
      meta: ArticleMetaTags(this.article)
    }
  }
};
</script>

<style
  lang="scss"
  scoped>
#article-title {
  color: $darkest;
}

#article-description {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  #author-preview {
    width: 300px;
  }

  #share-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
