import React from 'react';
import ReactDOM from 'react-dom';

import styled from 'styled-components';
import { Button } from 'react-bootstrap';

import axios from 'axios';

import Iframe from 'react-iframe';

const Main = styled.div`
  margin-top: 1em;
  padding-left: .5em;
`

const InputFields = styled.div`
  width: 30%;
  height: 700px;
  left: 0;
  bottom: 0;
  float: left;
  padding: 1em;
  padding-top: 2em;
  margin-right: 1em;
  margin-bottom: 1em;
  background-color: #f7f8f9;
`;

class PageGenerator extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      availablePages: "",
      page: "",
      labels: ""
    }

    this.inputLabels = React.createRef();
    this.inputPage = React.createRef();
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/assembler/pages`)
      .then(result => {
        const pages = Object.keys(result.data);
        this.setState({
          availablePages: pages,
          page: pages[0]
        });
      })
  }

  /* Save Fragment */
  onSubmit = e => {
    e.preventDefault();

    this.setState({
      page: this.inputPage.current.value,
      labels: this.inputLabels.current.value
    });
  };

  render() {

    var url = "http://localhost:5000/" + this.state.page + "?label=" + this.state.labels;

    var pagesList = [];
    for(var i=0; i<this.state.availablePages.length; i++){
      pagesList.push(this.state.availablePages[i]);
    };

    return(
      <div>
        <InputFields>
          <form>
            <p>Pages:
              <select
                name="page"
                defaultValue={this.state.page}
                ref={this.inputPage}
              >
                {pagesList.map(page =>
                  <option key={page} value={page}>{page}</option>
                )}
              </select>
            </p>

            <p>Labels (comma seperated values):
              <input
                name="labels"
                placeholder="Labels"
                defaultValue={this.state.labels}
                ref={this.inputLabels}
              />
            </p>
          </form>
          <Button variant="primary" onClick={e => this.onSubmit(e)}>Preview</Button>
        </InputFields>

        <Main>
          <Iframe url={url}
            width="65%"
            height="700px"
            display="initial"
            position="relative"
            allowFullScreen
          />
        </Main>
      </div>
    )
  }
}

export default PageGenerator;
