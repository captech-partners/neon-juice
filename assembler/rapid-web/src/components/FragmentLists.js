import React, { Component } from "react";
import FragmentModal from "./FragmentSettingsModal";
import DeleteModal from "./DeleteModal";
import FragmentPopover from "./FragmentPopOver";
import FragmentPanel from "./FragmentPanel";
import axios from "axios";

var fragmentList;
var templateList;

var defaultComponent = {
  class_attr: "Component-Default",
  id: 0.5,
  pages: ["StartPage"],
  templates: ["newpage"],
  labels: ["default"],
  joints: [],
  html: "",
};

var defaultLayout = {
  class_attr: "Layout-Default",
  id: -0.5,
  pages: ["StartPage"],
  templates: [],
  labels: ["default"],
  joints: [],
  html: "",
};

axios.get(`http://localhost:5000/fragments`).then((result) => {
  result.data.sort(function (a, b) {
    return a.id - b.id || a.class_attr.localeCompare(b.class_attr);
  });
  fragmentList = result.data.filter((obj) => obj.id >= 0).map((obj) => obj);
  templateList = result.data.filter((obj) => obj.id < 0).map((obj) => obj);
});

class FragmentLists extends Component {
  constructor(props) {
    super(props);
    this.popRef = React.createRef();
    this.state = {
      showModal: false,
      showPop: false,
      showDelete: false,
      target: null,
      title: "",
      currentFrag: defaultComponent,
      fragList: fragmentList,
      tempList: templateList,
      currentJoints: []
    };
  }

  getById = (id) => {
    const url = `http://localhost:5000/fragments/` + id;
    axios.get(url).then((result) => {
      this.setState({
        currentFrag: result.data,
        currentJoints: result.data.joints.map(d => d.child_types)
      });
    });
  };

  updateList = (id) => {
    axios.get(`http://localhost:5000/fragments`).then((result) => {
      result.data.sort(function (a, b) {
        return a.id - b.id || a.class_attr.localeCompare(b.class_attr);
      });

      fragmentList = result.data.filter((obj) => obj.id >= 0).map((obj) => obj);
      templateList = result.data.filter((obj) => obj.id < 0).map((obj) => obj);
      id >= 0 ? this.setState({fragList: fragmentList}) : this.setState({tempList: templateList});
    });
  };

  handleFragmentButtons = (event) => {
    //if popover is already showing and the user clicked the same fragment button, hide popover else show popover
    var newShow =
      this.showPop === true && this.state.target === event.target
        ? false
        : true;

    this.setState({
      showPop: newShow,
      target: event.target,
      id: event.target.id
    });
    this.getById(event.target.id);
  };

  hidePopover = () => {
    this.setState({
      showPop: false,
    });
  };

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  toggleDelete = () => {
    this.setState({
      showDelete: !this.state.showDelete,
    });
    this.hidePopover();
  };

  createButton = () => {
    this.hidePopover();
    this.toggleModal();
  };

  createFragment = () => {
    this.createButton();
    this.setState({
      title: "Create New Component",
      currentFrag: defaultLayout,
      currentJoints: []
    });
  };

  createTemplate = () => {
    this.createButton();
    this.setState({
      title: "Create New Layout",
      currentFrag: defaultComponent,
      currentJoints: [],
    });
  };

  editButton = (event) => {
    var newTitle = this.state.currentFrag.id >= 0 ? "Edit Component" : "Edit Layout";

    this.setState({
      title: newTitle,
    });
    this.hidePopover();
    this.toggleModal();
  };

  duplicateButton = (event) => {
    var newTitle = this.state.currentFrag.id >= 0
      ? "Duplicate Component"
      : "Duplicate Layout";

    this.setState({
      title: newTitle,
    });
    this.hidePopover();
    this.toggleModal();
  };

  viewButton = (event) => {
    var updateTemplate = this.props.updateTemplate;
    updateTemplate(this.state.currentFrag);
    this.hidePopover();
  };

  render() {
    return (
      <div style={{ width: "23%" }} ref={this.popRef}>
        <FragmentModal
          show={this.state.showModal}
          title={this.state.title}
          toggleModal={this.toggleModal}
          currentFragment={this.state.currentFrag}
          currentJoints={this.state.currentJoints}
          componentOptions={this.state.fragList}
          layoutOptions={this.state.tempList}
          updateList={this.updateList}
        />

        <DeleteModal
          show={this.state.showDelete}
          fragment={this.state.currentFrag}
          toggle={this.toggleDelete}
          updateList={this.updateList}
        />

        <FragmentPanel
          hidePopover={this.hidePopover}
          createFragment={this.createFragment}
          createTemplate={this.createTemplate}
          fragList={this.state.fragList}
          tempList={this.state.tempList}
          handleFragmentButtons={this.handleFragmentButtons}
          tutorialEnabled={this.props.tutorialEnabled}
        />

        <FragmentPopover
          showPop={this.state.showPop}
          target={this.state.target}
          id={this.state.currentFrag.id}
          edit={this.editButton}
          duplicate={this.duplicateButton}
          view={this.viewButton}
          hidePop={() => this.setState({showPop: false})}
          toggleDelete={this.toggleDelete}
        />
      </div>
    );
  }
}

export default FragmentLists;
