class Toggle extends HTMLButtonElement {
    connectedCallback() {
        const button = document.querySelector('button');
        const infoEl = document.querySelector('p');

        let isHidden = true;

        button.addEventListener('click', () => {
            if (isHidden) {
            infoEl.style.display = 'block';
            button.textContent = 'Hide';
            isHidden = false;
            } else {
            infoEl.style.display = 'none';
            button.textContent = 'Show';
            isHidden = true;
            }
        });
    }
}

window.customElements.define('tlw-toggle', Toggle, { extends: 'button' });