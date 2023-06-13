import { html, css, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import {ListenerType} from './init';
import { sharedStyles } from './utils/shared-styles';

export class CartToggle extends LitElement {
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
    div {
      width: 20px;
      height: 20px;
      background: var(--text-light);
      color: var(--color-primary);
      border-radius: var(--br-big);
      display: flex;
      align-items: center;
      justify-content: center;

    }
  `];

  @property({ type: Boolean }) count = true;
  @state() cartItems = 0;

  __toggle() {
    window.Plodovi.toggleCart();
  }

  __updateCount = (count: number) => {
    this.cartItems = count;
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
      <button @click=${this.__toggle} class='pero'>
        <slot></slot>
      </button>
      ${this.count ? this.cartItems && html`<div>${this.cartItems}</div>` : ''}
    `;
  }
}
