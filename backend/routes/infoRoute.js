const router = require("express").Router();

// .env Configiration
const dotenv = require("dotenv");
dotenv.config();

// Axios
const axios = require("axios");

// Helper function for selectedChain integer to correct format
const formatChain = (selectedChain) => {
  return {
    0: "eth",
    1: "avalanche",
    2: "bsc",
    3: "polygon",
  }[selectedChain];
};

// Helpers function for image url
const { imageSelector } = require("../helpers/imageSelector");

// Helpers function for formatting Moralis API URL correctly
const formatMoralisUrl = (address, selectedChain) => {
  const chain = formatChain(selectedChain);
  const url = `https://deep-index.moralis.io/api/v2/${address}/nft?chain=${chain}&format=decimal`;
  return url;
};

// Helper function NFT address individual information
const formatNFTMoralisURL = (address, selectedChain) => {
  const chain = formatChain(selectedChain);
  const url = `https://deep-index.moralis.io/api/v2/nft/${address}?chain=${chain}&format=decimal`;

  return url;
};

/*
    POST '/info'
        Returns formatted JSON with the following information:
            - User NFTs
            - User's NFTs Names
*/
router.post("/", async (req, res) => {
  try {
    // Return message
    const msg = {};
    const { address, selectedChain } = req.body;

    // Get NFTs from Moralis API
    const url = formatMoralisUrl(address, selectedChain);
    const response = await axios.get(url, {
      headers: {
        "x-api-key": process.env.MORALIS_API_KEY,
      },
    });

    // Simple for loop for formatting contracts addresses and tokenIDs to same index in array
    const data = { images: [], tokenIDs: [], names: [], addresses: [] };
    for (const nft of response.data.result) {
      if (data.names.includes(nft.name)) {
        data.tokenIDs[data.names.indexOf(nft.name)].push(nft.token_id);
        data.images[data.names.indexOf(nft.name)].push(
          imageSelector(
            nft.token_address,
            nft.token_id,
            parseInt(selectedChain)
          )
        );
        data.addresses[data.names.indexOf(nft.name)].push(nft.token_address);
      } else {
        data.names.push(nft.name);
        data.images.push([
          imageSelector(
            nft.token_address,
            nft.token_id,
            parseInt(selectedChain)
          ),
        ]);
        data.addresses.push([nft.token_address]);
        data.tokenIDs.push([nft.token_id]);
      }
    }

    msg.data = data;
    msg.status = "Success";
    res.json(msg);
  } catch (e) {
    console.log(e);
    const msg = {};
    msg.status = "Error";
    msg.message = e.message;
    msg.data = {};
    res.json(msg);
  }
});

router.get("/:address/:tokenID/:chain", async (req, res) => {
  try {
    const msg = {};
    const { address, tokenID, chain } = req.params;
    const url = imageSelector(address, tokenID, parseInt(chain));

    msg.uri = url;

    const response = await axios.get(formatNFTMoralisURL(address, chain), {
      headers: {
        "x-api-key": process.env.MORALIS_API_KEY,
      },
    });

    msg.name = response.data.result[0].name;
    msg.tokenID = tokenID;
    msg.status = "Success";
    console.log(msg);
    res.json(msg);
  } catch (e) {
    console.log(e);
    res.send(e.message);
  }
});

module.exports = router;
