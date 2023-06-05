import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export class Product extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--plodovi-products-text-color, #000);
    }
  `;

  @property({ type: Number }) counter = 5;

  __increment() {
    this.counter += 1;
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <h2>${this.title} Nr. ${this.counter}!</h2>
      <button @click=${this.__increment}>increment</button>
    `;
  }
}
