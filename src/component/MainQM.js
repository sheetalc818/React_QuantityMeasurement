import React from 'react'
import {Select, InputLabel} from '@material-ui/core/';
import{FormControl } from "@material-ui/core";

class MainQM extends React.Component {
    render() {
      console.log("Component render "+this.props.mainUnits);
      // let data = this.props.mainUnits
      return (
            <FormControl className="main">
            <InputLabel htmlFor="outline-units-native-simple">{this.props.name}</InputLabel>
            <Select style={{width:this.props.width}}
            native
            onChange={this.props.handleChange}
            label={this.props.name}
            >
              <option aria-label="None" value="" />
              {
                this.props.mainUnits.map((value) =>(
                <option key={value}>{value}</option>
              ))
              }
          </Select> 
          </FormControl>
      );
    }
}
export default MainQM;

