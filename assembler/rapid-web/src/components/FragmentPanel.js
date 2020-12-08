import React, { Component } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { faPlus, faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TreeMenu from 'react-simple-tree-menu';


const DEFAULT_PADDING = 16;
const ICON_SIZE = 8;
const LEVEL_SPACE = 32;

const ToggleIcon = ({ on }) => <span style={{ marginRight: 8 }}>{on ? <FontAwesomeIcon icon={faCaretDown} /> : <FontAwesomeIcon icon={faCaretRight} />}</span>;

const ListItem = ({
  level = 0,
  hasNodes,
  isOpen,
  label,
  focused,
  openNodes,
  toggleNode,
  ...props
}) => (
  <ListGroup.Item
    id={props.id}
    {...props}
    style={{
      fontWeight: hasNodes ? (600 - (level * 100)) : "normal",
      textAlign: "left",
      paddingLeft: DEFAULT_PADDING + ICON_SIZE + level * LEVEL_SPACE,
      cursor: 'pointer',
      position: 'relative',
    }}
  >
    {hasNodes && (
      <div
        style={{ display: 'inline-block'}}
        onClick={e => {
          hasNodes && toggleNode && toggleNode();
          e.stopPropagation();
        }}
      >
        <ToggleIcon on={isOpen} />
      </div>
    )}
    {label}<p style={{fontStyle: "italic", display: "inline", fontWeight: 300}}>{level === 0 ? " ~ Layout" : ""}</p>
  </ListGroup.Item>
);

var lastClicked = [];
class FragmentPanel extends Component {
  constructor(props){
    super(props);
    this.state = {
      openNode: [],
    }
  }

  shouldComponentUpdate(newProps){
    if (this.props.tempList !== newProps.tempList || this.props.fragList.length !== newProps.fragList.length) {
      this.setState({openNode: lastClicked})
      return true
    }
    return false
  }

  componentWillReceiveProps(newProps){
    if (this.props.currentFragment.id < 0) {
      lastClicked = [this.props.currentFragment.class_attr + this.props.currentFragment.id]
    }
  }

  treeBuild = (fragment) => {
    var dict = [];
    var nodes = [];
    if (!fragment.joints) {
      var data = {
        key: fragment.class_attr + fragment.id,
        id: fragment.id,
        label: fragment.class_attr,
        nodes: [] 
      }
      return data;
    }
    dict.push({
      key: fragment.class_attr + fragment.id,
      id: fragment.id,
      label: fragment.class_attr,
      nodes: []
    })
    fragment.joints.forEach(joint => {
      this.props.fragList.forEach(frag => { 
        if(joint.child_types.includes(frag.class_attr) && !nodes.some(e => e.id === frag.id)){
          if (fragment.id < 0 && frag.templates.includes(fragment.class_attr)) {
            nodes.push(this.treeBuild(frag))
          } else if(fragment.id >= 0){
            nodes.push(this.treeBuild(frag))
          }
        }
      })
      dict[0].nodes = nodes;
    })
    return dict[0];
  }

  render() {
    var testing = [];
    this.props.tempList.forEach((element) => {
      testing.push(this.treeBuild(element))
    })

    return (
      <Card>
        <Card.Header style={{ textAlign: "left"}}>
          <h5 style={{display: 'inline'}}>Project Layouts</h5>
          <Button className="popButton" onClick={this.props.createTemplate}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </Card.Header>
        <Card.Body
          style={{ height: "50em", overflowY: "auto", padding: "0" }}
        >
          <TreeMenu
            data={testing}
            initialOpenNodes={this.state.openNode}
            onClickItem={this.props.handleFragmentButtons}
            resetOpenNodesOnDataUpdate={false}>
              {({ search, items }) => (
                  <>
                    <ListGroup style={{borderRadius: '0px'}}>
                      {items.map(props => (
                        <ListItem {...props} />
                      ))}
                    </ListGroup>
                  </>
              )}
          </TreeMenu>

        </Card.Body>
      </Card>
    );
  }
}

export default FragmentPanel;
