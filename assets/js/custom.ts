import '../css/custom.css';

const toggler = document.querySelectorAll('.caret');

for (const element of toggler) {
    element?.addEventListener('click', function () {
        this.parentElement.querySelector('.nested').classList.toggle('active');
        this.classList.toggle('caret-down');
    });
}
