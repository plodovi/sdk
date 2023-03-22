import { html, css, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import {ListenerType} from './init';
import { Cart as CartInterface, CartItem } from '../src/interfaces/cart.interface';
import { finalPrice } from './utils/final-price';

export class Cart extends LitElement {
  static styles = css`
    :host {}
  `;

  @property({ type: Number }) counter = 0;
  @state() open = false;

  @state() cart: CartInterface | null = null;

  __onOpen = (open: boolean) => {
    this.open = open;
  }

  __onCartChange = (cart: Cart | null) => {
    this.cart = cart as any;
  }

  __removeItem = async (item: CartItem) => {
    await window.Plodovi.removeCartItem(this.cart?.items || [], item);
  }

  connectedCallback() {
    super.connectedCallback();
    window.Plodovi.registerListener(ListenerType.CartOpen, this.__onOpen);
    window.Plodovi.registerListener(ListenerType.Cart, this.__onCartChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.Plodovi.removeListener(ListenerType.CartOpen, this.__onOpen);
    window.Plodovi.removeListener(ListenerType.Cart, this.__onCartChange);
  }

  render() {
    return this.open ? html`
      <p>Cart</p>

      ${this.cart?.items?.map(item => html`
       <div style='border: 1px solid black'>
          <p>${item.label}</p>
          <p>${item.quantity} ${item.quantityType === 'piece' ? 'kom' : 'kg'}</p>
          <p>${finalPrice(item, window.Plodovi.region)} €</p>
          <!-- todo: add input for amount -->
          <p>
            <button @click=${() => this.__removeItem(item)}>
              Remove
            </button>
          </p>
       </div>
      `)}
    ` : '';
  }
}
