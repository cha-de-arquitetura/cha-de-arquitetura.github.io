<template>
  <div>
    <h1>My Blog</h1>
    <template v-if="article">
      <nuxt-content :document="article" />
    </template>
    <template v-else>
      <ul>
        <li v-for="item in items" :key="item.slug">
          <nuxt-link :to="{ name: 'blog-slug', params: { slug: item.slug } }">

            {{ item.title }}

          </nuxt-link>
        </li>
      </ul>
      <pre>{{ items }}</pre>
    </template>
  </div>
</template>

<script>
export default {
  name: 'BlogIndex',
  async asyncData({ $content, params }) {
    const data = {
      items: null,
      article: null
    };

    if (params.slug == null) {
      data.items = await $content('articles').without(['body']).fetch();
    } else {
      data.article = await $content(`articles/${params.slug}`).fetch();
    }

    return data;
  }
}
</script>
