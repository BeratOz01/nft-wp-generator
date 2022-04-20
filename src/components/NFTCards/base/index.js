import React from "react";

// CSS
import styles from "./style.module.css";

// React Bootstrap
import { Row, Col, Card, Spinner } from "react-bootstrap";

const NFTCards = ({ name, uris, tokenIDs, onClick }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <Row xs={1} md={2} lg={4} className="g-4">
      {uris.map((uri, idx) => (
        <Col>
          <Card
            className={styles.custom_card}
            onClick={() => onClick(name, uri, tokenIDs[idx])}
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
