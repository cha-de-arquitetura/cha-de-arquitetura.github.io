<template>
  <div class="content-container">
    <div class="left-side">
      <slot name="left"/>
    </div>
    <div class="content">
      <slot/>
    </div>
    <div class="right-side">
      <slot name="right"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThreeColumnContent'
};
</script>

<style lang="scss" scoped>
.content-container {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 8px;
}
</style>
