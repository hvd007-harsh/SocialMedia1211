import axios from 'axios';
const PORT = process.env.PORT;
console.log(PORT);
const Axios = axios.create({
    baseURL: 'http://127.0.0.1:5000'
})

export default Axios;