import axios from 'axios';
import {API} from "./constants";

var Axios = axios.create({
  baseURL: API
});

export default Axios
