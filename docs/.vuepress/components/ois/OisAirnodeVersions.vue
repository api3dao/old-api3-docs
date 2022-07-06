<!--
  This component displays a list of OIS versions and the Airnodes version they 
  relate to.
-->

<template>
  <div>
    Be sure to use the correct OIS version for the Airnode version you are
    deploying.
    <table>
      <th>OIS version</th>
      <th>OIS latest</th>
      <th>Compatible Airnode versions</th>
      <tr>
        <td>1.0.x</td>
        <td>
          <a href="https://github.com/api3dao/ois/tree/v1.0.0" target="_blank"
            >1.0.0 <ExternalLinkImage
          /></a>
        </td>
        <td>0.2.x through 0.7.x</td>
      </tr>
      <tr>
        <td>1.1.x</td>
        <td>
          <a href="https://github.com/api3dao/ois/tree/v1.1.1" target="_blank"
            >1.1.1 <ExternalLinkImage
          /></a>
        </td>
        <td>0.8.x</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'OisAirnodeVersions',
};
</script>
