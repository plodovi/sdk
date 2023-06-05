import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export class AddToCart extends LitElement {
  static styles = css`
    :host {}
  `;

  @property() product = '';
  @property() quantity = 1;
  @property() pack: number | undefined = undefined;

  async __add() {
    await window.Plodovi.addToCart(this.product, this.quantity, this.pack);
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <button @click=${this.__add}>
        <slot></slot>
      </button>
    `;
  }
}
