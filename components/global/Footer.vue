<template>
  <div class="footer">
    <p class="description">
      &copy; {{ copyright }}, techissues.dev <br />
      {{ $t('footer.contact') }}: <a class="mailTo" href="mailto:team@techissues.dev" target="_blank">team@techissues.dev</a>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    copyright
  }
};

function copyright() {
  const start = 2020;
  const now = new Date().getFullYear();
  if (now > start) {
    return start;
  }
  return `${start} - ${now}`;
}
</script>

<style
  lang="scss"
  scoped>
.footer {
  @apply container mx-auto p-4 max-w-screen-lg;

  .description {
    @apply text-center;

    .mailTo {
      @apply text-ti-blue underline;
    }
  }
}

.dark {
  .footer {
    .description {
      @apply text-white;
    }
  }
}

@screen lg {
  .footer {
    @apply p-2;
  }
}
</style>
