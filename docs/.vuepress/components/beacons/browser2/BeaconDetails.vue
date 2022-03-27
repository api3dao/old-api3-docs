<template>
  <div class="b2-beacon-tab-box">
    <hr />

    <!-- TABS -->
    <div class="b2-tab">
      <button
        :id="'templateTab' + beacon.beaconId"
        v-on:click="openPane($event, 'templatePane' + beacon.beaconId)"
      >
        Template ID
      </button>
      <button
        :id="'paramsTab' + beacon.beaconId"
        v-on:click="openPane($event, 'paramsPane' + beacon.beaconId)"
      >
        Decoded Parameters
      </button>
      <button
        :id="'graphTab' + beacon.beaconId"
        v-on:click="openPane($event, 'graphPane' + beacon.beaconId)"
      >
        Graph
      </button>
    </div>

    <!-- PANES -->
    <div
      :id="'templatePane' + beacon.beaconId"
      class="b2-tabcontent"
      style="display: block"
    >
      <br />
      <div class="b2-ids">{{ beacon.templateId }}</div>
    </div>

    <div :id="'paramsPane' + beacon.beaconId" class="b2-tabcontent">
      <!-- prettier-ignore -->
      <pre style="height: 300px; overflow: scroll;"><code>"decodedParameters": {{beacon.decodedParameters}}</code></pre>
    </div>

    <div :id="'graphPane' + beacon.beaconId" class="b2-tabcontent">
      <div v-if="beacon.grafanaURL">
        <img src="./chart_line.png" style="border: lightgrey 2px solid" />
        <img src="./graph_fork.png" style="border: lightgrey 2px solid" />
      </div>
      <div>
        <Grafana v-if="loadGraph === true" :src="beacon.grafanaURL" />
      </div>
      <div v-if="!beacon.grafanaURL" style="padding: 59px">
        No graph data available.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BeaconDetails',
  props: ['beacon'],
  data: () => ({
    loadGraph: false,
  }),
  mounted() {
    this.$nextTick(async function () {
      // Activate the templateTab by default
      document.getElementById('templateTab' + this.beacon.beaconId).className +=
        ' active';
    });
  },
  methods: {
    openPane(evt, pane) {
      // Declare all objects
      const templateTab = document.getElementById(
        'templateTab' + this.beacon.beaconId
      );
      const paramsTab = document.getElementById(
        'paramsTab' + this.beacon.beaconId
      );
      const graphTab = document.getElementById(
        'graphTab' + this.beacon.beaconId
      );
      const templatePane = document.getElementById(
        'templatePane' + this.beacon.beaconId
      );
      const paramsPane = document.getElementById(
        'paramsPane' + this.beacon.beaconId
      );
      const graphPane = document.getElementById(
        'graphPane' + this.beacon.beaconId
      );

      // PANES
      templatePane.style.display = 'none';
      paramsPane.style.display = 'none';
      graphPane.style.display = 'none';
      document.getElementById(pane).style.display = 'block';

      // TABS
      templateTab.className = '';
      paramsTab.className = '';
      graphTab.className = '';
      evt.currentTarget.className += 'active';

      // GRAPH (if available)
      if (
        pane === 'graphPane' + this.beacon.beaconId &&
        this.beacon.grafanaURL
      ) {
        this.loadGraph = true;
      }
    },
  },
};
</script>
