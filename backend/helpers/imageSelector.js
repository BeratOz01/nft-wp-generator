const chainToHex = (chain) => {
  return {
    1: 43114,
  }[chain];
};

const imageSelector = (address, tokenID, chain) => {
  const c = chainToHex(chain);
  const url = `https://assets.nftrade.com/image/upload/w_500,c_scale/v1650416094/evm_${c}_${address}_${tokenID}.png`;

  return url;
};

module.exports = { imageSelector };
