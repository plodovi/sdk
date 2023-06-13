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
      width: 100%;
    }

    .cart {
      display: flex;
      flex-wrap: wrap;
      background: rgb(44, 44, 46);
      max-width: 300px;
      width: 100%;
      border: 1px solid var(--color-primary);
      padding: var(--padding-all-20);
      border-radius: var(--br-medium);;
    }

    .product-wrapper {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      border-bottom: 1px solid var(--color-primary);
    }

    .cart-product {
      flex: 1;
    }

    .quantity-btn {
      background: none;
      outline: none;
      border: none;
      font-size: var(--font-size-md);
      color: var(--color-primary);
      padding: 0;
      cursor: pointer;
    }

    input {
      border-top: 1px solid var(--color-primary);
      border-bottom: 1px solid var(--color-primary);
      border-left: none;
      border-right: none;
      background: none;
      color: var(--color-primary);;
      padding: var(--padding-all);
      text-align: center;
      max-width: var(--quantity-btn-w);
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
      margin: var(--margin-y-20);
      cursor: pointer;
    }

    .quantity-btn-wrapper {
      display: flex;
      align-items: center;
    }

    .quantity-btn {
      border: 1px solid var(--color-primary);
      padding: 6px 10px;
      text-align: center;
      max-width: 35px;
      width: 100%;
      transition: .4s all ease-in-out;
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
        <p>Cart</p>

        ${this.cart?.items?.map(
        item => html`
            <div class="cart">
              <div class='product-wrapper'>
                <div class="image-wrapper">
                  <p>image holder</p>
                </div>
                <div class='cart-product'>
                <p class="cart-product-title">${item.label}</p>
                <div class='quantity-wrapper'>
                  <p class="quantity">
                    ${item.quantity}
                    ${item.quantityType === 'piece' ? 'kom' : 'kg'}
                  </p>
                  <span style='margin: 0 5px'>/</span>
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
            </div>
          `
      )}`
      : '';
  }
}
