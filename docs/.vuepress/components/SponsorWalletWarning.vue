<!--
This is a POST pre-alpha component. Notice the use of 
"sponsor" and not "requester" related to the designated wallet.

Use only in version >= v0.2
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
    <!--div style="color:#b29400;font-weight:600;font-size:medium;">
        Sponsor Wallets
      </div-->
    <div style="padding-top: 8px">
      Sponsors should not fund a <code>sponsorWallet</code> with more then they
      can trust the Airnode with, as the Airnode controls the private key to the
      <code>sponsorWallet</code>. The deployer of such Airnode undertakes no
      custody obligations, and the risk of loss or misuse of any excess funds
      sent to the <code>sponsorWallet</code> remains with the sponsor.
    </div>
  </div>
</template>
