export default class View {
    _data;
    constructor() {
    }

    render(data) {
        if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
        this._data = data;

        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('beforeend', markup);
    }

    _clear() {
        this._parentElement.innerHTML = '';
    }

    _switchMode() {
        this._btn.addEventListener('click', () => {
            this._parentElement.classList.toggle('dark-theme');
        })
    }

    renderError(message = this._errorMessage) {
        const markup = `
            <div class="message"> 
              ${message}
            </div> 
          `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
}