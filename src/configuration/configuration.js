const axios = require('axios').default;

export function getMainUnits() 
{
    return axios.get('http://localhost:8081/quantityMeasurement/unit/type')
}

export function getSubUnits(mainUnit) 
{
    console.log("obj--> ",mainUnit);
    return axios({
        method:'get',
        url:'http://localhost:8081/quantityMeasurement/unit/subtype',
        params :{ unit:mainUnit}
    })
}

export function getConvertedValue(input) 
{
    console.log("obj--> ",input);
    return axios({
        method:'post',
        url:'http://localhost:8081/quantityMeasurement/unit/conversion',
        data : input
    })
}