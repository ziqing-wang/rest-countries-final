import View from "./View.js";

class DetailView extends View {
    _parentElement = document.querySelector('.detail__country')
    _btn = document.querySelector('.btn__goback');

    addHandlerGoBack(handler) {
        this._btn.addEventListener('click', handler)
    }

    addHandlerNeighbours(handler) {
        this._parentElement.addEventListener('click', e => {
            const btn = e.target.closest('.detail__btn');
            if (!btn) return;
            const neighbour = btn.innerText;
            handler(neighbour)
        })
    }

    _generateMarkup() {
        return `
            <article class="country" data-fullname="belgium">
                <img class="country__img" src="${this._data.image}" />
                <div class="country__main">
                    <h3 class="country__name">${this._data.name}</h3>

                    <div class="country__data">
                        <div class="country__column">
                            <p class="country__row"><span>Native Name:</span>${this._data.nativeName}</p>
                            <p class="country__row"><span>Population:</span>${this._data.population}</p>
                            <p class="country__row"><span>Region:</span>${this._data.region}</p>
                            <p class="country__row"><span>Sub Region:</span>s${this._data.subRegion}</p>
                            <p class="country__row"><span>Capital:</span>${this._data.capital}</p>
                        </div>
                        <div class="country__column">
                            <p class="country__row"><span>Top Level Domain:</span>${this._data.topLevelDomain}</p>
                            <p class="country__row"><span>Currencies:</span>${this._data.currencies}</p>
                            <p class="country__row"><span>Language:</span>${this._data.languages.map(l => l.name).join(', ')}</p>
                        </div>
                    </div>

                    <div class="country__borders">
                        <span>Border Counties:</span>
                        <div>
                           ${ this._data.borders.map(this._generateMarkupBorders).join('')}
                        </div>
                    </div>
                </div>
            </article>
        `
    }
    _generateMarkupBorders(neighbour) {
        return `<button class="detail__btn">${neighbour}</button>`
    }

}

export default new DetailView();