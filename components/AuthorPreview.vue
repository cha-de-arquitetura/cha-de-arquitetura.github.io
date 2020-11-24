<template>
  <div class="flex flex-row">
    <nuxt-link
      :to="localePath(to)">
      <AuthorPhoto
        :author="article.author.photo"
        class="mr-4" />
    </nuxt-link>
    <div class="flex flex-col justify-around">
      <nuxt-link
        :to="localePath(to)"
        class="text-base font-normal text-gray-800">{{ article.author.name }}
      </nuxt-link>
      <p class="text-xs font-thin text-gray-700">
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
