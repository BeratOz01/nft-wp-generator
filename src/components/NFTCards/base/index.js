import React from "react";

// CSS
import styles from "./style.module.css";

// React Bootstrap
import { Row, Col, Card, Spinner } from "react-bootstrap";

// react-router-dom
import { useHistory } from "react-router-dom";

const NFTCards = ({ uris, tokenIDs, address, chain }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const history = useHistory();

  return (
    <Row xs={1} md={2} lg={4} className="g-4">
      {uris.map((uri, idx) => (
        <Col key={idx}>
          <Card
            className={styles.custom_card}
            // onClick={() => onClick(name, uri, tokenIDs[idx])}
            onClick={() =>
              history.push(`/${address[0]}/${tokenIDs[idx]}?chain=${chain}`)
            }
          >
            {!isLoaded && (
              <Spinner
                animation="border"
                variant="dark"
                className="mx-auto m-5"
              />
            )}

            <Card.Img
              variant="top"
              src={uri}
              style={isLoaded === false ? { display: "none" } : {}}
              onLoad={() => setIsLoaded(true)}
            />
            <Card.Body>
              <Card.Title className="poppins text-center">
                #{tokenIDs[idx]}
              </Card.Title>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default NFTCards;
