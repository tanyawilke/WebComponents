class Tooltip extends HTMLElement {
    constructor() {
        super();
        //Javascript will automatically execute this method whenver this class is instantiated.
        
        this._tooltipIcon;
        this._tooltipVisible = false;
        this._tooltipText = "Some dummy tooltip text";
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
        <style>
            div {
                background-color: #000;
                border: 2px solid orange;
                color: #FFF;
                position: absolute;
                z-index: 10;
            }

            :host {
                position: relative;
            }

            :host(.important) {
                background-color: var(--color-primary, #CCC);
            }

            :host-context(p) {
                line-height: 2;
                font-weight: bold;
            }

            ::slotted(.highlight) {
                background-color: lightgreen;
                border: 1px dotted red;
            }
        </style>
        <slot>Some default</slot>
        <span> (?)</span>`;
    }

    connectedCallback() {
        if (this.hasAttribute('text')) {
          this._tooltipText = this.getAttribute('text');
        }

        this._tooltipIcon = this.shadowRoot.querySelector('span');
        this._tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        this._tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));

        this._render();
      }
    
      attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
          return;
        }
        if (name === 'text') {
          this._tooltipText = newValue;
        }
      }
    
      static get observedAttributes() {
        return ['text'];
      }
    
      disconnectedCallback() {
        this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip);
        this._tooltipIcon.removeEventListener('mouseleave', this._hideTooltip);
      }

      _render() {
        let tooltipContainer = this.shadowRoot.querySelector('div');

        if (this._tooltipVisible) {
            tooltipContainer = document.createElement('div');
            tooltipContainer.textContent = this._tooltipText;
            this.shadowRoot.appendChild(this._tooltipContainer);
        } else {
            this.shadowRoot.removeChild(tooltipContainer);
        }
      }

    //By adding an underscore you show it is not your intention to have this method called from outside class.
    //Should only be called internally
    _showTooltip() {
        this._tooltipVisible = true;
        this._render();     
    }

    _hideTooltip() {
        this._tooltipVisible = false;
        this._render();       
    }
}

window.customElements.define('tlw-tooltip', Tooltip);