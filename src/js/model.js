import { getJSON } from './helpers.js';
import { API_URL } from './config.js'

export const state = {
    country: {},
    results: [],
    theme: ''
}

const createCountryObject = (data) => {
    return {
        name: data.name,
        nativeName: data.nativeName,
        population: +data.population,
        topLevelDomain: data.topLevelDomain,
        region: data.region,
        capital: data.capital,
        image: data.flag,
        languages: data.languages,
        subRegion: data.subregion,
        currencies: data.currencies[0].name,
        borders: data.borders
    }
}

const persistSearchResults = function () {
    localStorage.setItem('countries', JSON.stringify(state.results))
}

export const loadSearchResults = async function (query) {
    try {
        const data = await getJSON(`${API_URL}name/${query}`);
        if (!data) return;
        state.results = data.map(country => {
            return {
                name: country.name,
                population: +country.population,
                region: country.region,
                capital: country.capital,
                image: country.flag
            }
        });
        persistSearchResults();
    } catch (err) {
        throw err;
    }
}

export const loadCountryDetail = async function (fullname) {
    try {
        const [data] = await getJSON(`${API_URL}name/${fullname}?fullText=true`);
        if (!data) return;
        state.country = createCountryObject(data);
    } catch (err) {
        throw err;
    }
}

export const loadNeighbour = async function (neighbour) {
    try {
        const data = await getJSON(`${API_URL}alpha/${neighbour}`);
        if (!data) return;
        state.country = createCountryObject(data);
    } catch (err) {
        throw err;
    }
}

const init = () => {
    const storage = localStorage.getItem('countries');
    if (storage) state.results = JSON.parse(storage);

    const theme = JSON.parse(localStorage.getItem('theme'));
    state.theme = theme;
}
init();

const clearStorage = () => {
    localStorage.clear()
}
//clearStorage()