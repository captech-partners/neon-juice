import React, { Component } from "react";
import PageViewer from "./PageViewer";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import FragmentModal from "./FragmentSettingsModal";
import FragmentPopover from "./FragmentPopOver";
import FragmentPanel from "./FragmentPanel";
import axios from "axios";

var fragmentList;
var templateList;

var defaultComponent = {
  class_attr: "Component-Default",
  id: 0.5,
  pages: ["newpage"],
  templates: ["StartPage"],
  labels: ["default"],
  joints: [],
  html: `
  <div class="Component-Default" data-label="default" data-page="newpage" data-template="StartPage">
    <section class="hero is-info is-large">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Starting Page
          </h1>
          <h2 class="subtitle">
            opening default website page 
          </h2>
        </div>
      </div>
    </section>
	</div>
  `,
  file_name: "defaultComponent"
};

var defaultLayout = {
  class_attr: "Layout-Default",
  id: -0.5,
  pages: ["newpage"],
  templates: [],
  labels: ["default"],
  joints: [],
  html: `
  <html class="Layout-Default" data-label="default" data-page="newpage">
    <head>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <title>Starting Page</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css"/>
    </head>
    <body>
      <div class="container">
        <div class="content" data-child-limit="1" data-child-type="hero"/>
      </div>
    </body>
	</html>
  `,
  file_name: "defaultLayout",
};

axios.get(`http://localhost:5000/fragments`).then((result) => {
  result.data.sort(function (a, b) {
    return a.id - b.id || a.class_attr.localeCompare(b.class_attr);
  });
  
  fragmentList = result.data.filter((obj) => obj.id >= 0).map((obj) => obj);
  templateList = result.data.filter((obj) => obj.id < 0).map((obj) => obj);
});

export class SecondPage extends Component {
  constructor(props) {
    super(props);
    this.popRef = React.createRef();
    this.state = {
      viewTemplate: "StartPage",
      viewPages: ["newpage"],
      viewLabels: ["default"],
      currentPage: "newpage",
      currentLabel: "default",
      default: [{label: "default", value: "default"}],
      tutorialEnabled: false,
      
      showModal: false,
      showPop: false,
      target: null,
      title: "",
      currentFrag: defaultComponent,
      fragList: fragmentList,
      tempList: templateList,
      currentJoints: []
    };
  }

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  toggleTutorial = () => {
    this.setState({
      tutorialEnabled: ! this.state.tutorialEnabled
    })
  }

  updateTemplate = (temp) => {
    var name = temp.class_attr ? temp.class_attr : this.state.viewTemplate;
    var pages = temp.pages ? temp.pages : this.state.viewPages;
    var labels = temp.labels ? temp.labels : this.state.viewLabels;
    this.setState({
      viewTemplate: name,
      viewPages: pages,
      viewLabels: labels,
      currentPage: pages[0],
      currentLabel: labels[0],
      default: [{label: labels[0], value: labels[0]}]
    })
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
    var element = document.getElementById(event.id);
    var newShow =
      this.showPop === true && this.state.target === element
        ? false
        : true;
    this.setState({
      showPop: newShow,
      target: element,
    });
    this.getById(event.id)
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

  createFragment = () => {
    this.setState({
      title: "Create New Component",
      showPop: false,
      showModal: !this.state.showModal,
      currentFrag: defaultComponent,
      currentJoints: []
    });
  };

  createTemplate = () => {
    this.setState({
      title: "Create New Layout",
      showPop: false,
      showModal: !this.state.showModal,
      currentFrag: defaultLayout,
      currentJoints: [],
    });
  };

  editButton = (event) => {
    var newTitle = this.state.currentFrag.id >= 0 ? "Edit Component" : "Edit Layout";

    this.setState({
      title: newTitle,
      showPop: false,
      showModal: !this.state.showModal
    });
  };

  duplicateButton = (event) => {
    var newTitle = this.state.currentFrag.id >= 0 ? "Duplicate Component" : "Duplicate Layout";

    this.setState({
      title: newTitle,
      showPop: false,
      showModal: !this.state.showModal
    });
  };

  viewButton = (event) => {
    this.updateTemplate(this.state.currentFrag);
    this.hidePopover();
  };

  render() {
    return (
      <div className="SecondPage">
        
        <NavBar back={this.back} toggleTutorial={this.toggleTutorial} tutorialEnabled={this.state.tutorialEnabled}/>

        <SideBar action={this.createFragment}/>
        
        <div style={{marginLeft: '3em', display: 'flex'}}>
          <PageViewer
            url={"http://localhost:5000/newpage?label=default"}
            templateName={this.state.viewTemplate}
            currentPage={this.state.currentPage}
            currentLabel={this.state.currentLabel}
            pages={this.state.viewPages}
            labels={this.state.viewLabels}
            default={this.state.default}
            tutorialEnabled={this.state.tutorialEnabled}
          />

          <div style={{ width: "25%" }} ref={this.popRef}>
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

            <FragmentPanel
              hidePopover={this.hidePopover}
              createTemplate={this.createTemplate}
              fragList={this.state.fragList}
              tempList={this.state.tempList}
              handleFragmentButtons={this.handleFragmentButtons}
              tutorialEnabled={this.props.tutorialEnabled}
            />

            <FragmentPopover
              showPop={this.state.showPop}
              target={this.state.target}
              currentFrag={this.state.currentFrag}
              edit={this.editButton}
              duplicate={this.duplicateButton}
              view={this.viewButton}
              hidePop={() => this.setState({showPop: false})}
              updateList={this.updateList}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default SecondPage;
