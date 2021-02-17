<template>
  <div class="layoutContainer">
    <div class="headerContainer">
      <Header/>
    </div>
    <div class="contentContainer">
      <Nuxt />
    </div>
    <div class="footerContainer">
      <Footer />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layoutContainer {
  @apply w-full bg-white;

  .headerContainer {
    @apply container mx-auto p-4 bg-white;
  }

  .contentContainer {
    @apply p-4;
  }

  .footerContainer {
    @apply w-full mt-4 mb-2;
  }
}

.dark {
  .layoutContainer {
    @apply bg-gray-800;

    .headerContainer {
      @apply bg-gray-800;
    }
  }
}

@screen lg {
  .layoutContainer {
    .headerContainer {
      @apply p-2;
    }

    .contentContainer {
      @apply p-2;
    }
  }
}
</style>
