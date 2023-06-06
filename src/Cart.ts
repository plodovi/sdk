import { css, html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ListenerType } from './init';
import { Cart as CartInterface, CartItem } from '../src/interfaces/cart.interface';
import { finalPrice } from './utils/final-price';

export class Cart extends LitElement {
  static styles = css`
    :host {
      width: 100%;
    }

    .cart {
      background: rgba(32, 32, 42, 0.6);
      max-width: 400px;
      border: 1px solid var(--color-primary);
      padding: var(--padding-all);
      border-radius: var(--br-medium);;
    }

    .quantity-btn {
      background: none;
      outline: none;
      border: none;
      font-size: 20px;
      color: var(--color-primary);
      padding: 0;
    }

    input {
      border: 1px solid var(--color-primary);
      background: none;
      color: var(--text-light);
      padding: var(--padding-all);
      text-align: center;
      max-width: 40px;
      margin: var(--margin-x);
    }

    input:focus-visible {
      outline: none;
    }

    .cart-product-title {
      font-size: 20px;
    }

    .remove-btn {
      background: var(--color-primary);
      border-radius: var(--br-small);
      padding: var(--btn-padding);
      outline: none;
      border: none;
      font-size: var(--font-size);
      margin: var(--margin-y);
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    .quantity-wrapper {
      display: flex;
      align-items: center;
    }
  `;

  @property({ type: Number }) counter = 0;
  @state() open = false;

  @state() cart: CartInterface | null = null;

  __onOpen = (open: boolean) => {
    this.open = open;
  };

  __onCartChange = (cart: Cart | null) => {
    this.cart = cart as any;
  };

  __removeItem = async (item: CartItem) => {
    await window.Plodovi.removeCartItem(this.cart?.items || [], item);
  };

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
    return this.open
      ? html`
        <p>Cart</p>

        ${this.cart?.items?.map(
          item => html`
            <div class="cart">
              <p class="cart-product-title">${item.label}</p>
              <p class="quantity">
                ${item.quantity}
                ${item.quantityType === 'piece' ? 'kom' : 'kg'}
              </p>
              <p class="price">${finalPrice(item, window.Plodovi.options.region)} €</p>

              <div class="quantity-wrapper">
                <button class="quantity-btn" @click=${async () => {
                  await window.Plodovi.changeQuantity(this.cart?.items as CartItem[], item, item.quantity - 1);
                  this.requestUpdate();
                }}>-</button>
                <input
                  type="number"
                  value=${item.quantity}
                  @change=${async (e: any) => {
                    await window.Plodovi.changeQuantity(this.cart?.items as CartItem[], item, +e.target.value);
                    this.requestUpdate();
                  }}
                />
                <button class="quantity-btn" @click=${async (e: any) => {
                  await window.Plodovi.changeQuantity(this.cart?.items as CartItem[], item, item.quantity + 1);
                  this.requestUpdate();
                }}>+</button>
              </div>

                <button class="remove-btn" @click=${() => this.__removeItem(item)}>
                  Remove
                </button>
            </div>
          `
        )}`
      : '';
  }
}
