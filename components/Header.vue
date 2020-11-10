<template>
  <div class="header-container">
    <div class="header">
      Logo
      Articles
      About
      langs
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header'
};
</script>

<style
  lang="scss"
  scoped>
.header-container {
  background-color: $primary;
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
</style>
