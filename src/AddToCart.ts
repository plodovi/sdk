import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { sharedStyles } from './utils/shared-styles';

export class AddToCart extends LitElement {
  static styles = [
    sharedStyles,
    css`
    :host {
      background: var(--color-primary);
      border-radius: var(--br-small);
      padding: var(--btn-padding);
      outline: none;
      border: none;
      margin: var(--margin-x);
      align-items: center;
      cursor: pointer;
      display: inline-flex;
      -webkit-tap-highlight-color: transparent;
    }

    button {
      background: none;
      outline: none;
      border:none;
      cursor: pointer;
      font-size: var(--font-size);
      -webkit-tap-highlight-color: transparent;
    }
  `];

  @property() product = '';
  @property() quantity = 1;
  @property() pack: number | undefined = undefined;

  async __add() {
    await window.Plodovi.addToCart(this.product, this.quantity, this.pack);
  }

  render() {
    return html`
      <button @click=${this.__add}>
        <slot></slot>
      </button>
    `;
  }
}
