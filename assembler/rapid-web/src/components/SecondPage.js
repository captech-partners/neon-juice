import React, { Component } from "react";
import PageViewer from "./PageViewer";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import FragmentModal from "./FragmentSettingsModal";
import FragmentPopover from "./FragmentPopOver";
import FragmentPanel from "./FragmentPanel";
import CreateLayoutModal from "./CreateLayoutModal";
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
    
	</div>
  `,
  file_name: "defaultComponent"
};

export class SecondPage extends Component {
  constructor(props) {
    super(props);
    this.popRef = React.createRef();
    this.handlePage = this.handlePage.bind(this)
    this.handleLabels = this.handleLabels.bind(this)
    this.state = {
      viewTemplate: "StartPage",
      viewPages: ["newpage"],
      viewLabels: ["default"],
      currentPage: "newpage",
      currentLabel: "default",
      default: [{label: "default", value: "default"}],
      key: 0,
      tutorialEnabled: false,
      
      showModal: false,
      showPop: false,
      showCreate: false,
      target: null,
      title: "",
      currentFrag: defaultComponent,
      fragList: [],
      tempList: [],
      currentJoints: []
    };
  }

  componentWillMount () {
    axios.get(`http://localhost:5000/fragments`).then((result) => {
      result.data.sort(function (a, b) {
        return a.id - b.id || a.class_attr.localeCompare(b.class_attr);
      });
      
      fragmentList = result.data.filter((obj) => obj.id >= 0).map((obj) => obj);
      templateList = result.data.filter((obj) => obj.id < 0).map((obj) => obj);

      this.setState({
        fragList: fragmentList,
        tempList: templateList
      })
    });
  }

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  refreshIframe = () => {
    if (this.state.currentFrag.class_attr === this.state.viewTemplate){
      this.setState({
        key: this.state.key + 1
      })
    }
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

  updateList = () => {
    axios.get(`http://localhost:5000/fragments`).then((result) => {
      result.data.sort(function (a, b) {
        return a.id - b.id || a.class_attr.localeCompare(b.class_attr);
      });
      fragmentList = result.data.filter((obj) => obj.id >= 0).map((obj) => obj);
      templateList = result.data.filter((obj) => obj.id < 0).map((obj) => obj);

      this.setState({
        fragList: fragmentList,
        tempList: templateList
      }, () => {this.refreshIframe()})
    });
  };

  handleFragmentButtons = (event) => {
    var element = document.getElementById(event.id);
    this.setState({
      showPop: true,
      target: element,
    });
    this.getById(event.id)
  };

  createTemplate = () => {
    var defaultLayout = {
      class_attr: "Layout-Default",
      id: (templateList.length+1) * -1,
      pages: ["newpage"],
      templates: [],
      labels: ["default"],
      joints: [],
      html: `<html class="Layout-Default" data-label="default" data-page="newpage" data-id="${(templateList.length + 1) * -1}">
        <head>
          <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <title>Default</title>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css"/>
        </head>
        <body>
        </body>
      </html>`,
      file_name: "defaultLayout",
    };
    this.setState({
      showPop: false,
      showCreate: true,
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
    var newId = this.state.currentFrag.id >=0 ? fragmentList.length+1 : (templateList.length+1) * -1;
  
    var change = {
      class_attr: this.state.currentFrag.class_attr,
      id: newId,
      pages: [this.state.currentPage],
      templates: [this.state.viewTemplate],
      labels: [this.state.currentLabel],
      joints: this.state.currentFrag.joints,
      html: this.state.currentFrag.html,
      file_name: this.state.currentFrag.file_name
    };

    this.setState({
      currentFrag: change,
      title: newTitle,
      showPop: false,
      showModal: !this.state.showModal
    });
  };

  viewButton = (event) => {
    this.updateTemplate(this.state.currentFrag);
    this.setState({
      showPop: false
    })
  };

  handlePage = (value) => {
    this.setState({
      currentPage: value
    })
  }

  handleLabels = (value) => {
    var values = value === null ? "" : value.map(d => d.value)
    this.setState({
      currentLabel: values,
      default: value
    })
  }

  render() {
    return (
      <div style={{height: "100%", width: "100%"}}>
        
        <NavBar back={this.back} toggleTutorial={() => this.setState({tutorialEnabled: ! this.state.tutorialEnabled})} tutorialEnabled={this.state.tutorialEnabled}/>

        <CreateLayoutModal
          show={this.state.showCreate}
          onHide={() => this.setState({showCreate: false})}
          currentFragment={this.state.currentFrag}
          updateList={this.updateList}
          layoutOptions={this.state.tempList}
        />

        <SideBar 
          name={this.state.viewTemplate}
          url={"http://localhost:5000/" + this.state.currentPage + "?label=" + this.state.currentLabel} 
          currentFragment={this.state.currentFrag} 
          updateList={this.updateList} 
          layoutOptions={this.state.tempList}
          componentOptions={this.state.fragList}
        />
        
        <div style={{marginLeft: '3em', display: 'flex', height: "100%"}}>
          <PageViewer
            key={this.state.key}
            templateName={this.state.viewTemplate}
            currentPage={this.state.currentPage}
            handlePage={this.handlePage}
            handleLabels={this.handleLabels}
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
              toggleModal={() => this.setState({showModal: !this.state.showModal})}
              currentFragment={this.state.currentFrag}
              currentJoints={this.state.currentJoints}
              componentOptions={this.state.fragList}
              layoutOptions={this.state.tempList}
              updateList={this.updateList}
            />

            <FragmentPanel
              hidePopover={() => this.setState({showPop: false})}
              createTemplate={this.createTemplate}
              currentFragment={this.state.currentFrag}
              fragList={this.state.fragList}
              tempList={this.state.tempList}
              handleFragmentButtons={this.handleFragmentButtons}
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
