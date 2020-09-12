# NFT-Enabled Version of @polkadot/apps

[Original README](https://github.com/polkadot-js/apps/blob/master/README.md)

## Project Description

This is an addition to Polkadot AppsUI that enables interaction with NFT Chain and primarity acts as an NFT Wallet that allows users to:
* Search collections and add them to their favorites list
* Choose Polkadot{.js} address and see NFT tokens owned by this address
* See images associated with NFT tokens. Information about where to find these images is stored on-chain, so that any 3rd party collection creator who obeys off-chain schema can create collections that are properly displayed in this wallet
* Transfer tokens to someone else
* Work with Re-Fungible tokens: 
  * Transfer only portion of NFT token, if collection allows token division
  * See what portion of token this user owns. For example, fractional balance of "0.5" means that address owns half of the token
  * See a larger image of the token on the details screen

Also, this UI includes [custom UI types](https://github.com/usetech-llc/nft_parachain#ui-custom-types) needed to work with NFT Pallet.

This UI is meant to work with Unique Network, which currently has TestNet deployed with public node available at wss://unique.usetech.com

Please see the complete [Hackusama Walk-Through Guide](https://github.com/usetech-llc/nft_parachain/blob/master/doc/hackusama_walk_through.md) for demonstration of all features of Unique Network.

## Hackusama Update

All changes to the originally forked AppsUI were made for Hackusama submission.