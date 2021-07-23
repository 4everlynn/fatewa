class FocusTag extends HTMLElement {
    constructor() {
        super()
        const shadowRoot = this.attachShadow({mode: 'open'});
        let hasLink = this.hasAttribute("link");
        shadowRoot.innerHTML = `
            <div style="background: ${hasLink ? '#07163a' : '#5319f5' };
                         display: inline-block;
                         padding: 3px 8px;
                         border-radius: 3px;
                         color: white;
                         letter-spacing: 2px;
                         border: 1px solid #642bff;
                         ${hasLink ? 'border-bottom: 1px solid #00ff5e;' : null }
                         margin: 8px 3px;
                         font-weight: 200;
                         font-size: 12px">
                 ${this.innerHTML}
            </div>
        `
    }
}

customElements.define('focus-tag', FocusTag)
