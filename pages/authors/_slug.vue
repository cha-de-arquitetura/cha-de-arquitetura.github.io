<template>
  <DefaultContent class="max-w-screen-md mx-auto">
    <div class="relative justify-start mt-24 mb-4 p-8 pt-16 w-full bg-primary rounded text-white">
      <div class="inline absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <LazyPhoto
          id="author-photo"
          :src="author.photo"
          alt="Author photo"
          classes="w-28 rounded-full bg-white border-4 border-white"
        />
      </div>

      <p class="mx-auto w-1/2 text-center mb-2 mb-4">
        {{ author.bio }}
      </p>

      <ul class="social">
        <li v-if="author.social.linkedin">
          <a :href="author.social.linkedin.url" target="_blank">
            <LinkedInIcon class="social-icon"/>
          </a>
        </li>
        <li v-if="author.social.twitter">
          <a :href="author.social.twitter.url" target="_blank">
            <TwitterIcon class="social-icon"/>
          </a>
        </li>
        <li v-if="author.social.stackoverflow">
          <a :href="author.social.stackoverflow.url" target="_blank">
            <StackOverflowIcon class="social-icon"/>
          </a>
        </li>
        <li v-if="author.social.github">
          <a :href="author.social.github.url" target="_blank">
            <GithubIcon class="social-icon"/>
          </a>
        </li>
      </ul>
    </div>
    <div class="flex flex-col">
      <ArticleCard
        v-for="article in articles"
        :key="article.slug"
        :article="article"
        class="mb-4"/>
    </div>
  </DefaultContent>
</template>

<script>
import { ResolveContentLocale } from '~/utils/locale';
import LinkedInIcon from '~/assets/icons/linkedin.svg?inline';
import TwitterIcon from '~/assets/icons/twitter.svg?inline';
import StackOverflowIcon from '~/assets/icons/stack-overflow.svg?inline';
import GithubIcon from '~/assets/icons/github.svg?inline';

export default {
  name: 'Authors',
  components: {
    LinkedInIcon,
    TwitterIcon,
    StackOverflowIcon,
    GithubIcon
  },
  nuxtI18n: {
    paths: {
      en: '/authors/:slug',
      pt: '/autores/:slug'
    }
  },
  async asyncData({ $content, params, app }) {
    const authorPath = `${ResolveContentLocale('authors', app.i18n)}/${params.slug}`;

    const author = await $content(authorPath)
      .without(['body', 'text'])
      .fetch();

    const articlesPath = ResolveContentLocale('articles', app.i18n);

    const articles = await $content(articlesPath)
      .without(['body', 'text'])
      .where({ author: author.slug })
      .fetch();

    articles.forEach(article => {
      article.author = author;
    });

    return {
      author,
      articles
    };
  }
};
</script>

<style lang="scss" scoped>
.social {
  @apply text-center;

  li {
    @apply mx-2 text-center inline;
  }
}

.social-icon {
  @apply w-6 h-6 text-white fill-current inline-block;
}
</style>
