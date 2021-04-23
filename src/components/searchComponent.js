import React, { Component } from 'react';
//import Modal from 'react-modal';
import {Button,Modal} from 'react-bootstrap';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state={
            modalOpen:false,
            xvalue:'',
            yvalue:'',
            xvalue2:'',
            yvalue2:''
        }
    }
    buttonClick=()=>{
        this.setState(pre=>({
            modalOpen:!pre.modalOpen,
        }))
    }
    submitClick=()=>{
        const {xvalue,yvalue,xvalue2,yvalue2} =this.state;
       // debugger
          if(
              xvalue  || yvalue  
          ) {
                let inputArray1=[];
               
                let x1=(xvalue/20)*41;
                let y1=((2-yvalue)/2)*360;
                

                inputArray1.push({'x':x1,'y':y1});
               
                this.props.chartdata(inputArray1,null)
                
                
          } 
          if(xvalue2 || yvalue2) {
                let inputArray2=[];
                let x2=(xvalue2/20)*41;
                let y2=((2-yvalue2)/2)*360;
                inputArray2.push({'x':x2,'y':y2});
                this.props.chartdata(null,inputArray2)
          }
          this.setState({modalOpen:false})
        
        

    }
    render() {
        return (
            <>
               <Button id='resetbtn' onClick={this.buttonClick.bind(this)}>RESET GRAPH</Button> 
               <Modal id='modalcomponent' show={this.state.modalOpen} onHide={()=>this.setState({modalOpen:false})}>
                    <Modal.Header closeButton>
                    <Modal.Title>Inputs - plot</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Right ear<br/>
                    <input type="number" max='2' value={this.state.yvalue} onChange={(e)=>this.setState({yvalue:e.target.value})}/>ml 
                    <label > at </label>
                    <input type="number" max='200'  value={this.state.xvalue} onChange={(e)=>this.setState({xvalue:e.target.value})}/>daPa
                    </Modal.Body>


                    <Modal.Body>left ear<br/>
                    <input type="number" max='2'  value={this.state.yvalue2} onChange={(e)=>this.setState({yvalue2:e.target.value})}/>ml 
                    <label > at </label>
                    <input type="number" max='200' value={this.state.xvalue2} onChange={(e)=>this.setState({xvalue2:e.target.value})}/>daPa
                    </Modal.Body>


                    <Modal.Footer>
                        <Button variant="secondary" onClick={()=>this.setState({modalOpen:false})}>
                        Close
                        </Button>
                        <Button variant="primary" onClick={this.submitClick.bind(this)}>
                        PLOT THE VALUE
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}
