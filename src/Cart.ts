import { css, html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ListenerType } from './init';
import { Cart as CartInterface, CartItem } from '../src/interfaces/cart.interface';
import { finalPrice } from './utils/final-price';
import { sharedStyles } from './utils/shared-styles';

export class Cart extends LitElement {
  static styles = [
    sharedStyles,
    css`
    :host {
    }

    .cart {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      background: rgb(44, 44, 46);
      max-width: 300px;
      width: 100%;
      border: 1px solid var(--color-primary);
      padding: var(--padding-all-md);
      border-radius: var(--br-medium);
      color:var(--text-light);
      position: absolute;
      right: 1rem;
      top: 5rem;
      -webkit-tap-highlight-color: transparent;
    }

    .product-wrapper {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      border-bottom: 1px solid var(--color-primary);
    }

    .cart-product {
      width: 60%;
    }

    .quantity-btn {
      background: none;
      outline: none;
      border: 1px solid var(--color-primary);
      font-size: var(--font-size);
      color: var(--color-primary);
      padding: var(--padding-all);
      cursor: pointer;
      text-align: center;
      max-width: 35px;
      width: 100%;
      transition: .4s all ease-in-out;
    }

    input {
      border-top: 1px solid var(--color-primary);
      border-bottom: 1px solid var(--color-primary);
      border-left: none;
      border-right: none;
      background: none;
      font-size: var(--font-size);
      color: var(--color-primary);;
      padding: var(--padding-all);
      text-align: center;
      border-radius: 0;
      max-width: var(--quantity-btn-w);
    }

    @supports (-webkit-touch-callout: none) {
      input {}
    }


      input:focus-visible {
      outline: none;
    }

    .cart-product-title {
      font-size: 20px;
      margin: 0;
    }

    .quantity-wrapper {
      display: flex;
      align-items: center;
    }

    .remove-btn {
      color: var(--color-primary);
      border: none;
      background: none;
      outline: none;
      font-size: var(--font-size);
      margin: var(--margin-y);
      cursor: pointer;
    }

    .quantity-btn-wrapper {
      display: flex;
      align-items: center;
    }

    .quantity-btn:hover {
      background: var(--color-primary);
      color: white;
      transition: .4s all ease-in-out;
    }

    .image-wrapper {
      width: 35%;
      display: flex;
      align-items: center;
    }

    .close {
      color: var(--color-primary);
      font-size: 20px;
      position: absolute;
      right: 1rem;
      top: 0.5rem;
      cursor: pointer;
    }

    .overlay {
      background: white;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: .2;
      width: 100%;
      height: 100%;
    }
  `];

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
        <div class="overlay" @click=${() => this.__onOpen(false)}></div>

        ${this.cart?.items?.map(
        item => html`
            <div class="cart">
              <span class="close" @click=${() => this.__onOpen(false)}>x</span>
              <div class="product-wrapper">
                <div class="image-wrapper">
                  <img src="${item.image}" alt="product">
                </div>
                <div class="cart-product">
                <p class="cart-product-title">${item.label}</p>
                <div class="quantity-wrapper">
                  <p class="quantity">
                    ${item.quantity}
                    ${item.quantityType === 'piece' ? 'kom' : 'kg'}
                  </p>
                  <span style="margin: 0 5px">/</span>
                  <p class="price">${finalPrice(item, window.Plodovi.options.region)} €</p>
                </div>

                <div class="quantity-btn-wrapper">
                  <button class="quantity-btn" @click=${async () => {
          await window.Plodovi.changeQuantity(this.cart?.items as CartItem[], item, item.quantity - 1);
          this.requestUpdate();
        }}>-</button>
                  <input
                    type="text"
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
              </div>
              <plodovi-checkout-button>Go to checkout</plodovi-checkout-button>
            </div>
          `
      )}`
      : '';
  }
}
