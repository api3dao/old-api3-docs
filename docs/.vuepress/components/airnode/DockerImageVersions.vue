<!--
Shows a list of Docker images for each deployed nodeVersion. Only useful 
inside the Airnode doc set.
-->

<template>
  <span>
    <p>
      The docker images must pair with a particular
      <router-link class="route-link" :to="path"> nodeVersion </router-link>
      from your config.json file. However there is a
      <code>latest</code> version provided for convenience which always requires
      the highest <code>nodeVersion</code> available at the time of its
      execution.
    </p>

    <table>
      <tr>
        <th>Docker Images</th>
        <th>nodeVersion</th>
      </tr>
      <tr>
        <td>0.2.2</td>
        <td>0.2.2</td>
      </tr>
      <tr>
        <td>0.3.0</td>
        <td>0.3.0</td>
      </tr>
      <tr>
        <td>0.3.1</td>
        <td>0.3.1</td>
      </tr>
      <tr>
        <td>0.4.0</td>
        <td>0.4.0</td>
      </tr>
      <tr>
        <td>0.4.1</td>
        <td>0.4.1</td>
      </tr>
      <tr>
        <td>0.5.0</td>
        <td>0.5.0</td>
      </tr>
      <tr>
        <td>0.5.2</td>
        <td>0.5.2</td>
      </tr>
      <tr>
        <td>0.6.0</td>
        <td>0.6.0</td>
      </tr>
      <tr>
        <td>0.6.2</td>
        <td>0.6.2</td>
      </tr>
      <tr>
        <td>0.6.4</td>
        <td>0.6.4</td>
      </tr>
      <tr>
        <td>0.6.5</td>
        <td>0.6.5</td>
      </tr>
      <tr>
        <td>0.6.6</td>
        <td>0.6.6</td>
      </tr>
      <tr>
        <td>0.7.2</td>
        <td>0.7.2</td>
      </tr>
      <tr>
        <td>0.7.3</td>
        <td>0.7.3</td>
      </tr>
      <tr>
        <td>latest</td>
        <td>0.7.3</td>
      </tr>
    </table>
    <div style="font-size: small; margin-left: 20px; margin-top: -10px">
      The above table updates when new images are released.
    </div>
  </span>
</template>

<script>
export default {
  name: 'docker-image-versions',
  data: () => ({
    path: '',
  }),
  mounted() {
    this.$nextTick(function () {
      this.path =
        '/' +
        this.$route.path.split('/')[1] +
        '/' +
        this.$route.path.split('/')[2] +
        '/reference/deployment-files/config-json.html#nodeversion';
    });
  },
};
</script>
