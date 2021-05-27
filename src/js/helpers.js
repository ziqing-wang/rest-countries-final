import { TIMEOUT_SEC } from './config.js'

const timeout = async function (s) {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error(`Request took too long! Timeout after ${s} second`))
        }, s * 1000)
    })
}

export const getJSON = async function (url) {
    try {
        const fetchPro = Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
        const res = await fetchPro;
        const data = res.json();
        if (!res.ok) throw new Error(`${data.message} - ${res.status}`)
        return data;
    } catch (err) {
        throw err;
    }
}