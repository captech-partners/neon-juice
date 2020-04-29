import React from 'react';
import ReactDOM from 'react-dom';

import styled from 'styled-components';

import axios from 'axios';

import Iframe from 'react-iframe';



const Sidebar = styled.div`
  width: 30%;
  float: left;
  margin-right: 1em;
  padding-left: 1em;
`;

const Main = styled.div`
  margin: .5em;
  padding-left: .5em;
`

const Button = styled.button`
  background: #E5C1EE;
  border-radius: 3px;
  border: solid #DBB7E4;
  color: #33153A;
  font-size: .5em;
  margin: 0 1em;
  padding: 0.25em 1em;
`

const InputFields = styled.div`
  float: left;
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
        <Sidebar>
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
            <Button onClick={e => this.onSubmit(e)}>Preview</Button>
          </InputFields>

          

        </Sidebar>

        <Main>
          <Iframe url={url}
            width="900px"
            height="600px"
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
