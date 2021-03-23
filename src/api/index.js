import axios from 'axios';
import { handleException } from '../utils/handler.js';

async function fetchData(url){
    try{
        const response = await axios.get(url);
        return response;

    }catch(err){
        handleException(err);

    }
}

async function fetchConfig(name){
    try{
        const response = await axios.get(`/${name}/config.json`);
        return response;

    }catch(err){
        handleException(err);

    }
}

export { 
    fetchData,
    fetchConfig
}