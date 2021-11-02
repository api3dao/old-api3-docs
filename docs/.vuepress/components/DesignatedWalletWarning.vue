<!--
This is ONLY a pre-alpha component. Notice the use of 
"requester" and not "sponsor" related to the designated wallet.
-->

<template>
  <div
    style="
      color: #6b5900;
      backgroundcolor: rgba(255, 229, 100, 0.3);
      border-left: 6px solid #e7c000;
      padding: 20px;
      display: block;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      line-height: 1.7;
    "
  >
    <div style="color: #b29400; font-weight: 600; font-size: medium">
      Designated Wallets
    </div>
    <div style="padding-top: 8px">
      Requesters should not fund a designated wallet with more then they can
      trust the Airnode with, as the Airnode controls the private key to the
      designated wallet. The deployer of such Airnode undertakes no custody
      obligations, and the risk of loss or misuse of any excess funds sent to
      the designated wallet remains with the requester.
    </div>
  </div>
</template>
