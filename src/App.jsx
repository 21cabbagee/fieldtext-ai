import React, { useState, useId } from 'react';
import { 
  MessageSquare, 
  Wrench, 
  Send, 
  FileText, 
  DollarSign, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  Smartphone, 
  ArrowRight, 
  Award, 
  Building2, 
  TrendingUp, 
  ExternalLink, 
  AlertCircle,
  Copy,
  Receipt
} from 'lucide-react';
import confetti from 'canvas-confetti';

const PRESET_MESSAGES = [
  {
    title: 'Water Heater Replacement',
    text: 'Replaced 50gal Bradford White gas water heater for Mrs Gable at 414 Oak St. Unit was $940, brass relief valve $35, 3.5 hrs labor, 10% truck fee. Email her an estimate.'
  },
  {
    title: 'Emergency AC Capacitor & Freon',
    text: 'AC diagnostic at 882 Pine Ave for Dave Miller. Bad dual run capacitor 45/5 MFD ($28 part), recharged 2.5 lbs R-410A refrigerant ($180 total freon), 2 hrs labor emergency rate.'
  },
  {
    title: '200A Electrical Panel Upgrade',
    text: 'Panel upgrade job at 1200 Sunset Blvd. Square D 200 amp breaker box ($320), whole house surge protector ($140), 6 hrs licensed electrician labor.'
  }
];

export default function App() {
  const laborRateId = useId();
  const markupPctId = useId();
  const dispatchFeeId = useId();
  const rawTextInputId = useId();

  // Settings
  const [rates, setRates] = useState({
    laborPerHour: 135,
    materialMarkup: 30, // 30%
    dispatchFee: 85
  });

  // SMS Chat Simulator
  const [incomingText, setIncomingText] = useState(PRESET_MESSAGES[0].text);
  const [isProcessing, setIsProcessing] = useState(false);

  // Parsed Job Dossier
  const [parsedJob, setParsedJob] = useState({
    customer: 'Mrs. Gable',
    address: '414 Oak St',
    items: [
      { desc: 'Bradford White 50-Gal Gas Water Heater', rawCost: 940, billable: 1222 },
      { desc: 'Brass Temperature & Pressure Relief Valve', rawCost: 35, billable: 45.50 },
      { desc: 'Master Plumber Labor (3.5 hrs @ $135/hr)', rawCost: 0, billable: 472.50 },
      { desc: 'Truck Roll & Consumables Fee', rawCost: 0, billable: 85.00 }
    ],
    totalBillable: 1825.00,
    smsSummary: 'Hi Mrs. Gable, FieldText Estimate #EST-3910 for your 50-gal Bradford White water heater replacement is ready ($1,825.00). Tap to approve & pay: https://pay.fieldtext.io/i/3910'
  });

  // CAB Modal
  const [isCabModalOpen, setIsCabModalOpen] = useState(false);
  const [cabSubmitted, setCabSubmitted] = useState(false);
  const [cabForm, setCabForm] = useState({
    businessName: '',
    ownerName: '',
    phone: '',
    truckCount: '1-3 Trucks'
  });

  const handleParseSms = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      // Dynamic parse based on input
      const isAC = incomingText.toLowerCase().includes('ac') || incomingText.toLowerCase().includes('refrigerant');
      const isElectric = incomingText.toLowerCase().includes('panel') || incomingText.toLowerCase().includes('electric');

      if (isAC) {
        setParsedJob({
          customer: 'Dave Miller',
          address: '882 Pine Ave',
          items: [
            { desc: 'Dual Run Capacitor 45/5 MFD', rawCost: 28, billable: 36.40 },
            { desc: 'R-410A Refrigerant (2.5 lbs)', rawCost: 120, billable: 180.00 },
            { desc: 'HVAC Tech Diagnostic & Labor (2.0 hrs)', rawCost: 0, billable: 270.00 },
            { desc: 'Emergency Dispatch Fee', rawCost: 0, billable: rates.dispatchFee }
          ],
          totalBillable: 571.40,
          smsSummary: 'Hi Dave, your emergency AC repair invoice #INV-4902 is ready ($571.40). Pay securely from your phone: https://pay.fieldtext.io/i/4902'
        });
      } else if (isElectric) {
        setParsedJob({
          customer: 'Residential Client',
          address: '1200 Sunset Blvd',
          items: [
            { desc: 'Square D 200A Main Breaker Panel', rawCost: 320, billable: 416.00 },
            { desc: 'Whole House Type 2 Surge Protector', rawCost: 140, billable: 182.00 },
            { desc: 'Journeyman Electrician Labor (6.0 hrs)', rawCost: 0, billable: 810.00 },
            { desc: 'Permit & Truck Roll Fee', rawCost: 0, billable: rates.dispatchFee }
          ],
          totalBillable: 1493.00,
          smsSummary: 'Hi, your 200A Electrical Panel Estimate #EST-7821 has been generated ($1,493.00). Tap to approve & sign: https://pay.fieldtext.io/i/7821'
        });
      }

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 600);
  };

  const handleCabSubmit = (e) => {
    e.preventDefault();
    setCabSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 }
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Banner: CAB Invitation */}
      <div className="bg-gradient-to-r from-amber-600/30 via-slate-900 to-amber-700/30 border-b border-amber-500/30 px-4 py-2.5 text-xs md:text-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-semibold text-amber-300">Customer Advisory Board (CAB) Forming:</span>
            <span className="text-slate-300">Join 10 plumbing, HVAC & electrical contractors testing our zero-data SMS bridge for 70% off ($39/mo).</span>
          </div>
          <button 
            onClick={() => setIsCabModalOpen(true)}
            className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-full transition-all shadow-sm hover:scale-105"
          >
            Claim CAB Seat (5 Remaining) →
          </button>
        </div>
      </div>

      {/* Main Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 font-black text-xl">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-white tracking-tight">FieldText AI</span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">100% SMS Interface</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-none">Zero-Data Estimator for Trades</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs text-slate-300 font-medium">
            <a href="#simulator" className="hover:text-amber-400 transition-colors">SMS Sandbox</a>
            <a href="#rates" className="hover:text-amber-400 transition-colors">Pricing & Markups</a>
            <a href="#quickbooks" className="hover:text-amber-400 transition-colors">Accounting Sync</a>
            <a href="#pricing" className="hover:text-amber-400 transition-colors">Crew Pricing</a>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsCabModalOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-lg transition-all shadow-md shadow-amber-500/20 flex items-center gap-1.5"
            >
              <Award className="w-4 h-4" />
              <span>Join CAB</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,158,11,0.08),transparent_50%)] pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-xs text-amber-300">
            <Smartphone className="w-4 h-4 text-amber-400" />
            <span>Zero Mobile Apps to Install • Works in 1-Bar Cellular Basements • QuickBooks Online Synced</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            SMS Copilot & Quick Estimator for Field Trades
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto font-normal leading-relaxed">
            Plumbers, HVAC techs, and electricians work with greasy hands and zero basement data. Text quick job notes or voice memos to our Twilio number — we automatically generate QuickBooks invoices, material manifests, and SMS customer payment links.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a 
              href="#simulator" 
              className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-amber-500/25 flex items-center gap-2"
            >
              <span>Test SMS Job Conversion</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a 
              href="#rates" 
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm rounded-xl transition-all flex items-center gap-2"
            >
              <Wrench className="w-4 h-4 text-amber-400" />
              <span>Configure Trade Markup Rules</span>
            </a>
          </div>

          {/* Market TAM & Metrics */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
              <div className="text-2xl font-black text-amber-400">$1.63B</div>
              <div className="text-xs text-slate-400 font-medium">Field Trade Software TAM</div>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
              <div className="text-2xl font-black text-white">1.2M</div>
              <div className="text-xs text-slate-400 font-medium">Contractor Businesses</div>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
              <div className="text-2xl font-black text-amber-400">14 Sec</div>
              <div className="text-xs text-slate-400 font-medium">Average Invoicing Time</div>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
              <div className="text-2xl font-black text-white">0 MB</div>
              <div className="text-xs text-slate-400 font-medium">Cell Data Required (Plain SMS)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 1: Two-Way SMS Trade Simulator */}
      <section id="simulator" className="py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-900 bg-slate-950/60">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">Live Twilio Interface Simulator</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Technician SMS Console & NLP Parser
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {PRESET_MESSAGES.map((msg, idx) => (
                <button
                  key={idx}
                  onClick={() => setIncomingText(msg.text)}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
                >
                  {msg.title}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* SMS Conversation Mockup */}
            <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 font-black">
                    💬
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">+1 (833) 482-TEXT</div>
                    <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      FieldText Trade Dispatch Bot
                    </div>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                  SMS / MMS
                </span>
              </div>

              {/* Chat Thread */}
              <div className="space-y-4">
                {/* Tech outgoing SMS */}
                <div className="flex justify-end">
                  <div className="max-w-[85%] bg-amber-600/90 text-white p-3.5 rounded-2xl rounded-tr-sm text-xs leading-relaxed shadow-md">
                    {incomingText}
                  </div>
                </div>

                {/* Bot automated reply */}
                <div className="flex justify-start">
                  <div className="max-w-[85%] bg-slate-800 text-slate-200 p-3.5 rounded-2xl rounded-tl-sm text-xs leading-relaxed border border-slate-700 space-y-2">
                    <div className="font-bold text-amber-400 flex items-center gap-1.5">
                      <Receipt className="w-3.5 h-3.5" />
                      <span>Estimate Generated: ${parsedJob.totalBillable.toFixed(2)}</span>
                    </div>
                    <p className="text-slate-300">
                      Customer: <strong>{parsedJob.customer}</strong> ({parsedJob.address})
                    </p>
                    <p className="text-[11px] text-slate-400">
                      QuickBooks link dispatched to customer via SMS with instant Apple Pay & Card checkout.
                    </p>
                  </div>
                </div>
              </div>

              {/* Input Form */}
              <form onSubmit={handleParseSms} className="pt-2 space-y-3">
                <label htmlFor={rawTextInputId} className="block text-xs font-semibold text-slate-400">
                  Simulate Incoming Technician SMS:
                </label>
                <textarea 
                  id={rawTextInputId}
                  rows="3"
                  value={incomingText}
                  onChange={(e) => setIncomingText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500 font-sans"
                  placeholder="e.g. Replaced 50A breaker at 104 Main St for Bob. Part was $45, 1.5 hrs labor."
                />
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md shadow-amber-500/20 flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isProcessing ? 'Parsing Job Notes...' : 'Send Text to FieldText Copilot'}</span>
                </button>
              </form>
            </div>

            {/* Generated Line-Item Estimate / QuickBooks Preview */}
            <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/30 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">QuickBooks Online Sync</span>
                  <h3 className="text-lg font-bold text-white">Itemized Invoice Breakdown</h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                  QBO Ready
                </span>
              </div>

              <div className="space-y-3">
                {parsedJob.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2 border-b border-slate-800/80 text-xs">
                    <div>
                      <div className="text-slate-200 font-medium">{item.desc}</div>
                      {item.rawCost > 0 && (
                        <div className="text-[10px] text-slate-500">
                          Wholesale: ${item.rawCost} (+{rates.materialMarkup}% standard markup)
                        </div>
                      )}
                    </div>
                    <div className="text-white font-bold text-sm">
                      ${item.billable.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Total & Action */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">Total Billable to Customer</div>
                  <div className="text-2xl font-black text-amber-400">${parsedJob.totalBillable.toFixed(2)}</div>
                </div>
                <button 
                  onClick={() => alert(`Direct SMS link copied: ${parsedJob.smsSummary}`)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5 text-amber-400" />
                  <span>Copy Customer SMS</span>
                </button>
              </div>

              <div className="text-[11px] text-slate-400 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                <strong>Dispatched Customer SMS Preview:</strong>
                <p className="mt-1 text-slate-300 italic font-mono">{parsedJob.smsSummary}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 2: Rate Customizer */}
      <section id="rates" className="py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-900 bg-slate-950">
        <div className="max-w-4xl mx-auto bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <div className="text-center mb-8">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">Business Rule Engine</span>
            <h2 className="text-2xl font-extrabold text-white mt-1">
              Shop Rates & Auto-Markup Configuration
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              FieldText automatically applies your shop rules to wholesale parts and hours quoted via text.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor={laborRateId} className="block text-xs font-semibold text-slate-300 mb-1">
                Labor Hourly Rate ($/hr)
              </label>
              <input 
                id={laborRateId}
                type="number" 
                value={rates.laborPerHour}
                onChange={(e) => setRates({ ...rates, laborPerHour: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label htmlFor={markupPctId} className="block text-xs font-semibold text-slate-300 mb-1">
                Material Markup Percentage (%)
              </label>
              <input 
                id={markupPctId}
                type="number" 
                value={rates.materialMarkup}
                onChange={(e) => setRates({ ...rates, materialMarkup: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label htmlFor={dispatchFeeId} className="block text-xs font-semibold text-slate-300 mb-1">
                Truck Roll / Dispatch Fee ($)
              </label>
              <input 
                id={dispatchFeeId}
                type="number" 
                value={rates.dispatchFee}
                onChange={(e) => setRates({ ...rates, dispatchFee: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-900 bg-slate-950/60">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">Crew Pricing</span>
            <h2 className="text-3xl font-extrabold text-white mt-1">
              Turn Lost Basement Hours into Paid Invoices
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Pays for itself on your first avoided billing dispute.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Solo Tier */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="text-base font-bold text-white">Solo Tradesman</div>
                <div className="text-xs text-slate-400 mt-1">Single truck owner-operator</div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">$49</span>
                  <span className="text-xs text-slate-400">/month</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Dedicated local Twilio number</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Up to 100 SMS invoices & estimates/mo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>QuickBooks Online 1-click sync</span>
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => setIsCabModalOpen(true)}
                className="mt-8 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors"
              >
                Start Trial
              </button>
            </div>

            {/* Crew Tier (Highlighted) */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-500/50 rounded-2xl p-6 flex flex-col justify-between relative shadow-xl shadow-amber-500/10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider rounded-full">
                Most Popular
              </div>
              <div>
                <div className="text-base font-bold text-white">Service Crew (5 Trucks)</div>
                <div className="text-xs text-slate-400 mt-1">For growing trade contractor teams</div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-amber-400">$119</span>
                  <span className="text-xs text-slate-400">/month</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Unlimited technician SMS lines</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Automatic material supplier parts markup</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Direct customer Apple Pay / Card checkout links</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Jobber & Housecall Pro bidirectional API</span>
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => setIsCabModalOpen(true)}
                className="mt-8 w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md shadow-amber-500/20"
              >
                Join CAB for 70% Off ($39/mo)
              </button>
            </div>

            {/* Fleet Enterprise Tier */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="text-base font-bold text-white">Fleet & Commercial</div>
                <div className="text-xs text-slate-400 mt-1">For multi-state mechanical contractors</div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">$349</span>
                  <span className="text-xs text-slate-400">/month</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Custom ERP integrations (ServiceTitan, Procore)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Dedicated account supervisor</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Voice memo audio transcription copilot</span>
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => setIsCabModalOpen(true)}
                className="mt-8 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors"
              >
                Contact Fleet Desk
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-10 px-4 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">FieldText AI</span>
            <span>• SMS Copilot & Quick Estimator for Field Trades</span>
          </div>
          <div>
            Built for plumbers, electricians, and HVAC pros on real job sites.
          </div>
        </div>
      </footer>

      {/* CAB 10-Member Modal */}
      {isCabModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl">
            <button 
              onClick={() => setIsCabModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold"
            >
              ✕
            </button>

            {!cabSubmitted ? (
              <form onSubmit={handleCabSubmit} className="space-y-4">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Award className="w-5 h-5" />
                  <span>FieldText Contractor Advisory Board (CAB)</span>
                </div>
                <h3 className="text-xl font-black text-white">Claim 70% Lifetime Founding Discount</h3>
                <p className="text-xs text-slate-400">
                  Join 10 trade contractor owners testing early SMS integrations. Lock in lifetime access at $39/mo (normally $119/mo).
                </p>

                <div className="space-y-3 pt-2">
                  <div>
                    <label htmlFor="company-name" className="block text-xs font-semibold text-slate-300 mb-1">Company Name</label>
                    <input 
                      id="company-name"
                      type="text" 
                      placeholder="e.g. Apex Plumbing & Drain"
                      value={cabForm.businessName}
                      onChange={(e) => setCabForm({ ...cabForm, businessName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="owner-name" className="block text-xs font-semibold text-slate-300 mb-1">Owner / Manager Name</label>
                    <input 
                      id="owner-name"
                      type="text" 
                      placeholder="e.g. Tom Bradley"
                      value={cabForm.ownerName}
                      onChange={(e) => setCabForm({ ...cabForm, ownerName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="cell-phone" className="block text-xs font-semibold text-slate-300 mb-1">Cell Phone (For SMS Test)</label>
                    <input 
                      id="cell-phone"
                      type="tel" 
                      placeholder="(555) 234-5678"
                      value={cabForm.phone}
                      onChange={(e) => setCabForm({ ...cabForm, phone: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                      required
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full mt-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-amber-500/25"
                >
                  Reserve CAB Seat & Lock $39/mo
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-xl font-black text-white">CAB Reservation Confirmed</h3>
                <p className="text-xs text-slate-300">
                  Welcome aboard, <strong className="text-white">{cabForm.ownerName}</strong>! We have locked your $39/mo founding rate for <span className="text-amber-400">{cabForm.businessName}</span>. Test SMS arriving shortly.
                </p>
                <button 
                  onClick={() => { setIsCabModalOpen(false); setCabSubmitted(false); }}
                  className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl"
                >
                  Return to Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
