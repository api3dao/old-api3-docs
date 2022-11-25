---
title: Registration
folder: How to Guides
docSetName: ChainAPI
tags:
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

<!-- If you change the following paragraph, change it in the README. -->

ChainAPI identifies you through a wallet you own by way of
[MetaMask](https://metamask.io). ChainAPI will ask you to sign a message within
MetaMask for a particular wallet account proving your ownership of the account.

During registration you will be prompted for your email address which will be
linked to your ChainAPI account. When you return to ChainAPI, you'll be able to
choose whether to login using your email address or by connecting with your
Metamask wallet.

## Create an Account

:::tip Existing Metamask Users

If you are an existing MetaMask user, it is recommended that you create a
separate, dedicated MetaMask wallet specifically for ChainAPI using a new seed
phrase.

:::

1. **Connect:** Click on the **Register** button to create a new account and
   register and email address. If you do not have MetaMask installed you will be
   prompted to do so. <br/><img src="../assets/images/connect.png" width="25%"/>
   <br/>

---

2. **Create Wallet**: (new MetaMask installations only) - If you have just
   installed MaskMask, it will open a web page to create or open an existing
   wallet. <br/><img src="../assets/images/choose-wallet.png" width="70%"/>
   <br/>Once the new wallet is created, return to the ChainAPI landing page,
   refresh it and select the **Register** button again.

---

3. **Signature Request**: When MetaMask opens you may be asked to select an
   account before the signature request prompt appears. For newly created
   wallets there will only be one account, the default account though others can
   be added. For existing wallets select which account you would like to use.
   Remember the account you select.

   You will be prompted to authorize a signature request which does not require
   any cryptocurrency. By signing this request, you prove ownership of the
   wallet account.

---

4. **Register Email**: After the MetaMask popup closes you may be prompted for
   your email address if the MetaMask account you selected is not recognized by
   ChainAPI. ChainAPI associates your email address with your MetaMask wallet
   account for future communications.

   An email will be sent to you asking you to confirm ownership of the email
   address. After performing the confirmation ChainAPI should show its **Getting
   Started** page.

## Login

On a subsequent visit to ChainAPI, you'll need to login using one of these two
methods.

### Login with Email

Enter the email address you confirmed during registration. An email will be sent
to you containing a magic link. Click on this link to login to your account. The
magic link will expire after one hour.

### Connect with Metamask

When using this option, be sure to use same account that you registered with.
Opening MetaMask will show you the account currently selected which is not
necessarily the same account you registered with.

---
