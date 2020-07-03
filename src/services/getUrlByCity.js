import api from '../constants/api_url'


const getUrlByCity = city => {
    return `${api.base}${city}&APPID=${api.key}`
}

export default getUrlByCity