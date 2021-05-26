<template>
  <div>
    
    <table v-show="version=='0.1.0'">
      <tr>
        <th>Blockchain</th>
        <th>ID</th>
        <th>AirnodeRRP Contract ID</th>
      </tr>
      <tr>
        <td>mainnet</td><td>1</td><td>...</td>
      </tr>
      <tr>
        <td>ropsten</td><td>3</td><td>0xF6d2675468989387e96127546e0CBC9A384fa418</td>
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
    <h5 style="margin-top:-14px;color:gray;max-width:550px;">
      Airnode version: {{version}}. This table shows EVM-compatible blockchains that 
      the protocol contract has been deployed to as well as the contract ID of each.
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