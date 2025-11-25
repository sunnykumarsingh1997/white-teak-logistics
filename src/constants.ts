export interface Product {
    id: string;
    name: string;
    price: number; // Base price in USD
    weight: number; // in kg
    category: 'Chandelier' | 'Sconce' | 'Table Lamp' | 'Gate Light' | 'Custom';
}

export interface CartItem extends Product {
    quantity: number;
}

export const MOCK_PRODUCTS: Product[] = [
    { id: 'p1', name: 'Amalfi (Black, Built-in LED) Indoor/Outdoor Wall Light (IP65 Rated)', price: 10, weight: 1.5, category: 'Sconce' },
    { id: 'p2', name: 'Love Found Gate Light', price: 200, weight: 3.0, category: 'Gate Light' },
    { id: 'p3', name: 'North Star (Black, Built-In LED) Indoor/ Outdoor Wall Light (IP65 Rated)', price: 100, weight: 1.8, category: 'Sconce' },
    { id: 'p4', name: 'North Star (Built-In LED) Gate Light', price: 20, weight: 2.5, category: 'Gate Light' },
    { id: 'p5', name: 'Starlight Gate Light', price: 50, weight: 2.0, category: 'Gate Light' },
    { id: 'p6', name: '3S Spiral Staircase Long Crystal Chandelier', price: 22000, weight: 45.0, category: 'Chandelier' },
    { id: 'p7', name: 'Add The Frosting (Gold) Crystal Chandelier', price: 1400, weight: 12.0, category: 'Chandelier' },
    { id: 'p8', name: 'Black Tie Crystal Chandeliers', price: 800, weight: 8.5, category: 'Chandelier' },
    { id: 'p9', name: 'Cheat Sheet (Dimmable LED with Remote Control) Chandeliers', price: 100, weight: 5.0, category: 'Chandelier' },
    { id: 'p10', name: 'Contemporary Swivel Long Crystal Chandelier', price: 24300, weight: 50.0, category: 'Chandelier' },
    { id: 'p11', name: 'Cube Story Smart (Dimmable & Remote) Double Height LED Chandelier', price: 21500, weight: 35.0, category: 'Chandelier' },
    { id: 'p12', name: 'Daytime Dawn (3 Color Dimmable LED with Remote Control) Chandelier', price: 600, weight: 6.0, category: 'Chandelier' },
    { id: 'p13', name: 'Earn Your Heritage (Chrome) Crystal Chandelier', price: 23789, weight: 40.0, category: 'Chandelier' },
    { id: 'p14', name: 'Georgian Glamour Grand Crystal Chandelier', price: 3500, weight: 18.0, category: 'Chandelier' },
    { id: 'p15', name: 'Glass Maze (Smart & Dimmable) Double Height LED Chandelier', price: 29999, weight: 55.0, category: 'Chandelier' },
    { id: 'p16', name: 'Glow Miles (Dimmable LED with Remote Control) Chandelier', price: 600, weight: 6.0, category: 'Chandelier' },
    { id: 'p17', name: 'Grecian Glamour (Blue) Textured Glass Chandelier', price: 11077, weight: 22.0, category: 'Chandelier' },
    { id: 'p18', name: 'I Shall Return (Gold) Textured Glass Chandelier', price: 2500, weight: 15.0, category: 'Chandelier' },
    { id: 'p19', name: 'Incredible Smart (Dimmable & Remote) Double Height LED Chandelier', price: 25399, weight: 48.0, category: 'Chandelier' },
    { id: 'p20', name: 'Jodha Palace Grande Chandelier', price: 21400, weight: 42.0, category: 'Chandelier' },
    { id: 'p21', name: 'Kind To The Mind (Green/Blue) Clear Glass Chandelier', price: 1500, weight: 10.0, category: 'Chandelier' },
    { id: 'p22', name: 'Late For Reality Glass Crystal Chandelier', price: 4430, weight: 16.0, category: 'Chandelier' },
    { id: 'p23', name: 'Letters Of Love Grand Crystal Chandelier', price: 700, weight: 7.0, category: 'Chandelier' },
    { id: 'p24', name: 'Louder Than Thunder (Medium) Crystal Chandelier', price: 3200, weight: 14.0, category: 'Chandelier' },
    { id: 'p25', name: 'Luceat Long Crystal Chandelier', price: 20999, weight: 38.0, category: 'Chandelier' },
    { id: 'p26', name: 'Lunch In London Glass Chandelier', price: 1300, weight: 9.0, category: 'Chandelier' },
    { id: 'p27', name: 'Made In Heaven (Glass & Crystal) Chandelier', price: 1600, weight: 11.0, category: 'Chandelier' },
    { id: 'p28', name: 'Maharaja Style Indian Crystal Chandelier', price: 23399, weight: 44.0, category: 'Chandelier' },
    { id: 'p29', name: 'Melodrama (Gold/Amber/Black) Textured Glass Chandelier', price: 2500, weight: 15.0, category: 'Chandelier' },
    { id: 'p30', name: 'Midnight In Paris Chandelier', price: 6646, weight: 20.0, category: 'Chandelier' },
    { id: 'p31', name: 'Mixed Emotions (Chrome/Amber/White) Clear Glass Chandelier', price: 3400, weight: 13.0, category: 'Chandelier' },
    { id: 'p32', name: 'Myth & Magic (Gold) Glass Crystal Chandelier', price: 300, weight: 4.0, category: 'Chandelier' },
    { id: 'p33', name: 'Never Seen Forever (Dimmable LED with Remote Control) Chandelier', price: 550, weight: 5.5, category: 'Chandelier' },
    { id: 'p34', name: 'One More Try Glass (Gold, White) Tinted Glass Chandelier', price: 19940, weight: 36.0, category: 'Chandelier' },
    { id: 'p35', name: 'Queen\'s Necklace (Rose Gold) Crystal Chandelier', price: 3000, weight: 12.0, category: 'Chandelier' },
    { id: 'p36', name: 'Royalty Classic Chandelier', price: 27599, weight: 52.0, category: 'Chandelier' },
    { id: 'p37', name: 'Rubiq Crystal Chandelier', price: 22000, weight: 41.0, category: 'Chandelier' },
    { id: 'p38', name: 'Seat At The Table Crystal Chandelier', price: 17723, weight: 30.0, category: 'Chandelier' },
    { id: 'p39', name: 'Sleepover (Gold, 3 Color Dimmable LED with Remote Control) Chandelier', price: 700, weight: 6.5, category: 'Chandelier' },
    { id: 'p40', name: 'Snow Angel Chandelier', price: 2500, weight: 15.0, category: 'Chandelier' },
    { id: 'p41', name: 'Spiral Long K9 Crystal Chandelier', price: 25100, weight: 46.0, category: 'Chandelier' },
    { id: 'p42', name: 'Starry Skies (Medium) Crystal Chandelier', price: 8862, weight: 25.0, category: 'Chandelier' },
    { id: 'p43', name: 'Steps Of Rome Glass Chandelier', price: 1600, weight: 11.0, category: 'Chandelier' },
    { id: 'p44', name: 'String Of Pearls (Gold) Textured Glass Chandelier', price: 13292, weight: 28.0, category: 'Chandelier' },
    { id: 'p45', name: 'Sweeping Changes (Gold, Oval, Molten Wax-Styled) Crystal Chandelier', price: 22899, weight: 43.0, category: 'Chandelier' },
    { id: 'p46', name: 'Touch The Clouds (Gold, Round) Crystal Chandelier', price: 900, weight: 8.0, category: 'Chandelier' },
    { id: 'p47', name: 'Trance (Large) Chandelier', price: 6645, weight: 19.0, category: 'Chandelier' },
    { id: 'p48', name: 'Up In The Air (3 Color Dimmable LED with Remote Control) Chandelier', price: 700, weight: 6.5, category: 'Chandelier' },
    { id: 'p49', name: 'Velvet Haze (Brown) Textured Glass Chandelier', price: 8860, weight: 24.0, category: 'Chandelier' },
    { id: 'p50', name: 'Velvet Haze (Brown) Textured Glass Chandelier (Large)', price: 3000, weight: 12.0, category: 'Chandelier' },
    { id: 'p51', name: 'Watch the Throne (Horizontal) Crystal Chandelier', price: 4300, weight: 16.0, category: 'Chandelier' },
    { id: 'p52', name: 'Wave For Days (Gold) Crystal Chandelier', price: 700, weight: 7.0, category: 'Chandelier' },
    { id: 'p53', name: 'Weekend Vibes Chandelier', price: 530, weight: 5.0, category: 'Chandelier' },
    { id: 'p54', name: 'Wine Of Kings Crystal Chandelier', price: 22154, weight: 40.0, category: 'Chandelier' },
    { id: 'p55', name: 'You Said Forever Crystal Chandelier', price: 3300, weight: 14.0, category: 'Chandelier' },
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
