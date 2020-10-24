import React, { Component } from "react";
import FragmentModal from "./FragmentSettingsModal";
import DeleteModal from "./DeleteModal";
import FragmentPopover from "./FragmentPopOver";
import FragmentPanel from "./FragmentPanel";
import axios from "axios";

var fragmentList;
var templateList;
var alltemps;

axios.get(`http://localhost:5000/fragments`).then((result) => {
  result.data.sort(function (a, b) {
    return a.id - b.id || a.class_attr.localeCompare(b.class_attr);
  });
  fragmentList = result.data.filter((obj) => obj.id >= 0).map((obj) => obj);
  templateList = result.data.filter((obj) => obj.id < 0).map((obj) => obj);
  alltemps = templateList.map((obj) => obj.class_attr);
});

class FragmentLists extends Component {
  constructor(props) {
    super(props);
    this.searchFragment = this.searchFragment.bind(this);
    this.searchTemplate = this.searchTemplate.bind(this);
    this.popRef = React.createRef();
    this.state = {
      showModal: false,
      showPop: false,
      showDelete: false,
      target: null,
      isFragment: true, //fragment = true, template = false
      title: "Create New Component",
      id: 0,

      currentFrag: {},
      name: props.name,
      labels: props.labels,
      fragList: fragmentList,
      tempList: templateList,
      searchFrag: fragmentList,
      searchTemp: templateList,
      outputText: "",
      currentJoints: [],
      currentPages: [],
      currentTemps: [],
      templateOptions: alltemps,
      html: "",
    };
  }

  getById = (id) => {
    const url = `http://localhost:5000/fragments/` + id;
    axios.get(url).then((result) => {
      this.setState({
        name: result.data.class_attr,
        labels: result.data.labels,
        currentPages: result.data.pages,
        currentTemps: result.data.templates,
        html: result.data.html,
        currentFrag: result.data,
        currentJoints: result.data.joints.map(d => d.child_types)
      });
    });
  };

  fragChange = (value) => {
    this.setState({
      fragList: value,
      searchFrag: value
    });
  };

  tempChange = (value) => {
    this.setState({
      tempList: value,
      searchTemp: value,
      templateOptions: alltemps
    });
  };

  searchFragment = (value) => {
    var newList;
    value = value.toLowerCase();
    if (value === "") {
      newList = this.state.fragList
    } else if (("No Name").toLowerCase().includes(value)) {
      newList = this.state.fragList.filter((d) => (d.class_attr === null ? d : null))
    } else {
      newList = this.state.fragList.filter((d) => d.class_attr !== null ? d.class_attr.toLowerCase().startsWith(value) : null)
    }
    this.setState({
      searchFrag: newList,
    });
  };

  searchTemplate = (value) => {
    var newList;
    value = value.toLowerCase();
    if (value === "") {
      newList = this.state.tempList
    } else if (("No Name").toLowerCase().includes(value)) {
      newList = this.state.tempList.filter((d) => (d.class_attr === null ? d : null))
    } else {
      newList = this.state.tempList.filter((d) => d.class_attr !== null ? d.class_attr.toLowerCase().startsWith(value) : null)
    }
    this.setState({
      searchTemp: newList,
    });
  };

  updateList = (id) => {
    axios.get(`http://localhost:5000/fragments`).then((result) => {
      result.data.sort(function (a, b) {
        return a.id - b.id || a.class_attr.localeCompare(b.class_attr);
      });

      fragmentList = result.data.filter((obj) => obj.id >= 0).map((obj) => obj);
      templateList = result.data.filter((obj) => obj.id < 0).map((obj) => obj);
      alltemps = templateList.map((obj) => obj.class_attr);
      id >= 0 ? this.fragChange(fragmentList) : this.tempChange(templateList);
    });
  };

  createFrag = () => {
    const url = `http://localhost:5000/fragments`;
    let data = JSON.stringify({
      html: this.state.html,
      file: 'assets.html'
    });

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post(url, data, axiosConfig)
      .then((result) => {
        console.log(result);
        this.updateList(this.state.id);
      })
      .catch(function (error) {
        console.log(error);
      });
    this.toggleModal();
  };

  editFrag = () => {
    const url = `http://localhost:5000/fragments/` + this.state.id;
    let data = JSON.stringify({
      html: this.state.html,
      file: this.state.currentFrag.class_attr + '.html'
    });

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .put(url, data, axiosConfig)
      .then((result) => {
        console.log(result);
        this.updateList(this.state.id);
      })
      .catch(function (error) {
        console.log(error);
      });
    this.toggleModal();
  };

  deleteFrag = () => {
    this.toggleDelete();
    const url = `http://localhost:5000/fragments/` + this.state.id;

    axios
      .delete(url)
      .then((result) => {
        console.log(result);
        this.updateList(this.state.id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  handleFragmentButtons = (event) => {
    //if popover is already showing and the user clicked the same fragment button, hide popover else show popover
    var newShow =
      this.showPop === true && this.state.target === event.target
        ? false
        : true;
    var checkFragment = event.target.id >= 0 ? true : false;

    this.setState({
      showPop: newShow,
      target: event.target,
      isFragment: checkFragment,
      id: event.target.id,
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
      isFragment: true,
      name: "",
      id: "1",
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
      isFragment: false,
      name: "",
      id: "-1",
      labels: "",
      currentPages: [],
      currentJoints: [],
      html: "",
    });
  };

  editButton = (event) => {
    var newTitle = this.state.isFragment ? "Edit Component" : "Edit Layout";

    this.setState({
      title: newTitle,
    });
    this.hidePopover();
    this.toggleModal();
  };

  duplicateButton = (event) => {
    var newTitle = this.state.isFragment
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
    var searchFragment = this.searchFragment;
    var searchTemplate = this.searchTemplate;

    return (
      <div style={{ width: "23%" }} ref={this.popRef}>
        <FragmentModal
          show={this.state.showModal}
          title={this.state.title}
          parentAction={this.toggleModal}
          name={this.state.name}
          id={this.state.id}
          components={this.state.fragList}
          labels={this.state.labels}
          pages={this.state.currentPages}
          temps={this.state.currentTemps}
          currentJoints={this.state.currentJoints}
          templateOptions={this.state.templateOptions}
          html={this.state.html}
          createAction={this.createFrag}
          editAction={this.editFrag}
          onHtmlChange={this.handleChange}
        />

        <DeleteModal
          show={this.state.showDelete}
          value={this.state.name}
          toggleAction={this.toggleDelete}
          deleteAction={this.deleteFrag}
        />

        <FragmentPanel
          hidePopover={this.hidePopover}
          createFragment={this.createFragment}
          createTemplate={this.createTemplate}
          fragList={this.state.searchFrag}
          tempList={this.state.searchTemp}
          handleFragmentButtons={this.handleFragmentButtons}
          searchFragment={searchFragment.bind(this)}
          searchTemplate={searchTemplate.bind(this)}
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
