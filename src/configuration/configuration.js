const axios = require('axios').default;
// import axios from 'axios';

 export function config(obj) {

    console.log("obj to print--->", obj)
        return axios({
            method: 'post',
            url: 'http://localhost:8081/quantityMeasurement/unit/conversion',
            data: obj
        })
    }

  export function getUnits() {
        return axios.get('http://localhost:8081/quantityMeasurement/unit/type')
    }

  export function getUnitType(obj) {
      console.log("obj--> ",obj);
      
        return axios({
           method:'post',
            url:'http://localhost:8081/quantityMeasurement/unit/subtype?unit=LENGTH',
            data : {
                type:obj
            }
        })
        
    }