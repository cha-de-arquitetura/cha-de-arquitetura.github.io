<template>
  <div id="author-preview">
    <AuthorPhoto :author="article.author.photo" class="margin-right" />
    <div id="author-detail">
      <div>
        <nuxt-link :to="localePath(to)" class="link">{{ article.author.name }}</nuxt-link>
      </div>
      <div>
        <p class="no-margin margin-top">
          <span aria-label="release date">{{ formattedDate }}</span> -
          <span aria-label="reading time">{{ $t('readingTime', readingTime) }}</span>
        </p>
      </div>
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
      }
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
#author-preview {
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-start;

  #author-detail {
    height: 40px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    #author-photo {
      width: 50px;
      height: auto;
      border-radius: 40px;
    }

    p {
      color: lighten($darkest, 20%);
      font-size: 13px;
      font-weight: 300;
    }
  }
}
</style>
