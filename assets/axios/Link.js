import axios from 'axios';

const url = 'http://192.168.1.8:3000'; 

export const link = axios.create({
  baseURL: url,
});
