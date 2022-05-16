<!--
Provide a header to the # {{$frontmatter.title}}
of every page.
-->

<template>
  <div id="api3-title-span">
    <span style="font-size: small">📂&nbsp;</span><slot></slot>
  </div>
</template>

<script>
export default {
  name: 'title-span',
};
</script>

<style scoped>
#api3-title-span {
  opacity: 0.5;
  margin-bottom: -70px;
  color: green;
  font-weight: 900;
}
</style>
