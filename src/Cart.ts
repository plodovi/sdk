import { html, css, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import {ListenerType} from './init';

export class Cart extends LitElement {
  static styles = css`
    :host {}
  `;

  @property({ type: Number }) counter = 5;
  @state() open = false;

  onOpen = (open: boolean) => {
    this.open = open;
  }

  connectedCallback() {
    super.connectedCallback();
    window.Plodovi.registerListener(ListenerType.CartOpen, this.onOpen);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.Plodovi.removeListerner(ListenerType.CartOpen, this.onOpen);
  }

  render() {
    return this.open ? html`
      <p>Cart</p>
    ` : '';
  }
}
