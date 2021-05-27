export default class View {
    _data;
   
    render(data) {
        if (!data || (Array.isArray(data) && data.length === 0)) return;
        this._data = data;

        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('beforeend', markup);
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

    _clear() {
        this._parentElement.innerHTML = '';
    }

}