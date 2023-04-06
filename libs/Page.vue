<template>
  <main class="page">
    <slot name="top" />

    <!-- wkande 04/2023 Added the following div element -->
    <div
      class="theme-default-content"
      style="margin-left: 7px; max-width: 600px; position: absolute; top: 30px"
    >
      <a href="https://dapi-docs.api3.org">
        <div
          style="
            opacity: 0.5;
            padding: 5px 25px 5px 25px;
            font-weight: 500;
            background-color: green;
            color: white;
            text-align: center;
            margin-bottom: 20px;
            border-radius: 0.3em;
          "
        >
          <span style="opacity: 1.5"
            >Newer release of the API3 Technical documentation available.</span
          >
        </div>
      </a>
    </div>

    <!-- wkande 04/2023 Added style="margin-top: 20px" to the following Content element -->
    <Content class="theme-default-content" style="margin-top: 20px" />
    <PageEdit />

    <PageNav v-bind="{ sidebarItems }" />
    <slot name="bottom" />
  </main>
</template>

<script>
import PageEdit from '@theme/components/PageEdit.vue';
import PageNav from '@theme/components/PageNav.vue';

export default {
  components: { PageEdit, PageNav },
  props: ['sidebarItems'],
};
</script>

<style lang="stylus">
@require '../styles/wrapper.styl'

.page
  padding-bottom 2rem
  display block
</style>
