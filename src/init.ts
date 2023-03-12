export class Plodovi {
	constructor() {}

	async loadProducts(retailer: string) {}

	async loadProduct(product: string) {}
}

export function init() {
	window.Plodovi = new Plodovi();
}