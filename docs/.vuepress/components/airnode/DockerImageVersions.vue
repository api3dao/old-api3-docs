<!--
Shows a list of Docker images for each deployed nodeVersion. Only useful 
inside the Airnode doc set.
-->

<template>
  <span>
    <p>
      All images are available on DockerHub, see the links below. It is not
      required to download these manually as they are pulled automatically when
      running the provided Docker desktop commands.
    </p>

    <ul>
      <li>
        <a
          :href="'https://hub.docker.com/r/api3/airnode-deployer/tags'"
          target="_docker-hub"
          >Deployer images
          <ExternalLinkImage />
        </a>
      </li>

      <li>
        <a
          :href="'https://hub.docker.com/r/api3/airnode-client/tags'"
          target="_docker-hub"
          >Client images
          <ExternalLinkImage />
        </a>
      </li>

      <li>
        <a
          :href="'https://hub.docker.com/r/api3/airnode-admin/tags'"
          target="_docker-hub"
          >Admin CLI images
          <ExternalLinkImage />
        </a>
      </li>
    </ul>

    <p>
      All image versions must pair with the
      <router-link class="route-link" :to="path"> nodeVersion </router-link>
      from your Airnode config.json file. However there is a
      <code>latest</code> image version provided for convenience which always
      requires the highest <code>nodeVersion</code> found in the
      <code>config.json</code>
      file at the time of its execution.
    </p>
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
