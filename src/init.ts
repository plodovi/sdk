export enum ListenerType {
	CartItem = 'cart-item',
	CartOpen = 'cart-open'
}

export interface Options {
	region: string;
	userId?: string;
}

export class Plodovi {
	constructor(options: Options) {
		this.region = options.region;
		this.userId = options.userId || '';
	}

	region: string;
	userId: string;

	cartOpen = false;
	cartItems = 0;

	private listeners: Array<{
		type: ListenerType;
		listener: (event: any) => void;
	}> = [];

	async loadProducts(retailer: string) {}

	async loadProduct(product: string) {}

	openCart() {
		this.cartOpen = true;
		this.callListeners(ListenerType.CartOpen, this.cartOpen);
	}

	closeCart() {
		this.cartOpen = false;
		this.callListeners(ListenerType.CartOpen, this.cartOpen);
	}

	toggleCart() {
		this.cartOpen = !this.cartOpen;
		this.callListeners(ListenerType.CartOpen, this.cartOpen);
	}

	onCartCountChange(items: number) {}

	registerListener(type: ListenerType, listener: (event: any) => void) {
		this.listeners.push({ type, listener });
	}

	removeListerner(type: ListenerType, listener: (event: any) => void) {
		this.listeners = this.listeners.filter(
			(l) => l.type !== type || l.listener !== listener
		);
	}

	private callListeners(type: ListenerType, value: any) {
		this.listeners.forEach(listener => {
			if (listener.type === type) {
				listener.listener(value);
			}
		})
	}
}

export function init(options: Options) {
	window.Plodovi = new Plodovi(options);
}