import { doc, Firestore, getDoc, getFirestore, setDoc } from '@firebase/firestore';
import { FirebaseApp } from '@firebase/app';
import { Cart, CartItem } from './interfaces/cart.interface';

export enum ListenerType {
	CartItem = 'cart-item',
	CartOpen = 'cart-open'
}

export interface Options {
  app: FirebaseApp;
	region: string;
	userId?: string;
}

export class Plodovi {
	constructor(options: Options) {
		this.region = options.region;

    if (!options.userId) {
      options.userId = this.generateGuestId();
      localStorage.setItem('plodovi-guest-id', options.userId);
    }
		this.userId = options.userId;
    this.firestore = getFirestore(options.app);
	}

	region: string;
	userId: string;
  firestore: Firestore;

	cartOpen = false;
  cartItems = 0;
  cart: Cart | null = null;

	private listeners: Array<{
		type: ListenerType;
		listener: (event: any) => void;
	}> = [];

	async loadProducts(retailer: string) {}

	async loadProduct(product: string) {}

  async addToCart(productId: string, quantity: number, pack: number | undefined) {
    const productSnap = await getDoc(doc(this.firestore, 'products', productId));
    const product: any = {
      id: productId,
      ...productSnap.data()
    };

    const price = product.quantityType === 'piece' ?
      (product.packs[pack || 0] || product.packs[0]).price :
      product.price;

    const cartItem = this.createCartItem(product, price, quantity, pack);

    if (this.cart) {
      this.cart.region = this.region;
      const index = this.cart.items.findIndex(
        item =>
          item.id === cartItem.id &&
          (!(item.hasOwnProperty('pack') && item.hasOwnProperty('packs')) ||
            item.pack === cartItem.pack)
      );

      if (index !== -1) {
        this.cart.items[index].quantity =
          this.cart.items[index].quantity + cartItem.quantity;
      } else {
        this.cart.items.push(cartItem);
        this.cart.itemIds.push(cartItem.id);
      }
    } else {
      this.cart = {
        id: this.userId,
        items: [cartItem],
        itemIds: [cartItem.id],
        region: this.region,
        guestId: this.userId
      };
    }

    this.onCartCountChange(this.cart.items.length);
    await setDoc(doc(this.firestore, 'carts', this.userId), this.cart);
  }

  generateGuestId(): string {
    // Alphanumeric characters
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let autoId = '';
    for (let i = 0; i < 20; i++) {
      autoId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return autoId;
  }

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

	onCartCountChange(items: number) {
    this.cartItems = items;
    console.log('onCartCountChange', this.cartItems);
  }

	registerListener(type: ListenerType, listener: (event: any) => void) {
		this.listeners.push({ type, listener });
	}

	removeListerner(type: ListenerType, listener: (event: any) => void) {
		this.listeners = this.listeners.filter(
			(l) => l.type !== type || l.listener !== listener
		);
	}

  createCartItem(
    product: any,
    price: any[],
    quantity: number,
    pack?: number
  ) {
    const data: CartItem = {
      id: product.id,
      label: product.title,
      price,
      quantity,
      retailer: product.retailer,
      strain: product.strain,
      category: product.category,
      subCategory: product.subCategory,
      subStrain: product.subStrain,
      quantityType: product.quantityType,
      volumeType: product.volumeType,
      ...(product.gallery &&
        product.gallery.length && {
          image: product.gallery[0]
        }),
      latestOrder: product.latestOrder || 18,
      retailerListed: product.retailerListed,
      active: product.active,
      ...(product.earliestOrder ? {earliestOrder: product.earliestOrder} : {}),
      ...(product.latestOrderDate
        ? {latestOrderDate: product.latestOrderDate}
        : {}),
      ...(product.maxQuantity ? {maxQuantity: product.maxQuantity} : {}),
      ...(product.minQuantity ? {minQuantity: product.minQuantity} : {}),
      bottleRefund: !!product.bottleRefund,
      warehouseCode: product.warehouseCode,
      thermalPackaging: !!product.thermalPackaging,
      ...(product.vat ? {vat: product.vat} : {})
    };

    if (product.quantityType === 'piece') {
      data.pack = pack as number;
      data.packs = product.packs;
      data.label += ` | ${product.packs[data.pack].label}`;
    }

    return data;
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
