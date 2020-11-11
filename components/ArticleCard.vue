<template>
  <div id="article-card">
    <h2 id="card-title">
      <nuxt-link :to="to">{{ article.title }}</nuxt-link>
    </h2>
    <p id="card-description">
      <nuxt-link :to="to">{{ article.description }}</nuxt-link>
    </p>
    <div id="card-footer">
      <AuthorPhoto
        id="author-photo"
        :author="article.author.photo"/>
      <div id="footer-detail">
        {{ new Intl.DateTimeFormat('pt-BR').format(new Date(article.createdAt)) }} <br/>
        {{ article.readingTime }} min read
      </div>
    </div>
  </div>
</template>

<script>
import AuthorPhoto from '@/components/AuthorPhoto';
export default {
  name: 'ArticleCard',
  components: { AuthorPhoto },
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
    background-color: lighten($darkest, 79%);
    transform: translateY(-5px);
    box-shadow: 0 8px 10px -10px lighten($darkest, 50%);
  }

  a {
    text-decoration: none;
  }

  #card-title a {
    color: $darkest;
    font-weight: 400;
    font-size: 24px;
  }

  #card-description a {
    color: $darker;
    font-weight: 300;
    font-size: 16px;
  }

  #card-footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    #author-photo {
      margin-right: 16px;
    }

    #footer-details a {
      color: lighten($darker, 40%);
      font-weight: 100;
      font-size: 14px;
    }
  }
}
</style>
