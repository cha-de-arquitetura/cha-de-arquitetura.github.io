<template>
  <article class="article">
    <div>
      <h2>
        <nuxt-link :to="localePath(to)">{{ article.title }}</nuxt-link>
      </h2>
      <nuxt-link :to="localePath(to)" class="description">
        {{ article.description }}
      </nuxt-link>
      <Tags :article="article" class="mb-2" />
      <AuthorPreview :article="article" />
    </div>
  </article>
</template>

<script>
import { ReadingTime } from '~/utils/date-time';

export default {
  name: 'ArticleCard',
  props: {
    article: Object
  },
  computed: {
    to({ article }) {
      return {
        name: 'articles-slug',
        params: {
          slug: article.slug
        }
      }
    },
    readingTime({ article }) {
      return {
        readingTime: ReadingTime(article.readingTime)
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.article {
  @apply rounded relative p-0.5;

  >div {
    @apply rounded flex flex-col bg-gray-100 p-3.5 relative w-full h-full;

    h2 {
      @apply text-xl font-bold text-gray-900;
    }

    .description {
      @apply mx-0 my-2 text-sm font-normal text-gray-800 flex-grow;
    }
  }
}

@layer utilities {
  @variants dark {
    .article {
      @apply bg-gradient-to-tl from-ti-green to-ti-blue;

      >div {
        @apply bg-gray-700;

        h2,
        .description {
          @apply text-white;
        }
      }
    }
  }
}
</style>
