import { html, css, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import {ListenerType} from './init';
import { sharedStyles } from './utils/shared-styles';

export class CartToggle extends LitElement {
  static styles = [
    sharedStyles,
    css`
      :host {
        outline: none;
        border: none;
        color: var(--text-dark);
        margin: var(--margin-x);
        display: flex;
        align-items: flex-start;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
        position: relative;
        min-width: 50px;
      }

      button {
        width: 100%;
        background: none;
        height: 100%;
        outline: none;
        border:none;
        cursor: pointer;
        font-size: var(--font-size);
        padding: var(--padding-y);
        -webkit-tap-highlight-color: transparent;
      }

      div {
        position: absolute;
        top: 0;
        right: -10px;
        width: 20px;
        height: 20px;
        background: var(--text-light);
        color: var(--color-primary);
        border-radius: var(--br-big);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      img {
        height: 50px;
      }

      .nudge {
        position: relative;
        animation: nudge 0.5s infinite alternate;
      }

      @keyframes nudge {
        0% { transform: translateX(-2px); }
        25% { transform: translateX(2px); }
        50% { transform: translateX(-2px); }
        75% { transform: translateX(2px); }
        100% { transform: translateX(0); }
      }
    `];

  @property({ type: Boolean }) count = true;
  @state() cartItems = 0;
  @state() nudge = false;
  @state() disableInitialNudge = true;

  __toggle() {
    if (this.cartItems) {
      window.Plodovi.toggleCart();
    }
  }

  __updateCount = (count: number) => {
    if (!this.disableInitialNudge) {
      this.nudge = true;
    } else {
      this.disableInitialNudge = false;
    }

    setTimeout(() => this.nudge = false, 500);
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
      <button class="${this.nudge ? 'nudge' : ''}" @click=${this.__toggle}>
        <slot></slot>
      </button>
      ${this.count ? this.cartItems && html`<div>${this.cartItems}</div>` : ''}
    `;
  }
}
