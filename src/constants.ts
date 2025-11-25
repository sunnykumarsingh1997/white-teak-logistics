export interface Product {
    id: string;
    name: string;
    price: number; // Base price in USD
    weight: number; // in kg
    category: 'Chandelier' | 'Sconce' | 'Table Lamp' | 'Custom';
}

export interface CartItem extends Product {
    quantity: number;
}

export const MOCK_PRODUCTS: Product[] = [
    { id: 'p1', name: 'The Aurelia Chandelier', price: 12500, weight: 15.5, category: 'Chandelier' },
    { id: 'p2', name: 'Vanguard Crystal Sconce', price: 4200, weight: 3.2, category: 'Sconce' },
    { id: 'p3', name: 'Obsidian Table Lamp', price: 3800, weight: 4.5, category: 'Table Lamp' },
    { id: 'p4', name: 'Celestial Tiered Chandelier', price: 18900, weight: 22.0, category: 'Chandelier' },
    { id: 'p5', name: 'Lumina Wall Sconce', price: 3500, weight: 2.8, category: 'Sconce' },
];

export const COMPANY_INFO = {
    name: 'White Teak LLC',
    address: 'Shams Business Center, Sharjah Media City Free Zone,\nAl Messaned, Sharjah, UAE.',
    phone: '+44 20 7123 4567',
    email: 'concierge@whiteteakllc.com',
    website: 'www.whiteteakllc.com',
};

export const CURRENCIES = {
    USD: { symbol: '$', rate: 1, locale: 'en-US' },
    AED: { symbol: 'AED ', rate: 3.67, locale: 'en-AE' },
    INR: { symbol: '₹', rate: 83.5, locale: 'en-IN' },
    GBP: { symbol: '£', rate: 0.79, locale: 'en-GB' },
    JPY: { symbol: '¥', rate: 150.5, locale: 'ja-JP' },
};

export type CurrencyCode = keyof typeof CURRENCIES;
