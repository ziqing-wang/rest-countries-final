import * as model from './model.js';
import detailView from './views/detailView.js';
import themeView from './views/themeView.js';

const controlRender = async function () {
    const fullname = location.hash.slice(1);

    // Load country detail
    await model.loadCountryDetail(fullname);

    // Render country on details page
    detailView.render(model.state.country)
}

const controlGoBack = function () {
    // Go to home page
    window.location.href = 'index.html';
}

const controlNeighbourClick = async function (neighbour) {
    console.log(neighbour);
    if (!neighbour) return;
    await model.loadNeighbour(neighbour);

    detailView.render(model.state.country);
}

const controlTheme = () => {
    const theme = JSON.parse(localStorage.getItem('theme'));
    if (!theme) return;
    document.body.classList.add(theme)
}

const init = () => {
    controlRender();
    controlTheme();
    detailView.addHandlerGoBack(controlGoBack);
    detailView.addHandlerNeighbours(controlNeighbourClick)
}
init()