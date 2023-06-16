import { css, html, LitElement } from 'lit';
import { sharedStyles } from './utils/shared-styles';

export class CheckoutButton extends LitElement {
  static styles = [
    sharedStyles,
    css`
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-top: 20px;
        padding-bottom: 20px;
        -webkit-tap-highlight-color: transparent;
        width: 100%;
        border-bottom: 1px solid var(--color-primary);
        @media (max-width: 600px) {
          padding: var(--btn-padding-xs);
        }
      }

      button {
        width: 100%;
        background: var(--color-primary);
        border-radius: var(--br-small);
        padding: var(--btn-padding);
        outline: none;
        border: none;
        color: var(--text-dark)!important;
        font-size: var(--font-size);
        -webkit-tap-highlight-color: transparent;
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
