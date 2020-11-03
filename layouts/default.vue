<template>
  <div class="container">
    <div class="header-container">
      <div class="header">Menu</div>
    </div>
    <div class="content-container">
      <div class="left-side"></div>
      <div class="content">
        <Nuxt />
      </div>
      <div class="right-side"></div>
    </div>
    <div class="footer-container">
      <div class="footer">
        Footer
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 60px 2fr 1fr;
  grid-auto-rows: min-content;
  grid-column-gap: 8px;
  grid-row-gap: 8px;

  .header-container {
    background-color: $primary;
    grid-column: 1 / 4;
    grid-row: 1;
    display: grid;
    grid-template-columns: 2fr 8fr 2fr;
    grid-template-rows: 60px;
    grid-column-gap: 8px;

    .header {
      grid-column: 2;
      grid-row: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: white;
    }
  }

  .content-container {
    grid-column: 1 / 4;
    grid-row: 2;
    display: grid;
    grid-template-columns: 2fr 8fr 2fr;
    grid-template-rows: 1fr;
    grid-column-gap: 8px;

    .content {
      box-shadow: 4px 4px 10px -6px $darkest, -4px 4px 10px -6px $darkest;
    }
  }

  .footer-container {
    grid-column: 1;
    grid-row: 3;
    display: grid;
    grid-template-columns: 2fr 8fr 2fr;
    grid-template-rows: 1fr;
    grid-column-gap: 8px;

    .footer {
      grid-column: 2;
      grid-row: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
}
</style>
