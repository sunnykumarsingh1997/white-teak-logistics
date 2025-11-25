import { useState } from 'react';
import { ControlSidebar } from './components/ControlSidebar';
import { InvoiceView } from './components/InvoiceView';
import { QCSlipView } from './components/QCSlipView';
import { type Product, type CartItem, type CurrencyCode } from './constants';
import { generateConciergeNote } from './services/geminiService';
import { Printer } from 'lucide-react';

function App() {
  const [customer, setCustomer] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
  });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [invoiceDate, setInvoiceDate] = useState(new Date().toLocaleDateString());
  const [trackingId, setTrackingId] = useState('');
  const [conciergeNote, setConciergeNote] = useState('');
  const [isGeneratingNote, setIsGeneratingNote] = useState(false);
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [printMode, setPrintMode] = useState<'all' | 'invoice' | 'qc'>('all');

  const addToCart = (product: Product) => {
    setCart(prev => {
      // For custom products, always add as new item since ID might be generic or we want duplicates
      if (product.category === 'Custom') {
        return [...prev, { ...product, quantity: 1 }];
      }

      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (index: number, delta: number) => {
    setCart(prev => {
      const newCart = [...prev];
      const item = newCart[index];
      const newQuantity = item.quantity + delta;
      if (newQuantity <= 0) {
        return prev.filter((_, i) => i !== index);
      }
      newCart[index] = { ...item, quantity: newQuantity };
      return newCart;
    });
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const handleGenerateRandomDate = () => {
    const today = new Date();
    const pastDate = new Date(today.setDate(today.getDate() - Math.floor(Math.random() * 30)));
    setInvoiceDate(pastDate.toLocaleDateString());
  };

  const handleGenerateTracking = () => {
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    setTrackingId(`WT-LLC-${randomDigits}`);
  };

  const handleGenerateConciergeNote = async () => {
    if (cart.length === 0) return;

    setIsGeneratingNote(true);
    const itemNames = cart.map(p => p.name);
    try {
      const note = await generateConciergeNote(itemNames);
      setConciergeNote(note);
    } catch (error) {
      console.error("Failed to generate note", error);
    } finally {
      setIsGeneratingNote(false);
    }
  };

  const handlePrint = (mode: 'all' | 'invoice' | 'qc') => {
    setPrintMode(mode);
    // Use setTimeout to allow state update to reflect in DOM before printing
    setTimeout(() => {
      window.print();
      // Reset to 'all' after print dialog closes (or immediately, as print blocks)
      // In practice, it's safer to leave it or reset it. Let's reset for better UX.
      setPrintMode('all');
    }, 100);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden font-inter">
      {/* Sidebar - Hidden on Print */}
      <ControlSidebar
        customer={customer}
        setCustomer={setCustomer}
        cart={cart}
        addToCart={addToCart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        invoiceDate={invoiceDate}
        setInvoiceDate={setInvoiceDate}
        generateRandomDate={handleGenerateRandomDate}
        generateTracking={handleGenerateTracking}
        generateConciergeNote={handleGenerateConciergeNote}
        isGeneratingNote={isGeneratingNote}
        currency={currency}
        setCurrency={setCurrency}
      />

      {/* Main Content / Preview Area */}
      <main className="flex-1 overflow-y-auto p-8 flex flex-col items-center gap-8 print:p-0 print:block print:overflow-visible">

        {/* Print Instructions (Screen Only) */}
        <div className="print:hidden w-full max-w-[210mm] bg-wt-charcoal text-wt-white p-4 rounded shadow-lg flex justify-between items-center">
          <div>
            <h2 className="font-cinzel font-bold">Document Preview</h2>
            <p className="text-xs text-gray-400">Select a document to print.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handlePrint('invoice')}
              className="bg-wt-black border border-wt-gold/30 text-wt-gold px-4 py-2 rounded text-xs font-bold hover:bg-wt-gold hover:text-wt-black transition-colors flex items-center gap-2"
            >
              <Printer size={14} /> Invoice
            </button>
            <button
              onClick={() => handlePrint('qc')}
              className="bg-wt-black border border-wt-gold/30 text-wt-gold px-4 py-2 rounded text-xs font-bold hover:bg-wt-gold hover:text-wt-black transition-colors flex items-center gap-2"
            >
              <Printer size={14} /> QC Slip
            </button>
            <button
              onClick={() => handlePrint('all')}
              className="bg-wt-gold text-wt-black px-6 py-2 rounded font-bold hover:bg-white transition-colors flex items-center gap-2"
            >
              <Printer size={16} /> Print All
            </button>
          </div>
        </div>

        {/* Documents */}
        <div className="print:w-full">
          {/* Invoice Wrapper */}
          <div className={printMode === 'qc' ? 'hidden print:hidden' : 'block'}>
            <InvoiceView
              customer={customer}
              cart={cart}
              invoiceDate={invoiceDate}
              trackingId={trackingId}
              conciergeNote={conciergeNote}
              currency={currency}
            />
          </div>

          {/* Spacer for screen view */}
          <div className={`h-8 print:hidden ${printMode !== 'all' ? 'hidden' : ''}`}></div>

          {/* QC Slip Wrapper */}
          <div className={printMode === 'invoice' ? 'hidden print:hidden' : 'block'}>
            <QCSlipView
              cart={cart}
              trackingId={trackingId}
              invoiceDate={invoiceDate}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
