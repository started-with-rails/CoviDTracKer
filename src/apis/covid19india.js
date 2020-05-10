import axios from 'axios';

export default axios.create({
  baseURL: `http://covid19-india-adhikansh.herokuapp.com/`
});