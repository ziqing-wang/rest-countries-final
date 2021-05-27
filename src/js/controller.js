import searchView from './views/searchView.js';
import filterView from './views/filterView.js';
import themeView from './views/themeView.js';
import resultsView from './views/resultsView.js';
import * as model from './model.js'

const captalize = (str) => {
    return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}

const controlSearch = async function () {
    try {
        const query = searchView.getQuery();
        if (!query) return;
        const capitalisedQuery = captalize(query);
        //load search results
        await model.loadSearchResults(capitalisedQuery);

        // Render results
        resultsView.render(model.state.results)

    } catch (err) {
        resultsView.renderError();
    }
}

// Click to go detail page
const controlClick = function (fullname) {
    // Go to detail page
    window.location.href = `detail.html#${fullname}`;
}

const controlFilter = function (filterValue) {
    const filteredResults = model.state.results.filter(c => c.region === filterValue)
    if (filteredResults.length === 0) resultsView.renderError('😥 No matched country.');
    else resultsView.render(filteredResults);
}

const persistTheme = (theme) => {
    model.state.theme = theme;
    localStorage.setItem('theme', JSON.stringify(model.state.theme));
}

const controlTheme = () => {
    const theme = JSON.parse(localStorage.getItem('theme'));
    if (!theme) return;
    document.body.classList.add(theme)
}

const init = () => {

    if (model.state.results) resultsView.render(model.state.results);

    controlTheme();
    themeView.addHandlerTheme(persistTheme);
    searchView.addHandlerSearch(controlSearch);
    resultsView.addHandlerClick(controlClick);
    filterView.addHandlerFilter(controlFilter);
}
init()