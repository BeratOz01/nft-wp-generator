import React from "react";

// CSS
import styles from "./style.module.css";
import { Button } from "react-bootstrap";

// Images
import eth from "images/eth.png";
import avax from "images/avax.png";
import bsc from "images/bsc.png";
import poly from "images/polygon.png";
import moralis from "images/moralis.png";
import tw from "images/twitter.png";

// Web3
import Web3 from "web3";

// Hooks
import { useHistory } from "react-router-dom";

const Home = () => {
  const [address, setAddress] = React.useState("");
  const [isValid, setIsValid] = React.useState(false);
  const [selectedChain, setSelectedChain] = React.useState(0);

  const history = useHistory();

  // Function to handle the input change
  const handleChange = (event) => {
    const isValidAddress = Web3.utils.isAddress(event.target.value);
    setIsValid(isValidAddress && selectedChain !== undefined);
    setAddress(event.target.value);
  };

  const onClickMoralis = () => {
    window.open("https://docs.moralis.io/introduction/readme", "_blank");
  };

  const onClickTwitter = () => {
    window.open("https://twitter.com/0x2404", "_blank");
  };

  const onClickGenerate = () => {
    history.push(`/${address}?selectedChain=${selectedChain}`);
  };

  React.useEffect(() => {
    setIsValid(isValid && selectedChain !== undefined);
  }, [selectedChain, isValid]);

  return (
    <div>
      <div className={styles.card}>
        <p className="poppins text-center mx-auto mb-2 fs-4">
          Generate Wallpaper From Your
        </p>
        <p className="poppins text-center mx-auto mb-2 mt-2 fs-4">NFTs</p>
        <input
          className={`${styles.input} poppins text-center mt-2`}
          placeholder="Enter Your Wallet Address"
          onChange={handleChange}
        />
        <div className="d-flex flex-row my-auto justify-content-center gap-4 mt-4">
          <img
            src={eth}
            alt="etherum_logo"
            onClick={() => setSelectedChain(0)}
            className={`${styles.img}`}
            style={selectedChain === 0 ? { borderStyle: "outset" } : {}}
          />
          <img
            src={avax}
            alt="avalanche_logo"
            onClick={() => setSelectedChain(1)}
            className={styles.img}
            style={selectedChain === 1 ? { borderStyle: "outset" } : {}}
          />
          <img
            src={bsc}
            alt="bsc_logo"
            onClick={() => setSelectedChain(2)}
            className={styles.img}
            style={selectedChain === 2 ? { borderStyle: "outset" } : {}}
          />
          <img
            src={poly}
            alt="polygon_logo"
            onClick={() => setSelectedChain(3)}
            className={styles.img}
            style={selectedChain === 3 ? { borderStyle: "outset" } : {}}
          />
        </div>
        <Button
          className={`${styles.button} poppins text-center w-50 mx-auto mt-4 shadow-none`}
          disabled={!isValid}
          variant="success"
          onClick={onClickGenerate}
        >
          Generate Wallpaper
        </Button>
        <div className="d-flex flex-row justify-content-center mt-3">
          <p className={`poppins fs-6 mt-auto mb-auto`}>Built With</p>
          <img
            src={moralis}
            alt="etherum_logo"
            className={` ${styles.moralis} my-auto`}
            onClick={onClickMoralis}
          />
        </div>
        <div className="d-flex flex-row justify-content-center">
          <p className={`poppins fs-6 mt-auto mb-auto`}>Contact Me</p>
          <img
            src={tw}
            alt="etherum_logo"
            className={`${styles.moralis} my-auto`}
            onClick={onClickTwitter}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
