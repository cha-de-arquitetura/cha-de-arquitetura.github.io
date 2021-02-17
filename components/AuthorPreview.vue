<template>
  <div class="author-preview">
    <nuxt-link
      :to="localePath(to)">
      <LazyPhoto
        :src="article.author.photo"
        :alt="article.author.name"
        class="mr-4" />
    </nuxt-link>
    <div class="details">
      <nuxt-link
        :to="localePath(to)"
        class="author-name">{{ article.author.name }}
      </nuxt-link>
      <p class="article-details">
        <span aria-label="release date">{{ formattedDate }}</span> -
        <span aria-label="reading time">{{ $t('readingTime', readingTime) }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { ReadingTime } from '~/utils/date-time';
import { FormatDate } from '~/utils/locale';

export default {
  name: 'AuthorPreview',
  props: ['article'],
  computed: {
    to({ article }) {
      return {
        name: 'authors-slug',
        params: {
          slug: article.author.slug
        }
      };
    },
    formattedDate({ article }) {
      return FormatDate(article.createdAt, this.$i18n.locale);
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
.author-preview {
  @apply flex flex-row;

  .details {
    @apply flex flex-col justify-around;

    .author-name {
      @apply text-base font-normal text-gray-800;
    }

    .article-details,
    .article-details * {
      @apply text-sm font-thin text-gray-700;
    }
  }
}

.dark {
  .author-preview {
    .details {
      .author-name {
        @apply text-white;
      }

      .article-details,
      .article-details * {
        @apply text-gray-300;
      }
    }
  }
}
</style>
