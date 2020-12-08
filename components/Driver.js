import React, { Component } from 'react';
import StartPage from './StartPage';
import SecondPage from './SecondPage';
export class Driver extends Component {
    constructor(props){
        super(props);
        this.state = {  
            step: 1
    }
}
  
    nextStep = () => {
      const { step } = this.state;
      this.setState({
        step: step + 1
      });
    };
  
    prevStep = () => {
      const { step } = this.state;
      this.setState({
        step: step - 1
      });
    };

    render() {
        const { step } = this.state;
        switch (step) {
            case 1:
                return (
                    <StartPage
                      nextStep={this.nextStep}
                    />
                );
            case 2:
                return (
                    <SecondPage
                        nextStep = {this.nextStep}
                        prevStep = {this.prevStep}
                    />
                );
            default:
                (console.log("error has occured!"))
        }
    }    
}
export default Driver;