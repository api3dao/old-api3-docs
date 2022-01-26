<template>
  <div
    style="
      color: #6b5900;
      backgroundcolor: rgba(255, 229, 100, 0.3);
      border-left: 8px solid #e7c000;
      padding: 20px;
      display: block;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      line-height: 1.7;
    "
  >
    <details>
      <summary style="color: #b29400; font-weight: 600; font-size: medium">
        Warning about simultaneous deployments
      </summary>
      <p style="padding-top: 8px">
        Avoid running multiple deployments simultaneously. Doing so might result
        in a broken deployment without the option to either fix or remove it. If
        a deployment fails to remove with the <code>remove</code> command try a
        <!-- Use of .html in the router-link element is intended. -->
        <router-link :to="removeLink">Manual Removal</router-link>.
      </p>
    </details>
  </div>
</template>

<script>
export default {
  name: 'WarningSimultaneousDeployments',
  props: ['removeLink'],
};
</script>
