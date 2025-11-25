import React, { useState } from 'react';
import { MOCK_PRODUCTS, type Product, type CartItem, type CurrencyCode, CURRENCIES } from '../constants';
import { Trash2, Wand2, Calendar, Truck, Plus, Minus } from 'lucide-react';

interface ControlSidebarProps {
    customer: {
        name: string;
        address: string;
        phone: string;
        email: string;
    };
    setCustomer: (customer: any) => void;
    cart: CartItem[];
    addToCart: (product: Product) => void;
    updateQuantity: (index: number, delta: number) => void;
    removeFromCart: (index: number) => void;
    invoiceDate: string;
    setInvoiceDate: (date: string) => void;
    generateRandomDate: () => void;
    generateTracking: () => void;
    generateConciergeNote: () => void;
    isGeneratingNote: boolean;
    currency: CurrencyCode;
    setCurrency: (code: CurrencyCode) => void;
}

export const ControlSidebar: React.FC<ControlSidebarProps> = ({
    customer,
    setCustomer,
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    invoiceDate,
    setInvoiceDate,
    generateRandomDate,
    generateTracking,
    generateConciergeNote,
    isGeneratingNote,
    currency,
    setCurrency,
}) => {
    const [customProduct, setCustomProduct] = useState({
        name: '',
        price: '',
        weight: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCustomer((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleCustomProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCustomProduct(prev => ({ ...prev, [name]: value }));
    };

    const addCustomProduct = () => {
        if (!customProduct.name || !customProduct.price) return;
        const priceInUSD = parseFloat(customProduct.price) / CURRENCIES[currency].rate;

        const product: Product = {
            id: `custom-${Date.now()}`,
            name: customProduct.name,
            price: priceInUSD, // Store in USD
            weight: parseFloat(customProduct.weight) || 0,
            category: 'Custom',
        };
        addToCart(product);
        setCustomProduct({ name: '', price: '', weight: '' });
    };

    const formatPrice = (priceUSD: number) => {
        const converted = priceUSD * CURRENCIES[currency].rate;
        return new Intl.NumberFormat(CURRENCIES[currency].locale, {
            style: 'currency',
            currency: currency,
        }).format(converted);
    };

    return (
        <div className="w-96 bg-wt-charcoal text-wt-white h-screen overflow-y-auto border-r border-wt-gold/20 p-6 flex flex-col gap-8 shadow-2xl print:hidden transition-all duration-300">
            <div className="space-y-2">
                <h2 className="font-cinzel text-2xl text-wt-gold tracking-wider">Concierge Panel</h2>
                <p className="text-sm text-gray-400 font-inter">Manage logistics & documentation</p>
            </div>

            {/* Currency Selector */}
            <div className="space-y-2">
                <label className="text-xs text-wt-gold uppercase tracking-wider">Currency</label>
                <div className="flex gap-2">
                    {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
                        <button
                            key={code}
                            onClick={() => setCurrency(code)}
                            className={`flex-1 py-2 text-xs font-bold rounded border transition-colors ${currency === code
                                    ? 'bg-wt-gold text-wt-black border-wt-gold'
                                    : 'bg-wt-black text-gray-400 border-wt-gold/30 hover:border-wt-gold'
                                }`}
                        >
                            {code}
                        </button>
                    ))}
                </div>
            </div>

            {/* Customer Details */}
            <div className="space-y-4">
                <h3 className="font-playfair text-lg text-wt-white border-b border-wt-gold/20 pb-2">Client Details</h3>
                <div className="space-y-3">
                    <input
                        type="text"
                        name="name"
                        placeholder="Client Name"
                        value={customer.name}
                        onChange={handleInputChange}
                        className="w-full bg-wt-black border border-wt-gold/30 rounded p-3 text-sm focus:border-wt-gold focus:outline-none transition-colors placeholder-gray-600"
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="Shipping Address"
                        value={customer.address}
                        onChange={handleInputChange}
                        className="w-full bg-wt-black border border-wt-gold/30 rounded p-3 text-sm focus:border-wt-gold focus:outline-none transition-colors placeholder-gray-600"
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={customer.phone}
                        onChange={handleInputChange}
                        className="w-full bg-wt-black border border-wt-gold/30 rounded p-3 text-sm focus:border-wt-gold focus:outline-none transition-colors placeholder-gray-600"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={customer.email}
                        onChange={handleInputChange}
                        className="w-full bg-wt-black border border-wt-gold/30 rounded p-3 text-sm focus:border-wt-gold focus:outline-none transition-colors placeholder-gray-600"
                    />

                    {/* Date Input */}
                    <div className="flex gap-2 items-center">
                        <input
                            type="text"
                            value={invoiceDate}
                            onChange={(e) => setInvoiceDate(e.target.value)}
                            placeholder="Date (e.g. 12/12/2024)"
                            className="w-full bg-wt-black border border-wt-gold/30 rounded p-3 text-sm focus:border-wt-gold focus:outline-none transition-colors placeholder-gray-600"
                        />
                        <button
                            onClick={generateRandomDate}
                            className="bg-wt-black border border-wt-gold/30 text-wt-gold hover:bg-wt-gold hover:text-wt-black p-3 rounded transition-all duration-300"
                            title="Randomize Date"
                        >
                            <Calendar size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Cart Management */}
            <div className="space-y-4">
                <h3 className="font-playfair text-lg text-wt-white border-b border-wt-gold/20 pb-2">Curated Selection</h3>
                <div className="flex gap-2">
                    <select
                        className="w-full bg-wt-black border border-wt-gold/30 rounded p-3 text-sm focus:border-wt-gold focus:outline-none text-gray-300"
                        onChange={(e) => {
                            const product = MOCK_PRODUCTS.find(p => p.id === e.target.value);
                            if (product) addToCart(product);
                            e.target.value = ""; // Reset
                        }}
                    >
                        <option value="">Select a Masterpiece...</option>
                        {MOCK_PRODUCTS.map(p => (
                            <option key={p.id} value={p.id}>{p.name} - {formatPrice(p.price)}</option>
                        ))}
                    </select>
                </div>

                {/* Custom Product Input */}
                <div className="bg-wt-black/30 p-3 rounded border border-wt-gold/10 space-y-2">
                    <p className="text-xs text-wt-gold uppercase tracking-wider">Add Custom Item</p>
                    <input
                        type="text"
                        name="name"
                        placeholder="Item Name"
                        value={customProduct.name}
                        onChange={handleCustomProductChange}
                        className="w-full bg-wt-black border border-wt-gold/30 rounded p-2 text-xs focus:border-wt-gold focus:outline-none"
                    />
                    <div className="flex gap-2">
                        <input
                            type="number"
                            name="price"
                            placeholder={`Price (${currency})`}
                            value={customProduct.price}
                            onChange={handleCustomProductChange}
                            className="w-1/2 bg-wt-black border border-wt-gold/30 rounded p-2 text-xs focus:border-wt-gold focus:outline-none"
                        />
                        <input
                            type="number"
                            name="weight"
                            placeholder="Weight (kg)"
                            value={customProduct.weight}
                            onChange={handleCustomProductChange}
                            className="w-1/2 bg-wt-black border border-wt-gold/30 rounded p-2 text-xs focus:border-wt-gold focus:outline-none"
                        />
                    </div>
                    <button
                        onClick={addCustomProduct}
                        className="w-full bg-wt-gold/20 hover:bg-wt-gold hover:text-wt-black text-wt-gold text-xs py-2 rounded transition-colors uppercase tracking-widest font-bold"
                    >
                        Add Custom Item
                    </button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                    {cart.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-wt-black/50 p-2 rounded border border-white/5 group hover:border-wt-gold/30 transition-all">
                            <div className="text-sm flex-1">
                                <div className="text-wt-white font-medium truncate">{item.name}</div>
                                <div className="text-xs text-wt-gold">{formatPrice(item.price)}</div>
                            </div>

                            <div className="flex items-center gap-2 ml-2">
                                <div className="flex items-center bg-wt-black rounded border border-wt-gold/20">
                                    <button onClick={() => updateQuantity(idx, -1)} className="p-1 hover:text-wt-gold"><Minus size={12} /></button>
                                    <span className="text-xs w-6 text-center">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(idx, 1)} className="p-1 hover:text-wt-gold"><Plus size={12} /></button>
                                </div>
                                <button
                                    onClick={() => removeFromCart(idx)}
                                    className="text-gray-500 hover:text-red-400 transition-colors p-1"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                    {cart.length === 0 && (
                        <div className="text-center text-xs text-gray-600 py-4 italic">No items selected</div>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 mt-auto">
                <h3 className="font-playfair text-lg text-wt-white border-b border-wt-gold/20 pb-2">Automation</h3>

                <button
                    onClick={generateTracking}
                    className="w-full flex items-center justify-center gap-2 bg-wt-black border border-wt-gold/30 text-wt-gold hover:bg-wt-gold hover:text-wt-black p-3 rounded transition-all duration-300 group"
                >
                    <Truck size={18} className="group-hover:scale-110 transition-transform" />
                    <span className="font-cinzel text-sm font-bold">Generate Tracking</span>
                </button>

                <button
                    onClick={generateConciergeNote}
                    disabled={isGeneratingNote || cart.length === 0}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-wt-gold to-yellow-600 text-wt-black p-4 rounded shadow-lg hover:shadow-wt-gold/20 hover:brightness-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                    <Wand2 size={20} className={`relative z-10 ${isGeneratingNote ? 'animate-spin' : ''}`} />
                    <span className="font-cinzel font-bold relative z-10">
                        {isGeneratingNote ? 'Consulting AI...' : 'Concierge Note'}
                    </span>
                </button>
            </div>
        </div>
    );
};
