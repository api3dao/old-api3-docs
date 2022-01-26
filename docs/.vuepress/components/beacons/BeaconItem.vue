<template>
  <div v-show="beacon.show === true" class="beacon-box" :key="beacon.beaconId">
    <div class="provider">{{ beacon.provider }}</div>
    <div class="beacon-name">{{ beacon.name }}</div>
    <div class="beacon-desc beacon-sub-line">
      {{ beacon.desc }}
    </div>
    <div class="beacon-id beacon-sub-line">
      {{ beacon.beaconId }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'BeaconItem',
  props: ['beacon'],
};
</script>

<style>
.provider {
  float: right;
  padding-right: 10px;
  color: gray;
  font-size: x-small;
  font-weight: bold;
}
.beacon-box {
  padding-top: 5px;
  padding-left: 20px;
  padding-bottom: 10px;
  border: solid lightgrey 1px;
  border-radius: 0.5em;
  margin-bottom: 5px;
  max-width: 550px;
}
.beacon-sub-line {
  padding-left: 10px;
  font-size: small;
  border-left: solid lightgrey 3px;
}
.beacon-desc {
  color: gray;
}
.beacon-name {
  font-weight: bold;
  margin-left: -5px;
  margin-bottom: 5px;
}
.beacon-id {
  max-width: 550px;
  overflow-wrap: break-word;
}
</style>
