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
        color: var(--text-dark)!important;
        margin: var(--margin-x);
        display: flex;
        align-items: center;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
        @media (max-width: 600px) {
          padding: var(--btn-padding-xs);
        }
      }

      button {
        background: none;
        outline: none;
        border:none;
        cursor: pointer;
        font-size: var(--font-size);
        -webkit-tap-highlight-color: transparent;
        @media (max-width: 600px) {
          font-size:14px
        }
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
