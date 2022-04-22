import React from "react";

// react-router-dom
import { useParams, useLocation, useHistory } from "react-router-dom";

// Axios
import axios from "axios";

// CSS
import styles from "./style.module.css";
import {
  Button,
  Container,
  Spinner,
  Row,
  Col,
  Dropdown,
  Overlay,
  Tooltip,
  Modal,
} from "react-bootstrap";

// Download the image
import * as htmlToImage from "html-to-image";
import * as download from "downloadjs";

// Icons
import { FiSettings } from "react-icons/fi";
import {
  AiFillWarning,
  AiOutlineArrowLeft,
  AiFillDelete,
} from "react-icons/ai";
import { GrCircleInformation } from "react-icons/gr";

// react-dropzone
import { useDropzone } from "react-dropzone";

// Color picker
import { TwitterPicker } from "react-color";

// Drag Move
import DragMove from "components/DragMove/DragMove";

// Helpers
import { getKeyByValue, phoneToSize, capitalizeFirstLetter } from "helpers";

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const phoneDimension = (name) => {
  return {
    "iPhone 13": [1170, 2532],
    "iPhone X": [1125, 2536],
    "iPhone XR": [828, 1792],
    "iPhone 8": [750, 1334],
    "Samsung Galaxy S22": [1080, 2340],
  }[name];
};

const Edit = () => {
  const { token, tokenID } = useParams();
  const query = useQuery();
  const history = useHistory();

  // Modal for upload image styling
  const [showModal, setShowModal] = React.useState(false);
  const [backgroundSize, setBackgroundSize] = React.useState("contain");
  const [backgroundPosition, setBackgroundPosition] = React.useState("top");
  const [backgroundRepeat, setBackgroundRepeat] = React.useState("no-repeat");

  const [loading, setLoading] = React.useState(true);
  const [nft, setNFT] = React.useState();

  // Tooltip target ref
  const [showToolTip, setShowToolTip] = React.useState(false);
  const target = React.useRef(null);
  const rref = React.useRef(null);

  // React-dropzone config
  const [file, setFile] = React.useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFile(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const onClickDownload = async () => {
    let h = phoneDimension(phone);
    htmlToImage
      .toPng(rref.current, {
        canvasHeight: h[1],
        canvasWidth: h[0],
        pixelRatio: 1,
      })
      .then(async function (dataUrl) {
        download(dataUrl, "greatest-bg-ever.png", "image/png");
      });
  };

  // Properties state for image
  const [backgroundColor, setBackgroundColor] = React.useState("black");
  const [size, setSize] = React.useState(757);
  const [imageDimension, setImgDimensions] = React.useState({
    width: 0,
    height: 0,
  });
  const [position, setPosition] = React.useState("center");
  const [translate, setTranslate] = React.useState({
    x: 0,
    y: 0,
  });
  const imgRef = React.useRef(null);
  const [phone, setPhone] = React.useState("iPhone 13");

  // Handle Drag Move
  const handleDragMove = (e) => {
    setTranslate({
      x: translate.x + e.movementX,
      y: translate.y + e.movementY,
    });
  };

  // Function for go back
  const onClickBackButton = () => history.goBack();

  // Function for changing width of image without changing ratio between width & height
  const handleResizeWidth = (operation) => {
    const { width, height } = imageDimension;
    var newWidth;
    if (operation === "increase") newWidth = width + 5;
    else newWidth = width - 5;

    // Simple equation solver
    const newHeight = (newWidth * height) / width;
    setImgDimensions({ width: newWidth, height: newHeight });
  };

  // Function for changing height of image without changing ratio between width & height
  const handleResizeHeight = (operation) => {
    const { width, height } = imageDimension;
    var newHeight;
    if (operation === "increase") newHeight = height + 5;
    else newHeight = height - 5;

    // Simple equation solver
    const newWidth = (newHeight * width) / height;
    setImgDimensions({ width: newWidth, height: newHeight });
  };

  React.useEffect(() => {
    async function fetchData() {
      await axios
        .get(
          process.env.REACT_APP_SERVER_URL +
            "/info/" +
            token +
            "/" +
            tokenID +
            "/" +
            query.get("chain")
        )
        .then((e) => {
          setNFT(e.data);
        })
        .catch((e) => console.log(e))
        .finally(() => setLoading(false));
    }
    if (query !== undefined && token !== undefined && tokenID !== undefined)
      fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, tokenID]);

  return (
    <Container className="d-flex justify-content-center mt-5">
      {loading ? (
        <div className="d-flex flex-column mt-5">
          <p className="poppins fs-4">Loading NFT Attributes</p>
          <Spinner animation="border" className="mx-auto" />
        </div>
      ) : (
        <>
          {nft !== undefined ? (
            <>
              <Modal
                show={showModal}
                onHide={() => setShowModal(!showModal)}
                centered
                contentClassName="d-flex flex-column"
              >
                <p className="fs-5 text-center mx-auto poppins mt-3">
                  Settings For Uploaded Background
                </p>
                <hr className="w-50 bg-gray mx-auto mt-0"></hr>
                <p className="poppins text-center mb-0">Background Size</p>
                <Dropdown className="mx-auto mt-2">
                  <Dropdown.Toggle
                    variant="light"
                    className="poppins shadow-none mb-0"
                  >
                    {capitalizeFirstLetter(backgroundSize)}
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="poppins mt-0">
                    <Dropdown.Item onClick={() => setBackgroundSize("cover")}>
                      Cover
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setBackgroundSize("contain")}>
                      Contain
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <p className="poppins text-center mb-0">Background Position</p>
                <Dropdown className="mx-auto mt-2">
                  <Dropdown.Toggle
                    variant="light"
                    className="poppins shadow-none mb-0"
                  >
                    {/* Dropdown Button */}
                    {capitalizeFirstLetter(backgroundPosition)}
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="poppins mt-0">
                    <Dropdown.Item onClick={() => setBackgroundPosition("top")}>
                      Top
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setBackgroundPosition("bottom")}
                    >
                      Bottom
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setBackgroundPosition("left")}
                    >
                      Left
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setBackgroundPosition("right")}
                    >
                      Right
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setBackgroundPosition("center")}
                    >
                      Center
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <p className="poppins text-center mb-0">Background Repeat</p>
                <Dropdown className="mx-auto mt-2">
                  <Dropdown.Toggle
                    variant="light"
                    className="poppins shadow-none mb-0"
                  >
                    {capitalizeFirstLetter(backgroundRepeat)}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="poppins mt-0">
                    <Dropdown.Item
                      onClick={() => setBackgroundRepeat("no-repeat")}
                    >
                      No Repeat
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setBackgroundRepeat("repeat-x")}
                    >
                      Repeat X
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setBackgroundRepeat("repeat-y")}
                    >
                      Repeat Y
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setBackgroundRepeat("space")}>
                      Space
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setBackgroundRepeat("round")}>
                      Round
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Modal>

              <p className="text-center poppins fs-4 my-auto">
                {nft.name}
                <br />#{nft.tokenID}
              </p>
              <Row>
                <Col className="d-flex">
                  <div>
                    <div
                      ref={rref}
                      style={
                        size && {
                          width: `350px`,
                          height: `${size}px`,
                          alignItems: position === null ? "" : position,
                          backgroundImage:
                            file.length !== 0 && `url('${file[0].preview}')`,
                          backgroundColor: file.length === 0 && backgroundColor,
                          backgroundSize: file.length !== 0 && backgroundSize,
                          backgroundPosition:
                            file.length !== 0 && backgroundPosition,
                          backgroundRepeat:
                            file.length !== 0 && backgroundRepeat,
                        }
                      }
                      className={`mx-auto ${styles.custom_image}`}
                    >
                      <DragMove
                        onDragMove={handleDragMove}
                        style={{ objectFit: "scale-down" }}
                      >
                        <img
                          src={nft.uri}
                          alt="nft"
                          style={{
                            transform: `translateX(${translate.x}px) translateY(${translate.y}px)`,
                            width: imageDimension.width,
                            aspectRatio: 1,
                          }}
                          ref={imgRef}
                          onLoad={() => {
                            setImgDimensions({
                              width: imgRef.current.naturalWidth,
                              height: imgRef.current.naturalHeight,
                            });
                          }}
                        />
                      </DragMove>
                    </div>
                  </div>
                </Col>
                <Col>
                  <p className="poppins fw-bold fs-6 text-center mt-2">
                    Size of Wallpaper
                  </p>
                  <Dropdown className="d-flex">
                    <Dropdown.Toggle
                      variant="light"
                      className={`w-75 mx-auto poppins ${styles.custom_input}`}
                    >
                      {phone}
                    </Dropdown.Toggle>

                    <Dropdown.Menu style={{ width: "max-content" }}>
                      {Object.keys(phoneToSize).map((phone) => (
                        <Dropdown.Item
                          key={phone}
                          className="poppins text-center"
                          onClick={() => {
                            setSize(phoneToSize[phone]);
                            setPhone(phone);
                          }}
                        >
                          {phone}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>

                  <p className="poppins fw-bold fs-6 text-center mt-4">
                    Position of NFT
                  </p>
                  <Dropdown className="d-flex mt-0">
                    <Dropdown.Toggle
                      variant="light"
                      className={`w-75 mx-auto poppins ${styles.custom_input}`}
                    >
                      {position
                        ? capitalizeFirstLetter(position)
                        : "Select Position (Default Top)"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu style={{ width: "max-content" }}>
                      {Array.from(["start", "center", "end"]).map(
                        (position) => (
                          <Dropdown.Item
                            key={position}
                            className="poppins text-center"
                            onClick={() => setPosition(position)}
                          >
                            {capitalizeFirstLetter(position)}
                          </Dropdown.Item>
                        )
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                  <p className="poppins fw-bold fs-6 text-center mt-3 w-75 mx-auto">
                    Double click to start dragging your NFT to the desired
                    position 🎉
                  </p>
                  <div className={styles.custom_div}>
                    <div
                      className="d-flex align-items-center w-25 mx-auto"
                      ref={target}
                      onClick={() => setShowToolTip(!showToolTip)}
                      style={{ position: "relative", bottom: 10 }}
                    >
                      <GrCircleInformation
                        className={"mx-auto"}
                        refX={target}
                      />
                    </div>
                    <Overlay
                      target={target.current}
                      show={showToolTip}
                      placement="right"
                    >
                      {(props) => (
                        <Tooltip id="overlay-example" {...props}>
                          <p className="poppins mb-0">
                            Best resolution will be retained while the NFT's
                            dimensions change 📐
                          </p>
                        </Tooltip>
                      )}
                    </Overlay>
                    <div className="d-flex flex-column w-100 poppins">
                      <div className="d-flex w-100 flex-row justify-content-evenly">
                        <p
                          className="poppins mb-0"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleResizeWidth("decrease")}
                        >
                          {"<"}
                        </p>
                        <p className="mb-0 text-center">Width</p>
                        <p
                          className="poppins mb-0"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleResizeWidth("increase")}
                        >
                          {">"}
                        </p>
                      </div>
                      <hr
                        className="w-50 mx-auto my-1"
                        style={{ color: "gray" }}
                      />
                    </div>
                    <div className="d-flex flex-column w-100 poppins">
                      <div className="d-flex w-100 flex-row justify-content-evenly">
                        <p
                          className="poppins mb-0"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleResizeHeight("decrease")}
                        >
                          {"<"}
                        </p>
                        <p className="mb-0 text-center">Height</p>
                        <p
                          className="poppins mb-0"
                          onClick={() => handleResizeHeight("increase")}
                        >
                          {">"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-row mx-auto mt-4">
                    <p className="poppins text-center mx-auto align-self-center">
                      Change Background Color
                    </p>
                    <TwitterPicker
                      onChangeComplete={(e) => setBackgroundColor(e.hex)}
                    />
                  </div>
                  <div
                    {...getRootProps({ className: "dropzone" })}
                    className={`w-75 ${styles.custom_dropzone} mt-5`}
                  >
                    {file.length === 0 ? (
                      <>
                        <input {...getInputProps()} />
                        <p className="poppins text-center mx-auto">
                          You can also drag and drop your background here or
                          click for select file
                        </p>
                      </>
                    ) : (
                      <div className="d-flex flex-column">
                        <p className="poppins my-auto text-center w-75 mx-auto">
                          {file[0].path}
                        </p>
                        <AiFillDelete
                          color="red"
                          size={26}
                          className="m-auto"
                          onClick={() => setFile([])}
                        />
                      </div>
                    )}
                  </div>
                  {file.length !== 0 && (
                    <div className="d-flex flex-row mx-auto justify-content-evenly mt-3 w-50 ">
                      <p className="poppins my-auto">Wallpaper Settings</p>
                      <FiSettings
                        size={30}
                        style={{ cursor: "pointer" }}
                        className="my-auto ml-5"
                        onClick={() => setShowModal(true)}
                      />
                    </div>
                  )}
                  <div className="d-flex mt-3">
                    <Button
                      onClick={onClickDownload}
                      variant="success"
                      className="poppins mx-auto"
                    >
                      Download
                    </Button>
                  </div>
                </Col>
              </Row>
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
              <div className="d-flex flex-row justify-content-center mt-5">
                <AiOutlineArrowLeft
                  className="my-auto fw-bold me-3"
                  color="red"
                  size={30}
                  onClick={onClickBackButton}
                />
                <Button
                  className="poppins text-center my-auto fw-bold fs-4 d-flex border-0"
                  style={{ backgroundColor: "red" }}
                  onClick={onClickBackButton}
                >
                  Go Back
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default Edit;
