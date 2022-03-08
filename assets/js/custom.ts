import '../css/custom.css';

const toggler = document.querySelectorAll('.caret');

for (const element of toggler) {
    element?.addEventListener('click', function () {
        this.parentElement.querySelector('.theme-category-nested').classList.toggle('theme-category-active');
        this.classList.toggle('caret-down');
    });
}
