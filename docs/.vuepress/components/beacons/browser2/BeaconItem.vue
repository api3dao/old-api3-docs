<template>
  <div class="b2-beacon-item-box" :key="beacon.beaconId">
    <div class="b2-beacon-item-provider">
      <a :href="beacon.url">{{ beacon.apiName }}</a> <ExternalLinkImage />
    </div>

    <div
      class="b2-beacon-item-name"
      style="cursor: pointer; user-select: none"
      @click="setChildPageData(beacon)"
    >
      <router-link to="./beacon-child-detail.html"
        ><span style="opacity: 0.8"
          ><Badge
            type="junk"
            :text="(cnt + 1).toString()"
            vertical="middle" /></span
        >&nbsp;&nbsp;{{ beacon.templateName }}</router-link
      >
    </div>
    <div class="b2-beacon-item-description">
      {{ beacon.description }}
    </div>
    <div class="b2-beacon-item-ids">
      ID: {{ beacon.beaconId }}
      <!-- COPY ICON 
        The style applied (style="opacity: 60%; width: 12px") is very
        important. If included in the class it will work on the dev 
        server but not on a production build.
      -->
      <span style="display: inline-block; width: 18px">
        <img
          :id="'copy-icon-' + beacon.beaconId"
          v-on:click="copyAddress(beacon.beaconId)"
          src="/img/copy.png"
          class="b2-beacon-item-copy-icon"
          style="opacity: 60%; width: 12px"
        />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BeaconItem',
  props: ['beacon', 'cnt'],
  methods: {
    setChildPageData(beacon) {
      let childPageData = {
        pageTitle: beacon.templateName,
        beacon: beacon,
      };
      localStorage.setItem('childPageData', JSON.stringify(childPageData));
    },
    copyAddress(id) {
      //var copyText = document.getElementById(id).textContent;
      var copyIcon = document.getElementById('copy-icon-' + id);
      copyIcon.style.opacity = '100%';
      copyIcon.style.width = '20px';
      window.setTimeout(this.setCopiedTimeout, 700, copyIcon);

      if (navigator && navigator.clipboard && navigator.clipboard.writeText)
        navigator.clipboard.writeText(id);
    },
    setCopiedTimeout(element) {
      element.style.opacity = '60%';
      element.style.width = '12px';
    },
  },
};
</script>

<style scoped>
.b2-beacon-item-box {
  padding-top: 5px;
  padding-left: 5px;
  padding-bottom: 10px;
  border: solid lightgrey 1px;
  border-radius: 0.5em;
  margin-bottom: 5px;
  max-width: 620px;
}
.b2-beacon-item-provider {
  float: right;
  padding-right: 15px;
  color: gray;
  font-size: small;
  font-weight: bold;
}
.b2-beacon-item-name {
  font-weight: bold;
  font-size: large;
  margin-left: 4px;
  margin-bottom: 5px;
}
.b2-beacon-item-description {
  font-size: medium;
  color: gray;
  padding-left: 10px;
}
.b2-beacon-item-ids {
  margin-top: 3px;
  font-size: small;
  max-width: 600px;
  overflow-wrap: break-word;
  padding-left: 10px;
}
.b2-beacon-item-copy-icon {
  margin-left: 5px;
  cursor: pointer;
  height: 11px;
}
</style>
