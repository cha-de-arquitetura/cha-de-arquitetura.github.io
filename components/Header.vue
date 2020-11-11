<template>
  <div class="header-container">
    <div class="header">
      <div>Logo</div>
      <div>langs</div>
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
  display: grid;
  grid-template-columns: 2fr 8fr 2fr;
  grid-template-rows: 60px;
  grid-column-gap: 8px;

  .header {
    grid-column: 2;
    grid-row: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color: $darkest;
    border-bottom: 1px solid lighten($darkest, 60%);
  }

  &.floating {
    box-shadow: 0 9px 18px -8px $darkest;

    .header {
      border-bottom: 0;
    }
  }
}
</style>
