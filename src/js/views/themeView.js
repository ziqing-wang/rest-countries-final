
class ThemeView {
    _parentElement = document.body;
    _nav = document.querySelector('.nav');
    _btn = document.querySelector('.nav__mode');


    addHandlerTheme(handler) {
        this._btn.addEventListener('click', () => {
            const theme = this._isDarkTheme() ? '' : 'dark-theme';
            this._parentElement.classList.toggle('dark-theme');
            handler(theme);

            // Toggle the moon icon
            const moons = this._btn.querySelectorAll('.fa-moon');
            moons.forEach(m=> m.classList.toggle('hidden'))
        })
    }

    _isDarkTheme() {
        return this._parentElement.classList.contains('dark-theme');
    }

}

export default new ThemeView();