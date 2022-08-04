<!--
Parent of SearchBox2.vue. Opens a search modal.

- Opens a modal passing.
- Receives emit message from child component to close modal (@clicked="onChildClick")
-->

<template>
  <span>
    <button
      class="search2-btn"
      @click="openModal"
      style="margin-top: 3px; user-select: none"
    >
      <img
        src="./search.svg"
        width="24px"
        style="filter: brightness(0) invert(1)"
      />
    </button>
    <SearchBox2 v-if="showModal" @clicked="onChildClick" />
  </span>
</template>

<script>
import SearchBox2 from './SearchBox2';

export default {
  name: 'SearchBoxBtn2',
  components: {
    SearchBox2,
  },
  data: () => ({
    showModal: false,
    //showSearchIcon: false,
  }),
  methods: {
    openModal() {
      this.showModal = !this.showModal;
    },
    onChildClick() {
      // The modal will send a msg to close when user clicks outside the modal
      this.showModal = false;
    },
  },
  watch: {
    $route($event) {},
  },
  mounted() {
    this.$nextTick(function () {
      // If not the landing page show the search icon.
      //if (this.$route.path !== '/') this.showSearchIcon = true;
    });
  },
};
</script>

<style scoped>
button.search2-btn {
  outline: none;
  color: #7ce3cb;
  background-color: black;
  border: solid 0px black;
  font-weight: bold;
  font-size: medium;
  margin-right: 25px;
  cursor: pointer;
}
</style>
