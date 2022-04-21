import React from "react";

// react-router-dom
import { useParams, useLocation, useHistory } from "react-router-dom";

// CSS
import { Button, Container } from "react-bootstrap";

// Icons
import { AiOutlineArrowLeft, AiFillWarning } from "react-icons/ai";
import { SpinnerInfinity } from "spinners-react";

// Axios
import axios from "axios";

// Components
import { NFTCards } from "components";

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// A custom helper function for parsing query strings.

const Dashboard = () => {
  const { address } = useParams();
  const query = useQuery();
  const history = useHistory();

  // State
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [nfts, setNfts] = React.useState();
  const [show, setShow] = React.useState(false);
  const [nft, setNFT] = React.useState();

  const onClickBackButton = () => history.push("/");

  const onClickNFT = (name, uri, tokenID) => {
    setShow(true);
    setNFT({ name, uri, tokenID });
  };

  const onHide = () => setShow(false);

  React.useEffect(() => {
    async function fetchData(chain) {
      await axios
        .post(process.env.REACT_APP_SERVER_URL + "/info", {
          address: address,
          selectedChain: chain,
        })
        .then((e) => setNfts(e.data.data))
        .catch((e) => setError(e.toString()))
        .finally(() => setIsLoading(false));
    }

    if (address !== undefined && query !== undefined) {
      fetchData(query.get("selectedChain"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return (
    <Container className="d-flex flex-column mb-5">
      <div className="d-flex flex-row justify-content-center mt-5">
        <AiOutlineArrowLeft
          className="my-auto fw-bold me-3"
          color="red"
          size={30}
          onClick={onClickBackButton}
        />
        <Button
          className="poppins text-center my-auto fw-bold fs-4 d-flex border-0"
          onClick={onClickBackButton}
          style={{ backgroundColor: "red" }}
        >
          Go Back
        </Button>
      </div>
      <p className="poppins text-center fw-bold fs-3 mx-auto mt-3">
        Select NFT
      </p>
      {isLoading === true ? (
        <>
          <p className="poppins mx-auto fw-bold fs-4 mt-5">
            Fetching your NFTs...
          </p>
          <SpinnerInfinity
            secondaryColor={"black"}
            size={140}
            className="mx-auto"
          />
        </>
      ) : (
        <>
          {error !== null ? (
            <div className="d-flex flex-column">
              <p
                className="poppins mx-auto fw-bold fs-4 mt-5 text-center"
                style={{ color: "red" }}
              >
                An error occured!! <br></br>
                {error}
              </p>
              <AiFillWarning color="red" className="mx-auto" size={50} />
            </div>
          ) : (
            <>
              {nfts !== undefined && nfts.names?.length > 0 ? (
                <>
                  {nfts.names.map((name, index) => (
                    <div key={index} className="mt-2">
                      <p className="poppins fs-2 mt-5">{name}</p>
                      <NFTCards
                        address={nfts.addresses[index]}
                        uris={nfts.images[index]}
                        tokenIDs={nfts.tokenIDs[index]}
                        chain={query.get("selectedChain")}
                      />
                    </div>
                  ))}
                </>
              ) : (
                <div className="d-flex flex-column">
                  <p
                    className="poppins mx-auto fw-bold fs-4 mt-5 text-center"
                    style={{ color: "red" }}
                  >
                    No NFT found!
                  </p>
                  <AiFillWarning color="red" className="mx-auto" size={50} />
                </div>
              )}
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default Dashboard;
