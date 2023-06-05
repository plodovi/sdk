import { html, css, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import {ListenerType} from './init';

export class CartToggle extends LitElement {
  static styles = css`
    :host {}
  `;

  @property({ type: Boolean }) count = true;
  @state() cartItems = 0;

  __toggle() {
    window.Plodovi.toggleCart();
  }

  __updateCount = (count: number) => {
    this.cartItems = count;
  }

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    window.Plodovi.registerListener(ListenerType.CartItem, this.__updateCount);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.Plodovi.removeListener(ListenerType.CartItem, this.__updateCount);
  }

  render() {
    return html`
      <button @click=${this.__toggle}>
        <slot></slot>
      </button>
      ${this.count ? this.cartItems && html`<span>${this.cartItems}</span>` : ''}
    `;
  }
}
