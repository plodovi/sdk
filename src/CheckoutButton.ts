import { css, html, LitElement } from 'lit';

export class CheckoutButton extends LitElement {
  static styles = css`
    :host {}
  `;

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  render() {
    return html`
      <button @click=${async () => {await window.Plodovi.checkoutRedirect();}}>
        <slot></slot>
      </button>
    `;
  }
}
