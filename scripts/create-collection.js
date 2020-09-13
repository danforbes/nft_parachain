const { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');
const fs = require('fs');

function submitTransaction(sender, transaction) {
  return new Promise(async function(resolve, reject) {
    try {
      const unsub = await transaction
      .signAndSend(sender, ({ status, events }) => {
        console.log(`Current tx status is ${status}`);
        if (status.isInBlock || status.isFinalized) {
          resolve(events);
          unsub();
        }
      });
    }
    catch (e) {
      reject(e.toString());
    }
  });
}

async function createCollectionAsync(api, owner) {
  const name = [...Buffer.from("Substratekitties")];
  const description = [...Buffer.from("Create kitties in a decentralized digital realm.")];
  const tokenPrefix = [...Buffer.from("KTY")];

  const createCollection = api.tx.nft.createCollection(name, description, tokenPrefix, {"NFT": 3});

  console.log("=== Create collection ===");
  const createEvents = await submitTransaction(owner, createCollection);
  const collectionId = createEvents[0].event.data[0].toNumber();
  console.log(`=== Created collection ${collectionId} ===`);

  const schema = [...Buffer.from("https://example.com/collections/{collectionId}/item/{itemId}")];
  const setSchema = api.tx.nft.setOffchainSchema(collectionId, schema);

  console.log("=== Set schema ===");
  const schemaEvents = await submitTransaction(owner, setSchema);
  const schemaSuccess = schemaEvents.length === 1 && `${schemaEvents[0].event.index}` === "0x0000";
  console.log(`=== Schema ${schemaSuccess ? "" : "NOT "}successfully set ===`);
}

async function main() {
  require('dotenv').config();

  const provider = new WsProvider(process.env.NFT_WS_URI);
  const types = JSON.parse(fs.readFileSync("types.json"));
  const api = await ApiPromise.create({ provider, types });

  const keyring = new Keyring({ type: 'sr25519' });
  const owner = keyring.addFromUri(process.env.NFT_ADMIN_SEED);
  console.log("Collection owner address: ", owner.address);
  
  await createCollectionAsync(api, owner);
}

main().catch(console.error).finally(() => process.exit());
