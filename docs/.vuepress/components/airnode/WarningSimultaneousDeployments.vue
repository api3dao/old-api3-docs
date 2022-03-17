<!-- 
This component warns developers not to run multiple Airnode deployments simultaneously.

Use of .html in the removeLink property for the router-link element is intended. 

WARNING: Do not place HTML comment lines inside paragraph elements.
-->

<template>
  <div class="custom-block warning">
    <p class="custom-block-title">Warning about simultaneous deployments</p>
    <p style="padding-top: 8px">
      Avoid running multiple deployments simultaneously. Doing so might result
      in a broken deployment without the option to either fix or remove it. If a
      deployment fails to remove with the <code>remove</code> command try a
      <router-link :to="removeLink">Manual Removal</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: 'WarningSimultaneousDeployments',
  props: ['removeLink'],
};
</script>
