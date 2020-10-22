import React, { Component } from "react";
import { Button, Popover, Overlay, OverlayTrigger, Tooltip } from "react-bootstrap";
import { faPlus, faCopy, faEdit, faTrashAlt, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class FragmentPopOver extends Component {
  constructor(props) {
    super(props);
    this.popRef = React.createRef();
  }

  render() {
    return (
      <Overlay
        show={this.props.showPop}
        target={this.props.target}
        placement="right"
        onHide={this.props.hidePop}
        rootCloseEvent={"mousedown"}
        rootClose={true}
        container={this.popRef.current}
        containerPadding={20}
      >
        <Popover>
          {this.props.id >= 0 ? (
            <OverlayTrigger
              overlay={<Tooltip>Add component to current layout</Tooltip>}
            >
              <Button className="popButton">
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </OverlayTrigger>
          ) : (
            <OverlayTrigger
              overlay={<Tooltip>View layout on Page Viewer</Tooltip>}
            >
              <Button className="popButton" onClick={this.props.view}>
                <FontAwesomeIcon icon={faEye} />
              </Button>
            </OverlayTrigger>
          )}

          <OverlayTrigger overlay={<Tooltip>Duplicate component</Tooltip>}>
            <Button className="popButton" onClick={this.props.duplicate}>
              <FontAwesomeIcon icon={faCopy} />
            </Button>
          </OverlayTrigger>

          <OverlayTrigger overlay={<Tooltip>Edit component</Tooltip>}>
            <Button className="popButton" onClick={this.props.edit}>
              <FontAwesomeIcon icon={faEdit} />
            </Button>
          </OverlayTrigger>

          <OverlayTrigger overlay={<Tooltip>Delete component</Tooltip>}>
            <Button className="popButton" onClick={this.props.toggleDelete}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
          </OverlayTrigger>
        </Popover>
      </Overlay>
    );
  }
}
export default FragmentPopOver;
