import React from 'react';
import { type CartItem, COMPANY_INFO } from '../constants';

interface QCSlipViewProps {
    cart: CartItem[];
    trackingId: string;
    invoiceDate: string;
}

export const QCSlipView: React.FC<QCSlipViewProps> = ({
    cart,
    trackingId,
    invoiceDate,
}) => {
    const totalWeight = cart.reduce((sum, item) => sum + (item.weight * item.quantity), 0);

    return (
        <div className="bg-white text-wt-black w-[210mm] min-h-[297mm] p-12 mx-auto shadow-2xl print:shadow-none print:w-full print:h-full relative overflow-hidden break-before-page">
            {/* Industrial/QC Header */}
            <header className="border-b-4 border-wt-black pb-6 mb-10 flex justify-between items-end">
                <div>
                    <h1 className="font-cinzel text-3xl font-bold text-wt-black uppercase tracking-tighter">Quality Control Slip</h1>
                    <p className="font-mono text-sm text-gray-500 mt-1">INTERNAL USE ONLY</p>
                </div>
                <div className="text-right font-mono text-sm">
                    <p>REF: {trackingId || 'PENDING'}</p>
                    <p>DATE: {invoiceDate}</p>
                </div>
            </header>

            {/* QC Checklist */}
            <div className="mb-12">
                <table className="w-full font-mono text-sm border-collapse border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-300 py-2 px-4 text-left w-12">QC</th>
                            <th className="border border-gray-300 py-2 px-4 text-left">Item Description</th>
                            <th className="border border-gray-300 py-2 px-4 text-center w-16">Qty</th>
                            <th className="border border-gray-300 py-2 px-4 text-right">Total Weight (kg)</th>
                            <th className="border border-gray-300 py-2 px-4 text-center w-24">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item, idx) => (
                            <tr key={idx}>
                                <td className="border border-gray-300 py-3 px-4 text-center">
                                    <div className="w-4 h-4 border border-gray-400 mx-auto"></div>
                                </td>
                                <td className="border border-gray-300 py-3 px-4 font-bold">{item.name} <span className="font-normal text-gray-500">({item.id})</span></td>
                                <td className="border border-gray-300 py-3 px-4 text-center">{item.quantity}</td>
                                <td className="border border-gray-300 py-3 px-4 text-right">{(item.weight * item.quantity).toFixed(1)}</td>
                                <td className="border border-gray-300 py-3 px-4 text-center text-xs text-gray-400">PENDING</td>
                            </tr>
                        ))}
                        {/* Summary Row */}
                        <tr className="bg-gray-50 font-bold">
                            <td colSpan={3} className="border border-gray-300 py-3 px-4 text-right uppercase">Total Shipment Weight</td>
                            <td className="border border-gray-300 py-3 px-4 text-right">{totalWeight.toFixed(1)} kg</td>
                            <td className="border border-gray-300"></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Logistics Details */}
            <div className="grid grid-cols-2 gap-12 mb-16">
                <div className="border border-gray-300 p-6">
                    <h3 className="font-cinzel font-bold mb-4 border-b border-gray-200 pb-2">Courier Method</h3>
                    <div className="space-y-2 font-mono text-sm">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="accent-wt-black" /> Standard Ground
                        </label>
                        {/* Removed White Glove Service as per request */}
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="accent-wt-black" /> Air Freight
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="accent-wt-black" /> Sea Freight
                        </label>
                    </div>
                </div>

                <div className="border border-gray-300 p-6 relative">
                    <h3 className="font-cinzel font-bold mb-4 border-b border-gray-200 pb-2">Final Inspection</h3>
                    <div className="space-y-8 mt-8">
                        <div className="flex justify-between items-end border-b border-gray-400 pb-1">
                            <span className="font-mono text-sm">Packer Signature:</span>
                            <span className="font-handwriting text-xl text-blue-900 transform -rotate-2">John Doe</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-gray-400 pb-1">
                            <span className="font-mono text-sm">Supervisor Sign:</span>
                            <span className="w-32"></span>
                        </div>
                    </div>

                    {/* Stamp */}
                    <div className="absolute top-1/2 right-4 transform -translate-y-1/2 rotate-12 border-4 border-green-700 text-green-700 p-2 rounded opacity-80 pointer-events-none">
                        <div className="border border-green-700 p-1 px-4 text-center">
                            <div className="font-black text-xl uppercase tracking-widest">PASSED</div>
                            <div className="text-[10px] font-mono">WHITE TEAK QC</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="text-center font-mono text-xs text-gray-400 mt-auto">
                <p>Generated by Internal Logistics System v1.0</p>
                <p>{COMPANY_INFO.name} - {new Date().getFullYear()}</p>
            </div>
        </div>
    );
};
