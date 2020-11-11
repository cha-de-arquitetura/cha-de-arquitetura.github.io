<template>
  <ThreeColumnContent>
    <h1 id="article-title">{{ article.title }}</h1>

    <div id="article-description">
      <AuthorPhoto
        id="author-photo"
        :author="article.author.photo"/>
      <p>
        {{ new Intl.DateTimeFormat('pt-BR').format(new Date(article.createdAt)) }} <br/>
        {{ article.readTime }}
      </p>
    </div>

    <div id="article-content">
      <nuxt-content :document="article" />
    </div>
  </ThreeColumnContent>
</template>

<script>
import AuthorPhoto from '@/components/AuthorPhoto';
export default {
  name: 'BlogIndex',
  components: { AuthorPhoto },
  async asyncData({ $content, params }) {
    const article = await $content(`articles/${params.slug}`).fetch();

    article.author = (await $content('authors')
      .without(['body'])
      .where({ slug: article.author })
      .fetch())[0];

    return {
      article
    };
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

  #author-photo {
    float: left;
    margin-right: 16px;
    margin-bottom: 16px;
  }
}
</style>
