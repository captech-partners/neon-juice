import React, { Component } from "react";
import FragmentModal from "./FragmentSettingsModal";
import DeleteModal from "./DeleteModal";
import FragmentPopover from "./FragmentPopOver";
import FragmentPanel from "./FragmentPanel";
import axios from "axios";

var fragmentList;
var templateList;

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
      currentFrag: {},
      id: 0,
      
      name: props.name,
      labels: props.labels,
      fragList: fragmentList,
      tempList: templateList,
      outputText: "",
      currentJoints: [],
      currentPages: [],
      currentTemps: [],
      html: ""
    };
  }

  getById = (id) => {
    const url = `http://localhost:5000/fragments/` + id;
    axios.get(url).then((result) => {
      this.setState({
        name: result.data.class_attr,
        labels: result.data.labels,
        currentPages: result.data.pages,
        id: result.data.id,
        currentTemps: result.data.templates,
        html: result.data.html,
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
      id: 1,
      name: "",
      labels: "",
      currentPages: [],
      currentTemps: [],
      currentJoints: [],
      html: "",
    });
  };

  createTemplate = () => {
    this.createButton();
    this.setState({
      title: "Create New Layout",
      id: -1,
      name: "",
      labels: "",
      currentPages: [],
      currentJoints: [],
      html: "",
    });
  };

  editButton = (event) => {
    var newTitle = this.state.id >= 0 ? "Edit Component" : "Edit Layout";

    this.setState({
      title: newTitle,
    });
    this.hidePopover();
    this.toggleModal();
  };

  duplicateButton = (event) => {
    var newTitle = this.state.id >= 0
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

  handleChange = (value) => {
    this.setState({
      html: value,
    });
  };

  render() {
    return (
      <div style={{ width: "23%" }} ref={this.popRef}>
        <FragmentModal
          show={this.state.showModal}
          title={this.state.title}
          toggleModal={this.toggleModal}
          name={this.state.name}
          id={this.state.id}
          components={this.state.fragList}
          labels={this.state.labels}
          pages={this.state.currentPages}
          temps={this.state.currentTemps}
          currentJoints={this.state.currentJoints}
          templateOptions={this.state.tempList}
          html={this.state.html}
          updateList={this.updateList}
          onHtmlChange={this.handleChange}
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
          id={this.state.id}
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
