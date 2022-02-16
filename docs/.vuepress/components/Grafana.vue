<!--
Common video display component. 
-->
<template>
  <span>
    <iframe
      style="
        border: 1px solid lightgrey;
        box-shadow: 0px 5px 15px lightgrey;
        border-radius: 0.4em;
      "
      :src="src"
      :width="width"
      :height="height"
      frameborder="0"
    >
    </iframe>
  </span>
</template>

<script>
export default {
  name: 'Video',
  props: {
    src: String,
  },
  data: () => ({
    width: 560, // 450
    height: 315, // 200
  }),
  methods: {
    setPlayerSize() {
      if (window.innerWidth < 930) {
        this.width = null;
        this.height = null;
      } else {
        this.width = 560;
        this.height = 315;
      }
    },
  },
  mounted() {
    this.setPlayerSize();
    window.addEventListener('resize', () => {
      this.setPlayerSize();
    });
  },
};
</script>
