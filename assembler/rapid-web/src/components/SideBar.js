import React, { Component } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { faBars, faHeading, faImage, faIdCard, faPlus, faStar, faClone, faFileDownload, faHandPointer, faRulerHorizontal } from "@fortawesome/free-solid-svg-icons";
import TextModal from "./ComponentModals/TextComponentModal";
import ButtonModal from "./ComponentModals/ButtonComponentModal";
import ImageModal from "./ComponentModals/ImageComponentModal";
import CardModal from "./ComponentModals/CardComponentModal";
import HeroModal from "./ComponentModals/HeroComponentModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
require('isomorphic-fetch');
var fileDownload = require('js-file-download');


export class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showText: false,
      showButton: false,
      showImage: false,
      showCard: false,
      showHero: false
    };
  }

  downloadHtml = () => {
    fetch(this.props.url)
    .then(function (response) {
      switch (response.status) {
        case 200:
          return response.text();
        case 404:
          throw response;
        default:
          console.log("nothing worked");
      }
    })
    .then((template) => {
      fileDownload(template, this.props.name+'.html')
    })
    .catch(function (response) {
      console.log(response.statusText);
    });
  };

  render() {
    return (
      <div className="sidebar">
        <TextModal
          show={this.state.showText}
          hideModal={() => this.setState({ showText: false })}
          currentFragment={this.props.currentFragment}
          updateList={this.props.updateList}
          layoutOptions={this.props.layoutOptions}
        />
        <ButtonModal
          show={this.state.showButton}
          hideModal={() => this.setState({ showButton: false })}
          currentFragment={this.props.currentFragment}
          updateList={this.props.updateList}
          layoutOptions={this.props.layoutOptions}
        />
        <ImageModal
          show={this.state.showImage}
          hideModal={() => this.setState({ showImage: false })}
          currentFragment={this.props.currentFragment}
          updateList={this.props.updateList}
          layoutOptions={this.props.layoutOptions}
        />
        <CardModal
          show={this.state.showCard}
          hideModal={() => this.setState({ showCard: false })}
          currentFragment={this.props.currentFragment}
          updateList={this.props.updateList}
          layoutOptions={this.props.layoutOptions}
        />

        <HeroModal
          show={this.state.showHero}
          hideModal={() => this.setState({ showHero: false })}
          currentFragment={this.props.currentFragment}
          updateList={this.props.updateList}
          layoutOptions={this.props.layoutOptions}
        />

        <OverlayTrigger
          placement={"right"}
          delay={{ show: 500 }}
          overlay={<Tooltip>Menu</Tooltip>}
        >
          <Button
            variant="outline-dark"
            style={{
              alignContent: "center",
              backgroundColor: "transparent",
              marginBottom: "1em",
              marginTop: "13em",
              width: "3em",
            }}
          >
            <FontAwesomeIcon
              icon={faBars}
              style={{ color: "#FFF", width: "1em", height: "3vh" }}
            />
          </Button>
        </OverlayTrigger>

        <OverlayTrigger
          placement={"right"}
          delay={{ show: 500 }}
          overlay={<Tooltip>Banner/Hero</Tooltip>}
        >
          <Button
            onClick={() => this.setState({ showHero: true })}
            variant="outline-dark"
            style={{
              alignContent: "center",
              backgroundColor: "transparent",
              marginBottom: "1em",
              width: "3em",
            }}
          >
            <FontAwesomeIcon
              icon={faStar}
              style={{ color: "#FFF", width: "1em", height: "3vh" }}
            />
          </Button>
        </OverlayTrigger>

        <OverlayTrigger
          placement={"right"}
          delay={{ show: 500 }}
          overlay={<Tooltip>Text</Tooltip>}
        >
          <Button
            onClick={() => this.setState({ showText: true })}
            variant="outline-dark"
            style={{
              alignContent: "center",
              backgroundColor: "transparent",
              marginBottom: "1em",
              width: "3em",
            }}
          >
            <FontAwesomeIcon
              icon={faHeading}
              style={{ color: "#FFF", width: "1em", height: "3vh" }}
            />
          </Button>
        </OverlayTrigger>

        <OverlayTrigger
          placement={"right"}
          delay={{ show: 500 }}
          overlay={<Tooltip>Level/Wrapper</Tooltip>}
        >
          <Button
            //onClick={() => this.setState({ showText: true })}
            variant="outline-dark"
            style={{
              alignContent: "center",
              backgroundColor: "transparent",
              marginBottom: "1em",
              width: "3em",
            }}
          >
            <FontAwesomeIcon
              icon={faRulerHorizontal}
              style={{ color: "#FFF", width: "1em", height: "3vh" }}
            />
          </Button>
        </OverlayTrigger>

        <OverlayTrigger
          placement={"right"}
          delay={{ show: 500 }}
          overlay={<Tooltip>Button</Tooltip>}
        >
          <Button
            variant="outline-dark"
            onClick={() => this.setState({ showButton: true })}
            style={{
              alignContent: "center",
              backgroundColor: "transparent",
              marginBottom: "1em",
              width: "3em",
            }}
          >
            <FontAwesomeIcon
              icon={faHandPointer}
              style={{ color: "#FFF", width: "1em", height: "3vh" }}
            />
          </Button>
        </OverlayTrigger>

        <OverlayTrigger
          placement={"right"}
          delay={{ show: 500 }}
          overlay={<Tooltip>Image</Tooltip>}
        >
          <Button
            onClick={() => this.setState({ showImage: true })}
            variant="outline-dark"
            style={{
              alignContent: "center",
              backgroundColor: "transparent",
              marginBottom: "1em",
              width: "3em",
            }}
          >
            <FontAwesomeIcon
              icon={faImage}
              style={{ color: "#FFF", width: "1em", height: "3vh" }}
            />
          </Button>
        </OverlayTrigger>

        <OverlayTrigger
          placement={"right"}
          delay={{ show: 500 }}
          overlay={<Tooltip>Card</Tooltip>}
        >
          <Button
            onClick={() => this.setState({ showCard: true })}
            variant="outline-dark"
            style={{
              alignContent: "center",
              backgroundColor: "transparent",
              marginBottom: "1em",
              width: "3em",
            }}
          >
            <FontAwesomeIcon
              icon={faIdCard}
              style={{ color: "#FFF", width: "1em", height: "3vh" }}
            />
          </Button>
        </OverlayTrigger>

        <OverlayTrigger
          placement={"right"}
          delay={{ show: 500 }}
          overlay={<Tooltip>Modal</Tooltip>}
        >
          <Button
            variant="outline-dark"
            style={{
              alignContent: "center",
              backgroundColor: "transparent",
              marginBottom: "1em",
              width: "3em",
            }}
          >
            <FontAwesomeIcon
              icon={faClone}
              style={{ color: "#FFF", width: "1em", height: "3vh" }}
            />
          </Button>
        </OverlayTrigger>

        <OverlayTrigger
          placement={"right"}
          delay={{ show: 500 }}
          overlay={<Tooltip>Custom Component</Tooltip>}
        >
          <Button
            onClick={this.props.action}
            variant="outline-dark"
            style={{
              alignContent: "center",
              backgroundColor: "transparent",
              width: "3em",
            }}
          >
            <FontAwesomeIcon
              icon={faPlus}
              style={{ color: "#FFF", width: "1em", height: "3vh" }}
            />
          </Button>
        </OverlayTrigger>

        <OverlayTrigger
          placement={"right"}
          delay={{ show: 500 }}
          overlay={<Tooltip>Download Current Page</Tooltip>}
        >
          <Button
            onClick={() => this.downloadHtml()}
            variant="outline-dark"
            style={{
              marginTop: "7em",
              alignContent: "center",
              backgroundColor: "transparent",
              width: "3em",
            }}
          >
            <FontAwesomeIcon
              icon={faFileDownload}
              style={{ color: "#FFF", width: "1em", height: "3vh" }}
            />
          </Button>
        </OverlayTrigger>
      </div>
    );
  }
}
export default SideBar;
