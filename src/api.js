import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://boiling-refuge-66454.herokuapp.com/images'
});



export const getImages = async () => {
    const response = await instance.get();
    return response.data;
}

export const getBigImg = async (id) => {
    const response = await instance.get(`/${id}`);
    return response.data;
}