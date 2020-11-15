<template>
  <div>
    <h1>{{ author.name }}</h1>
    <p>{{ author.bio }}</p>
  </div>
</template>

<script>
import { ResolveContentLocale } from '~/utils/locale';

export default {
  name: 'Authors',
  nuxtI18n: {
    paths: {
      en: '/authors/:slug',
      pt: '/autores/:slug'
    }
  },
  async asyncData({ $content, params, app }) {
    const authorPath = `${ResolveContentLocale('authors', app.i18n)}/${params.slug}`

    const author = await $content(authorPath)
      .without(['body', 'text'])
      .fetch();

    return {
      author
    };
  }
};
</script>
