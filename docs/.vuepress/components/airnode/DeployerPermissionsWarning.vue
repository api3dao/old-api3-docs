<template>
  <div class="custom-block warning">
    <p class="custom-block-title">Permissions: Linux/Mac/WSL2</p>
    <p>
      Normally the deployer image is run by the user root. This may cause
      permission issues when the <code>receipt.json</code> file is generated.
      Optionally you can specify the
      <a href="https://en.wikipedia.org/wiki/User_identifier" target="_blank"
        >UID (user identifier)</a
      >
      and
      <a href="https://en.wikipedia.org/wiki/Group_identifier" target="_blank"
        >GID (group identifier)</a
      >
      that the deployer image should use. Do so by setting the environment
      variables USER_ID and GROUP_ID, otherwise omit line #3 below
      <code>-e USER_ID=$(id -u) -e GROUP_ID=$(id -g) \</code>.
    </p>
  </div>
</template>
