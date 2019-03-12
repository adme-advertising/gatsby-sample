import axios from 'axios';

export default axios.create({
    baseURL: 'https://staging-stie.adus.com.au/wp-json'
});