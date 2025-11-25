import React from 'react';
import { type CartItem, type CurrencyCode, CURRENCIES, COMPANY_INFO } from '../constants';

interface InvoiceViewProps {
    customer: {
        name: string;
        address: string;
        phone: string;
        email: string;
    };
    cart: CartItem[];
    invoiceDate: string;
    trackingId: string;
    conciergeNote: string;
    currency: CurrencyCode;
}

export const InvoiceView: React.FC<InvoiceViewProps> = ({
    customer,
    cart,
    invoiceDate,
    trackingId,
    conciergeNote,
    currency,
}) => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.05; // 5% VAT
    const total = subtotal + tax;

    const formatPrice = (priceUSD: number) => {
        const converted = priceUSD * CURRENCIES[currency].rate;
        return new Intl.NumberFormat(CURRENCIES[currency].locale, {
            style: 'currency',
            currency: currency,
        }).format(converted);
    };

    return (
        <div className="bg-white text-wt-black w-[210mm] min-h-[297mm] p-12 mx-auto shadow-2xl print:shadow-none print:w-full print:h-full relative overflow-hidden">
            {/* Watermark/Background Element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-wt-gold/5 rounded-bl-full -z-0 pointer-events-none"></div>

            {/* Header */}
            <header className="flex justify-between items-start border-b-2 border-wt-black pb-8 mb-12 relative z-10">
                <div>
                    <h1 className="font-cinzel text-4xl font-bold tracking-widest text-wt-black mb-2">WHITE TEAK</h1>
                    <p className="font-inter text-xs tracking-widest text-wt-gold uppercase">Luxury Lighting & Decor</p>
                </div>
                <div className="text-right font-inter text-sm text-gray-600">
                    <p className="whitespace-pre-line">{COMPANY_INFO.address}</p>
                    <p>{COMPANY_INFO.phone}</p>
                    <p>{COMPANY_INFO.email}</p>
                    <p className="text-wt-gold font-medium mt-1">{COMPANY_INFO.website}</p>
                </div>
            </header>

            {/* Invoice Details */}
            <div className="flex justify-between mb-16 font-inter relative z-10">
                <div>
                    <h3 className="font-playfair text-xl font-bold mb-4 text-wt-black">Bill To:</h3>
                    <div className="text-sm text-gray-700 space-y-1">
                        <p className="font-bold text-lg">{customer.name || 'Valued Client'}</p>
                        <p>{customer.address || 'Address Not Provided'}</p>
                        <p>{customer.phone}</p>
                        <p>{customer.email}</p>
                    </div>
                </div>
                <div className="text-right">
                    <h3 className="font-playfair text-xl font-bold mb-4 text-wt-black">Invoice Details</h3>
                    <div className="text-sm text-gray-700 space-y-1">
                        <p><span className="font-bold text-wt-black">Date:</span> {invoiceDate}</p>
                        <p><span className="font-bold text-wt-black">Invoice #:</span> INV-{Math.floor(Math.random() * 100000)}</p>
                        <p><span className="font-bold text-wt-black">Tracking ID:</span> {trackingId || 'Pending'}</p>
                    </div>
                </div>
            </div>

            {/* Line Items */}
            <div className="mb-12 relative z-10">
                <table className="w-full font-inter text-sm">
                    <thead className="bg-wt-black text-wt-white">
                        <tr>
                            <th className="py-3 px-4 text-left font-cinzel tracking-wider">Description</th>
                            <th className="py-3 px-4 text-left font-cinzel tracking-wider">Category</th>
                            <th className="py-3 px-4 text-center font-cinzel tracking-wider">Qty</th>
                            <th className="py-3 px-4 text-right font-cinzel tracking-wider">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {cart.map((item, idx) => (
                            <tr key={idx}>
                                <td className="py-4 px-4 font-medium text-gray-900">{item.name}</td>
                                <td className="py-4 px-4 text-gray-500">{item.category}</td>
                                <td className="py-4 px-4 text-center text-gray-900">{item.quantity}</td>
                                <td className="py-4 px-4 text-right font-medium">{formatPrice(item.price * item.quantity)}</td>
                            </tr>
                        ))}
                        {cart.length === 0 && (
                            <tr>
                                <td colSpan={4} className="py-8 text-center text-gray-400 italic">No items selected</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end mb-16 relative z-10">
                <div className="w-64 space-y-3 font-inter text-sm">
                    <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>VAT (5%)</span>
                        <span>{formatPrice(tax)}</span>
                    </div>
                    <div className="flex justify-between font-playfair text-xl font-bold text-wt-black border-t-2 border-wt-gold pt-3">
                        <span>Total</span>
                        <span>{formatPrice(total)}</span>
                    </div>
                </div>
            </div>

            {/* Concierge Note */}
            {conciergeNote && (
                <div className="bg-wt-white/50 border border-wt-gold/30 p-8 rounded relative z-10">
                    <h4 className="font-cinzel text-wt-gold font-bold mb-3 flex items-center gap-2">
                        <span className="w-8 h-[1px] bg-wt-gold"></span>
                        Concierge Care Note
                        <span className="w-8 h-[1px] bg-wt-gold"></span>
                    </h4>
                    <p className="font-playfair italic text-gray-800 leading-relaxed text-center text-lg">
                        "{conciergeNote}"
                    </p>
                </div>
            )}

            {/* Footer */}
            <div className="absolute bottom-12 left-12 right-12 text-center border-t border-gray-200 pt-8">
                <p className="font-cinzel text-xs text-gray-400 tracking-widest">Thank you for your patronage. White Teak LLC.</p>
            </div>
        </div>
    );
};
