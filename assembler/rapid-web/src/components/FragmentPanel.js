import React, { Component } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TreeMenu from 'react-simple-tree-menu';


const DEFAULT_PADDING = 16;
const ICON_SIZE = 8;
const LEVEL_SPACE = 16;

const ToggleIcon = ({ on }) => <span style={{ marginRight: 8 }}>{on ? '-' : '+'}</span>;

const ListItem = ({
  level = 0,
  hasNodes,
  isOpen,
  label,
  openNodes,
  toggleNode,
  focused,
  ...props
}) => (
  <ListGroup.Item
    id={props.id}
    {...props}
    style={{
      paddingLeft: DEFAULT_PADDING + ICON_SIZE + level * LEVEL_SPACE,
      cursor: 'pointer',
      boxShadow: focused ? '0px 0px 5px 0px #222' : 'none',
      zIndex: focused ? 999 : 'unset',
      position: 'relative',
    }}
  >
    {hasNodes && (
      <div
        style={{ display: 'inline-block' }}
        onClick={e => {
          hasNodes && toggleNode && toggleNode();
          e.stopPropagation();
        }}
      >
        <ToggleIcon on={isOpen} />
      </div>
    )}
    {label}
  </ListGroup.Item>
);

class FragmentPanel extends Component {

  shouldComponentUpdate(newProps){
    if (newProps.fragList !== this.props.fragList || newProps.tempList !== this.props.tempList){
      return true;
    }else {
      return false;
    }
  }

  treeBuild = (fragment) => {
    var dict = [];
    var nodes = [];
    if (!fragment.joints) {
      var data = {
        key: Math.random().toString(36).substring(7),
        id: fragment.id,
        label: fragment.class_attr,
        nodes: [] 
      }
      return data;
    }

    dict.push({
      key: Math.random().toString(36).substring(7),
      id: fragment.id,
      label: fragment.class_attr,
      nodes: []
    })
    fragment.joints.forEach(joint => {
      this.props.fragList.forEach(frag => { 
        if(joint.child_types.includes(frag.class_attr)){
          nodes.push(this.treeBuild(frag))
        }
      })
      dict[0].nodes = nodes;
    })
    return dict[0];
  }

  render() {
    var testing = []
    this.props.tempList.forEach((element) => {
      testing.push(this.treeBuild(element))
    })
    
    return (
      <Card>
        <Card.Header>
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
            onClickItem={this.props.handleFragmentButtons}
            resetOpenNodesOnDataUpdate={false}
            initialActiveKey='first-level-node-1/second-level-node-1' // the path to the active node
            debounceTime={125}>
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
