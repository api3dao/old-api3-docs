<template>
  <div>
    <h4>AirnodeRRP.sol</h4>
    <table v-show="version=='0.1.0'">
      <tr>
        <th>Blockchain</th>
        <th>ID</th>
        <th style="min-width:390px;">Public Address</th>
      </tr>
      <tr>
        <td style="min-width:100px;">mainnet</td>
        <td style="min-width:27px;">1</td><td>...</td>
      </tr>
    </table>
    <details class="collapse-chain-box">
      <summary class="collapse-chain-summary"> View more...</summary>
      <table v-show="version=='0.1.0'">

        <tr style="margin-top:20px;">
          <td style="min-width:100px;">ropsten</td>
          <td style="min-width:27px;">3</td>
          <td>0xF6d2675468989387e96127546e0CBC9A384fa418</td>
        </tr>
        <tr>
          <td>rinkeby</td><td>4</td><td>...</td>
        </tr>
    
        <tr>
          <td>goerli</td><td>5</td><td>...</td>
        </tr>
        <tr>
          <td>kovan</td><td>42</td><td>...</td>
        </tr>
        <tr>
          <td>xdai</td><td>100</td><td>...</td>
        </tr>
      </table>
    </details>
    
    <h5 style="margin-top:-10px;color:gray;max-width:680px;">
      Airnode version: {{version}}. This table shows EVM-compatible blockchains that 
      the AirnodeRrp.sol protocol contract has been deployed to as well as the public address of each.
    </h5>
  </div>
</template>

<script>
  export default {
    name: 'chains-supported',
    props:{
      version:String,

    }
  }
</script>

<style scoped>
.collapse-chain-box{
  margin-top:-5px;
  padding-bottom:20px;
}

.collapse-chain-summary{
  cursor:pointer;
  font-weight:bold;
  margin-left:20px;
}
</style>