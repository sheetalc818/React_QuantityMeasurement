import React from 'react';
import './App.css';
import { TextField, Card, CardContent} from '@material-ui/core/';
import MainQM from '/home/sheetal/Music/VSCode_Workspace/quantity_measurement/src/component/MainQM.js'
import { getMainUnits } from '/home/sheetal/Music/VSCode_Workspace/quantity_measurement/src/configuration/configuration.js'
import { getSubUnits } from '/home/sheetal/Music/VSCode_Workspace/quantity_measurement/src/configuration/configuration.js'
import { getConvertedValue } from '/home/sheetal/Music/VSCode_Workspace/quantity_measurement/src/configuration/configuration.js'

class App extends React.Component{
   constructor(props){
    super(props);
    this.state={
        mainUnits:[],
        subUnits:[],
        initialValue:'',
        initialUnit:'',
        outputUnit:'',
        outputValue:'',
        regexp : /^[0-9\b]+$/
        
    }
    this.handleinitialUnit=this.handleinitialUnit.bind(this);
    this.handleoutputUnit=this.handleoutputUnit.bind(this);
    this.focus = this.focus.bind(this);
    this.onHandleNumbersChange=this.onHandleNumbersChange.bind(this);
}

componentDidMount(){
    console.log("compoundDidMount Called")
    this.getUnits();
}

handleinitialUnit = (event) =>{
  this.setState({initialUnit: event.target.value});
}

handleoutputUnit= (event) =>{
  this.setState({outputUnit: event.target.value});
}

focus() {
  this.TextField.current.focus();
}

getUnits=()=>
{
    getMainUnits()
    .then((response)=>{
                        console.log(response.data.data);
                        this.setState({
                                      mainUnits:response.data.data
                        }) 
                        console.log("Message for main unit "+this.state.mainUnits)
    }).catch((error) => {console.log(error)})
}
      
getSubunit = event => 
{
    let unit = event.target.value
    getSubUnits(unit)
    .then((response)=>{
                        console.log("SubUnit response "+response.data.data);
                        this.setState({
                                      subUnits:response.data.data
                        })
                        console.log("Message for sub unit "+this.state.subUnits)
    }).catch((error)=>{console.log(error)})  
}

getForwardResult = event => 
{
    this.setState({actualValue: event.target.value});

    const body1 = {
      initialUnit  : this.state.initialUnit,
      outputUnit   : this.state.outputUnit,
      actualValue  : event.target.value
    }
    
    getConvertedValue(body1)
    .then((response) => {
                        console.log(response.data)
                        this.setState({
                                      outputValue:response.data.data
                        })
    }).catch((error) => {console.log(error)})
}

getReverseResult = event => 
{
    this.setState({outputValue : event.target.value});
    
    const body2 = {
        initialUnit : this.state.outputUnit,
        outputUnit  : this.state.initialUnit,
        actualValue : this.state.outputValue
    }
    
    getConvertedValue(body2)
    .then((response) => {
                        console.log(response.data)
                        this.setState({
                                      actualValue:response.data.data
                        })
    }).catch((error) => {console.log(error)})
}

onHandleNumbersChange = e => 
{
    let actualValue = e.target.value;
    let outputValue  = e.target.value;
    if (actualValue === '' || this.state.regexp.test(actualValue)) 
    {
        this.setState({ [e.target.name]:actualValue})
    }
    if (outputValue === '' || this.state.regexp.test(outputValue)) 
    {
      this.setState({ [e.target.name]:outputValue})
    }
};

  
render()
{
    console.log("inside App Render  "+ this.state.mainUnits)
    return (
       <div  className="MainQM">
       <div>
       <Card className="card" variant="outlined">
       <CardContent>
          <h1><center> Quantity Measurement</center></h1>
          <div className="div1" >
          <MainQM name="Main Units" width="490px" mainUnits={this.state.mainUnits} handleChange={this.getSubunit}/>
          </div>
      
          <div className="div2">
          <MainQM name="Sub Unit" width="235px"  mainUnits={this.state.subUnits} handleChange={this.handleinitialUnit} value={this.state.initialUnit}/> &nbsp;&nbsp;&nbsp;&nbsp;
          <MainQM name="Sub Unit" width="235px" mainUnits={this.state.subUnits} handleChange={this.handleoutputUnit} value={this.state.outputUnit}/>
          </div>
         
          <div className="div3">
             <TextField 
               id="outlined-ipvalue-input1"
               name="inputValue"
               label="Value"
               variant="outlined"
               value={this.state.actualValue}
              onChange={this.getForwardResult}
             />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  
             <TextField
               id="outlined-ipvalue-input2"
               name="outputValue"
               label="Value"
               variant="outlined"
               value={this.state.outputValue}
               onChange={this.getReverseResult}
             />
           </div>
        </CardContent>
        </Card>
        </div>
       </div>
     );
   }
}
export default App;