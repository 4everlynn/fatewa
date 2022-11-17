class FocusTag extends HTMLElement {
    constructor() {
        super()
        const shadowRoot = this.attachShadow({mode: 'open'});
        let hasLink = this.hasAttribute("link");
        shadowRoot.innerHTML = `
            <div style="background: ${hasLink ? '#07163a' : 'linear-gradient(45deg, #5319f5, #96002a54)' };
                         display: inline-block;
                         padding: 3px 8px;
                         border-radius: 3px;
                         color: white;
                         letter-spacing: 2px;
                         border: 1px solid #642bff;
                         ${hasLink ? 'border-bottom: 1px solid #00ff5e;' : 'border-bottom: none;' }
                         margin: 8px 8px;
                         transform: translateY(-3px);
                         font-weight: 200;
                         font-size: 12px">
                 ${this.innerHTML}
            </div>
        `
    }
}

customElements.define('focus-tag', FocusTag)
