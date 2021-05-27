class FilterView {
    _parentElement = document.querySelector('.drop-down');
    _dropdownBtn = this._parentElement.querySelector('.drop-down__btn');
    _listContainer = this._parentElement.querySelector('.option-list');

    constructor() {
        this._toggleOptions();
    }

    addHandlerFilter(handler) {
        this._parentElement.addEventListener('click', e => {
            const { option } = e.target.dataset;
            if (!option) return;
            handler(option);
        })
    }

    _toggleOptions() {
        this._dropdownBtn.addEventListener('click', () => {
            this._listContainer.classList.toggle('hidden');
        })
    }
}

export default new FilterView;
