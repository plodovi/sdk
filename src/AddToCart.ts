import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export class AddToCart extends LitElement {
  static styles = css`
    :host {
      background: var(--color-primary);
      border-radius: var(--br-small);
      padding: var(--btn-padding);
      outline: none;
      border: none;
      font-size: var(--font-size);
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
  `;

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
