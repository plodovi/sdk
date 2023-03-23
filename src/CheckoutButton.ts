import { css, html, LitElement } from 'lit';

export class CheckoutButton extends LitElement {
  static styles = css`
    :host {}
  `;

  // @property({ type: Boolean }) count = true;
  // @state() cartItems = 0;

  __updateCount = (count: number) => {
  }

  connectedCallback() {
    super.connectedCallback();
    // window.Plodovi.registerListener(ListenerType.CartItem, this.__updateCount);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // window.Plodovi.removeListener(ListenerType.CartItem, this.__updateCount);
  }

  render() {
    return html`
      <button @click=${async () => {await window.Plodovi.checkoutRedirect();}}>
        <slot></slot>
      </button>
    `;
  }
}
