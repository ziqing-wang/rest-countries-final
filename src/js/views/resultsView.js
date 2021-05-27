import View from './View.js'

class ResultsView extends View {
    _parentElement = document.querySelector('.search__results');
    _errorMessage = '😥 No country found, please try again.'

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', e => {
            const country = e.target.closest('.country');
            if (!country) return;
            const { fullname } = country.dataset;
            if (!fullname) return;
            handler(fullname);
        })
    }

    _generateMarkup() {
        return this._data.map(this._generateMarkupCountry).join('');
    }

    _generateMarkupCountry(obj) {
        return `
        <article class="country" data-fullname="${obj.name}">
            <img class="country__img" src="${obj.image}" />
            <div class="country__data">
                <h3 class="country__name">${obj.name}</h3>
                <p class="country__row"><span>Population: </span>${obj.population}</p>
                <p class="country__row"><span>Region: </span>${obj.region}</p>
                <p class="country__row"><span>Capital: </span>${obj.capital}</p>
            </div>
        </article>
    `
    }
}

export default new ResultsView();
