const axios = require('axios');
const user_agent = 'soonvibes.com/1.0';

const instance = axios.create({
    baseURL: 'https://dev.soonvibes.com:10000/',
    headers: {'Client-User-Agent': user_agent}
});

export  const getRequest =(url,params)=>{
   return  instance.get('/api/v1/channels/',{params:params})
}

