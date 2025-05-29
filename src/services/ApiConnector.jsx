import axios from 'axios';

export const axiosInstance = axios.create({}); 

// axios cha instance ghetla 
// ERROR ;-- > in this  file error got of typo which last for 3 days  which is of Data ---> to --> data  
axios.defaults.withCredentials = true;

export const apiConnector = (method,url,bodyData,headers,params)=>{
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data:bodyData ? bodyData : null,
        headers:headers ? headers: null,  // there is use of ternary which indicate if headers are true then show header othewise show null &&& same like params 
        params:params?params:null
    })
}