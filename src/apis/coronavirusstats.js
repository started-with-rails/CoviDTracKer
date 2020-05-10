import axios from 'axios';

export default axios.create({
  baseURL: `https://corona-virus-stats.herokuapp.com/api/v1/cases/`
});