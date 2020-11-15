<template>
  <div id="article-card">
    <h2 id="card-title" class="no-margin">
      <nuxt-link :to="localePath(to)">{{ article.title }}</nuxt-link>
    </h2>
    <p id="card-description" class="no-margin margin-top">
      <nuxt-link :to="localePath(to)">{{ article.description }}</nuxt-link>
    </p>
    <div id="card-footer">
      <Tags :article="article" class="margin-bottom" />
      <AuthorPreview :article="article" />
    </div>
  </div>
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

<style
  lang="scss"
  scoped>
#article-card {
  width: 100%;
  display: block;
  padding: 16px;
  transition: background-color;
  transition-duration: 0.3s;

  &:hover {
    border-radius: 8px;
    background-color: lighten($darkest, 79%);
    transform: translateY(-5px);
    box-shadow: 0 8px 10px -10px lighten($darkest, 50%);
  }

  a {
    text-decoration: none;
  }

  #card-description a {
    color: $darker;
    font-weight: 300;
    font-size: 16px;
  }

  #card-title a {
    color: $darkest;
    font-weight: 400;
    font-size: 24px;
    transition: color;

    &:hover {
      color: $primary;
    }
  }

  #card-footer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
}
</style>
