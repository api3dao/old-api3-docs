# Creating a Requester

Each requester needs to create a requester record, and get assigned a requester index. This is fairly early, using [`airnode-admin`](https://github.com/api3dao/airnode-admin#create-requester). A requester index grants you a separate [designated wallet](/request-response-protocol/designated-wallet.md) for each provider, which you can use [`airnode-admin`](https://github.com/api3dao/airnode-admin#derive-designated-wallet) to derive for a specific provider. You will need to fund the address of thet designated wallet that you have derived if you want the provider to respond to the requests that your client contracts will make.

