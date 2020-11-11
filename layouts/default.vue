<template>
  <div class="container">
    <div class="header-container">
      <Header id="header" />
    </div>
    <div class="content-container">
      <Nuxt />
    </div>
    <div class="footer-container">
      <Footer id="footer"/>
    </div>
  </div>
</template>

<style
  lang="scss"
  scoped>
.container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 60px 2fr;
  grid-auto-rows: min-content;
  grid-column-gap: 8px;
  grid-row-gap: 8px;

  .header-container {
    grid-column: 1 / 4;
    grid-row: 1;
  }

  .content-container {
    grid-column: 1 / 4;
    grid-row: 2;
  }

  .footer-container {
    grid-column: 1;
    grid-row: 3;
    display: grid;
    grid-template-columns: 2fr 8fr 2fr;
    grid-template-rows: 1fr;
    grid-column-gap: 8px;

    #footer {
      grid-column: 2;
      grid-row: 1;
    }
  }
}
</style>
