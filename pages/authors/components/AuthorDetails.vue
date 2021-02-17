<template>
  <div class="authorDetails">
    <div class="authorPhotoContainer">
      <LazyPhoto
        :src="author.photo"
        alt="Author photo"
        classes="authorPhoto"
      />
    </div>

    <h1 class="authorName">
      {{ author.name }}
    </h1>

    <p class="authorBio">
      {{ author.bio }}
    </p>

    <ul class="socialList">
      <li v-if="author.social.linkedin !== null" class="socialItem">
        <a
          :href="author.social.linkedin.url"
          target="_blank"
          class="socialLink">
          <span class="socialIcon icon-linkedin" />
        </a>
      </li>
      <li v-if="author.social.twitter !== null" class="socialItem">
        <a
          :href="author.social.twitter.url"
          target="_blank"
          class="socialLink">
          <span class="socialIcon icon-twitter" />
        </a>
      </li>
      <li v-if="author.social.stackoverflow !== null" class="socialItem">
        <a
          :href="author.social.stackoverflow.url"
          target="_blank"
          :alt="`${author.name}`"
          class="socialLink">
          <span class="socialIcon icon-stackoverflow" />
        </a>
      </li>
      <li v-if="author.social.github !== null" class="socialItem">
        <a
          :href="author.social.github.url"
          target="_blank"
          class="socialLink">
          <span class="socialIcon icon-github" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AuthorDetails',
  props: ['author']
};
</script>

<style lang="scss">
.authorDetails {
  @apply relative justify-start mt-24 mb-4 p-8 pt-20 w-full bg-ti-blue rounded text-white;

  .authorPhotoContainer {
    @apply inline absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 text-center;

    .authorPhoto {
      @apply box-content w-28 rounded-full bg-white border-8 border-white;
    }
  }

  .authorName {
    @apply text-2xl text-center mb-6;
  }

  .authorBio {
    @apply mx-auto w-1/2 text-center mb-2 mb-6 font-light;
  }

  .socialList {
    @apply text-center;

    .socialItem {
      @apply mx-4 text-center inline-block;

      .socialLink {
        @apply inline-block;

        .socialIcon {
          @apply text-3xl text-white fill-current inline-block;
        }
      }
    }
  }
}

.dark {
  .authorDetails {
    @apply bg-gradient-to-tl from-ti-green to-ti-blue;

    .authorPhotoContainer {
      .authorPhoto {
        @apply bg-gray-800 border-gray-800;
      }
    }
  }
}

@screen md {
  .authorDetails {
    .authorPhoto {
      @apply border-4;
    }
  }
}
</style>
