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
    widthOverride: undefined, // If a width is passed do not resize chart, see mounted
    heightOverride: undefined,
  },
  data: () => ({
    width: 500, // 450, 560, 500
    height: 300, // 200, 315, 300
  }),
  methods: {
    setPlayerSize() {
      if (window.innerWidth < 300) {
        this.width = 180;
        this.height = 130;
      } else if (window.innerWidth < 361) {
        // Galaxy 8
        this.width = 260;
        this.height = 200;
      } else if (window.innerWidth < 376) {
        // iPhone SE
        this.width = 270;
        this.height = 207;
      } else if (window.innerWidth < 391) {
        // iPhone 12
        this.width = 345;
        this.height = 257;
      } else if (window.innerWidth < 413) {
        // Galaxy S20
        this.width = 370;
        this.height = 257;
      } else if (window.innerWidth < 455) {
        this.width = 285;
        this.height = 215;
      } else if (window.innerWidth < 780) {
        this.width = 330;
        this.height = 235;
      } else if (window.innerWidth < 814) {
        this.width = 380;
        this.height = 260;
      } else if (window.innerWidth < 930) {
        this.width = 400;
        this.height = 275;
      } else if (window.innerWidth < 1060) {
        this.width = 480;
        this.height = 315;
      } else {
        this.width = 560;
        this.height = 300;
      }
    },
  },
  mounted() {
    // If a width is passed do not resize chart
    if (!this.widthOverride) {
      this.setPlayerSize();
      window.addEventListener('resize', () => {
        this.setPlayerSize();
      });
    } else {
      this.width = this.widthOverride;
      this.height = this.heightOverride;
    }
  },
};
</script>
