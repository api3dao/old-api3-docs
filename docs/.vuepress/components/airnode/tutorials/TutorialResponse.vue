<!--
  Used by the quick-start-tutorials to detail the response from the 
  CoinGecko /simple/price endpoint.
-->

<template>
  <div>
    <p>
      Note the JSON response <code>values</code> is the API3 price multiplied by
      <code>1e6</code>, which results from setting the
      <code>_times</code> reserved parameter to <code>1000000</code> in
      <code>config.json</code>. This manipulation is necessary in order to
      correctly handle floating point numbers.
    </p>

    <ul>
      <li class="tutorial-line-response-li-bottom">
        <code>encodedValue</code>: This is the only field that gets sent to a
        requester (smart contract) on-chain. It is the encoded bytes of the
        <code>values</code> field. A requester must decode it to read the
        response values.
      </li>
      <li class="tutorial-line-response-li-bottom">
        <code>rawValue</code>: The API's response to Airnode. Presented by the
        HTTP gateway as a convenience. This is never sent to a requester
        on-chain.
      </li>
      <li>
        <code>values</code>: A array of values after they are
        <router-link :to="encodeURL">extracted and converted</router-link>
        from the <code>encodedValue</code> to the target type, in this case
        <code>api3.usd</code> from <code>_path</code> in
        <router-link :to="reservedURL">reservedParameters</router-link>. The
        HTTP gateway provides this as a convenience and never sends the decoded
        <code>values</code> to a requester on-chain.
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TutorialResponse',
  data: () => ({
    reservedURL: '/ois/v1.0.0/reserved-parameters.html#path',
    encodeURL: '../../../reference/packages/adapter.html#conversion',
  }),
};
</script>

<style scoped>
.tutorial-line-response-li-bottom {
  margin-bottom: 12px;
}
</style>
