import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export class AddToCart extends LitElement {
  static styles = css`
    :host {}
  `;

  @property({ type: String }) product = '';
  @property({ type: Number }) quantity = 1;

  __add() {
    
  }

  render() {
    return html`
      <button @click=${this.__add}>
        <slot></slot>  
      </button>
    `;
  }
}
