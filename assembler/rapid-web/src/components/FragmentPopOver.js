import React, { Component } from "react";
import { Button, Popover, Overlay, OverlayTrigger, Tooltip } from "react-bootstrap";
import { faCopy, faEdit, faTrashAlt, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteModal from "./DeleteModal";

class FragmentPopOver extends Component {
  constructor(props) {
    super(props);
    this.popRef = React.createRef();
    this.state = {
      showDelete: false,
      showPop: props.showPop
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      showPop: newProps.showPop
    })
  }

  toggleDelete = () => {
    this.setState({
      showDelete: !this.state.showDelete,
      showPop: false
    })
  }

  render() {
    return (
      <div>
        <DeleteModal
          show={this.state.showDelete}
          fragment={this.props.currentFrag}
          toggle={this.toggleDelete}
          updateList={this.props.updateList}
        />

        <Overlay
          show={this.state.showPop}
          target={this.props.target}
          placement="left"
          onHide={this.props.hidePop}
          rootCloseEvent={"mousedown"}
          rootClose={true}
          container={this.popRef.current}
          containerPadding={20}
        >
          <Popover>
            {this.props.currentFrag.id < 0 ? (
              <OverlayTrigger
                overlay={<Tooltip>View layout on Page Viewer</Tooltip>}
              >
                <Button className="popButton" onClick={this.props.view}>
                  <FontAwesomeIcon icon={faEye} />
                </Button>
              </OverlayTrigger>
            ): null}

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
              <Button className="popButton" onClick={this.toggleDelete}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </Button>
            </OverlayTrigger>
          </Popover>
        </Overlay>
      </div>
    );
  }
}
export default FragmentPopOver;
