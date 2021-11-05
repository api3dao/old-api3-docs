<!--
-->

<template>
  <span>
    <ul>
      <li>
        <a
          :href="'https://hub.docker.com/r/api3/airnode-deployer/tags'"
          target="_docker-hub"
          >Airnode deployer images
          <ExternalLinkImage />
        </a>
      </li>

      <li>
        <a
          :href="'https://hub.docker.com/r/api3/airnode-client/tags'"
          target="_docker-hub"
          >Airnode client images
          <ExternalLinkImage />
        </a>
      </li>
    </ul>

    <p>
      The deployer and client images must pair with a particular
      <code>nodeVersion</code>
      from your config.json file. However there is a
      <code>latest</code> version provided for convenience which always requires
      the highest <code>nodeVersion</code> available at the time of its
      execution.
    </p>

    <table>
      <tr>
        <th>Deployer or Client Image</th>
        <th>nodeVersion</th>
      </tr>
      <tr>
        <td>0.2.2</td>
        <td>0.2.2</td>
      </tr>
      <tr>
        <td>latest</td>
        <td>0.2.2</td>
      </tr>
    </table>
    <div style="font-size: small; margin-left: 20px; margin-top: -10px">
      The above table updates when new images are released.
    </div>
  </span>
</template>
