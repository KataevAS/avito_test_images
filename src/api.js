import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://boiling-refuge-66454.herokuapp.com/images'
});

//          https://boiling-refuge-66454.herokuapp.com/images/:imageId/comments       axios#post(url[, data[, config]])

export const getImages = async () => {
    try {
        const response = await instance.get();
        return response.data;
    } catch (e) {
        console.log('Ошибка запроса ' + e.message);
    }
}

export const getBigImg = async (id) => {
    try {
        const response = await instance.get(`/${id}`);
        return response.data;
    } catch (e) {
        console.log('Ошибка запроса ' + e.message);
    }
}

export const setComment = async (id, name, comment) => {
    try {
        const response = await instance.post(`/${id}/comments`, JSON.stringify({ name: name || 'anonymous', comment }), { headers: { 'Content-Type': 'application/json' } });
        if (response.status !== 204) {
            throw new Error('Не удалось отправить данные.')
        }
        return true;
    } catch (e) {
        console.log('Ошибка запроса ' + e.message);
    }
}