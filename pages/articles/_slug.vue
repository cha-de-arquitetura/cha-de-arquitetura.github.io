<template>
  <DefaultContent class="article">
    <h1 class="article-title">{{ article.title }}</h1>

    <Tags :article="article" class="mb-2" />

    <div class="articleMetadata">
      <AuthorPreview :article="article" />

      <client-only>
        <ShareButton v-if="shareApiEnabled" :article="article" class="mobileShare"/>

        <div v-else class="shareList">
          <FacebookButton :article="article" />
          <LinkedInButton :article="article" />
          <TwitterButton :article="article"/>
          <LinkButton :article="article" />
        </div>
      </client-only>
    </div>

    <hr class="my-4"/>

    <article>
      <nuxt-content :document="article" />
    </article>
  </DefaultContent>
</template>

<script>
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
  },
  computed: {
    shareApiEnabled() {
      if (process.client) {
        return window.navigator.share != null;
      }
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
.article {
  @apply max-w-screen-md mx-auto;

  .article-title {
    @apply text-3xl font-bold text-gray-900 mb-4;
  }

  .articleMetadata {
    @apply flex flex-col justify-around;

    .shareList {
      @apply flex flex-row justify-around items-center mt-4;
    }
  }
}

.dark {
  .article {
    .article-title {
      @apply text-white;
    }
  }
}

@screen md {
  .article {
    .articleMetadata {
      @apply flex-row justify-between;

      .shareList {
        @apply mt-0;

        *:not(:first-child) {
          @apply ml-2.5;
        }
      }
    }
  }
}

@screen lg {
  .article {
    .article-title {
      @apply text-4xl;
    }
  }
}
</style>
