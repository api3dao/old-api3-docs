<template>
  <div class="beacon-display-box">
    <hr />
    <div class="beacon-id">Template ID: {{ beacon.templateId }}</div>
    <!-- prettier-ignore -->
    <pre><code>"decodedParameters": {{beacon.decodedParameters}}</code></pre>
  </div>
</template>

<script>
export default {
  name: 'BeaconDetails',
  props: ['beacon'],
};
</script>

<style>
.beacon-display-box {
  margin-right: 10px;
  display: block;
  padding-left: 11px;
}
</style>
