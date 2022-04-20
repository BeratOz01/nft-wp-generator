import React from "react";

// CSS
import styles from "./style.module.css";
import { Modal, Row, Col, Dropdown } from "react-bootstrap";

// Constant for phone to size
const phoneToSize = {
  "iPhone 13": [390, 844],
};

// Helper function to get phone name from size
function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

const NFTModal = ({ show, onHide, nft }) => {
  const [size, setSize] = React.useState();

  return (
    <Modal
      show={show}
      centered
      size="xl"
      onHide={onHide}
      contentClassName={styles.custom_modal}
    >
      {nft && (
        <>
          <Modal.Header className="border-0">
            <p className="poppins text-left fw-bold fs-4 mb-0">
              {nft.name} #{nft.tokenID}
            </p>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <div
                  style={
                    size && { width: `${size[0]}px`, height: `${size[1]}px` }
                  }
                  className="bg-dark"
                >
                  {/* <img src={nft.uri} alt="nft" className="img-fluid" /> */}
                </div>
              </Col>
              <Col>
                <Dropdown className="d-flex">
                  <Dropdown.Toggle
                    variant="light"
                    className={`w-75 mx-auto poppins ${styles.custom_input}`}
                  >
                    {size ? getKeyByValue(phoneToSize, size) : "Select Size"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu style={{ width: "max-content" }}>
                    {Object.keys(phoneToSize).map((phone) => (
                      <Dropdown.Item
                        className="poppins text-center"
                        onClick={() => setSize(phoneToSize[phone])}
                      >
                        {phone}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
          </Modal.Body>
        </>
      )}
    </Modal>
  );
};

export default NFTModal;
