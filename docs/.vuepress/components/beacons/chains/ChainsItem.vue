<!--
  This component displays an individual chain.
-->

<template>
  <div>
    <div class="bc-chains-row">
      <!-- LEFT column -->
      <div class="bc-chains-column-left" style="background-color: black">
        <img :src="chain.logoPath" width="45px;" />
      </div>

      <!-- RIGHT column -->
      <div class="bc-chains-column-right">
        <span style="font-size: x-small"> {{ chain.id }} </span>
        <span class="bc-chains-name"
          ><a :href="chain.explorerUrl">{{ chain.name }}</a
          ><ExternalLinkImage />
        </span>

        <!-- Contract list -->
        <div
          class="bc-chains-contract-address"
          v-for="(address, key) in chain.contracts"
          v-bind:key="address"
        >
          {{ key }}: <span>{{ address }}</span
          ><CopyIcon :text="address" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChainsItem',
  props: ['chain'],
};
</script>

<style>
.bc-chains-row {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.bc-chains-column-left {
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 50px;
  min-width: 50px;
  margin-right: 10px;
}
.bc-chains-column-right {
  display: flex;
  flex-direction: column;
  overflow-wrap: anywhere;
  flex: 1;
}

.bc-chains-name {
  font-size: large;
  font-weight: bold;
  margin-bottom: 5px;
  cursor: pointer;
}
.bc-chains-contract-address {
  font-family: courier;
  font-size: small;
}
</style>
