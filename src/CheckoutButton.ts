import { css, html, LitElement } from 'lit';

export class CheckoutButton extends LitElement {
  static styles = css`
    button {
      background: var(--color-primary);
      border-radius: var(--br-small);
      padding: var(--btn-padding);
      outline: none;
      border: 1px solid var(--text-light);
      font-size: var(--font-size);
      margin: var(--margin-x);
    }
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
