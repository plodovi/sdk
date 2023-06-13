import { css, html, LitElement } from 'lit';
import { sharedStyles } from './utils/shared-styles';

export class CheckoutButton extends LitElement {
  static styles = [
    sharedStyles,
    css`
      :host {
        background: var(--color-primary);
        border-radius: var(--br-small);
        padding: var(--btn-padding);
        outline: none;
        border: none;
        font-size: var(--font-size);
        color: var(--text-dark);
        margin: var(--margin-x);
        display: flex;
        align-items: center;
        cursor: pointer;
      }

      button {
        background: none;
        outline: none;
        border:none;
        cursor: pointer;
      }
  `];

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
