<template>
  <div style="color:#6b5900; 
      backgroundColor: rgba(255,229,100,0.3);
      border-left:8px solid #e7c000;
      padding:20px;
      display: block;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      line-height: 1.7;">
      <details>
        <summary style="color:#b29400;font-weight:600;font-size:medium;">
          Permissions: Linux/Mac/WSL2
        </summary>
        <p style="padding-top:8px;">
          Normally the deployer image is run by the user root. This may cause 
          permission issues when the <code>receipt.json</code> file is generated. 
          Optionally you can specify the 
          <a href="https://en.wikipedia.org/wiki/User_identifier" target="_blank">UID (user identifier)</a>
          and
          <a href="https://en.wikipedia.org/wiki/Group_identifier" target="_blank">GID (group identifier)</a> 
          that the deployer image should use. Do so by setting the 
          environment variables USER_ID and GROUP_ID, otherwise omit line #3 below 
          <code>-e USER_ID=$(id -u) -e GROUP_ID=$(id -g) \</code>.
        </p>
      </details>
  </div>
</template>
