import React, { useState } from 'react';
import { TrendingUp, ShieldCheck, Zap, DollarSign, CheckCircle2, Wrench, Smartphone } from 'lucide-react';

/**
 * OutcomeChart for FieldText AI (Bklit UI + Julien Bek $1:$6 Sequoia Framework + Larry Ellison ROI Engine)
 * Compares $4,500/mo back-office invoicing clerks & unbilled technician job leakage ($6 human administrative drag) with Autonomous SMS ➔ QuickBooks Invoicing ($1 software).
 */
export default function OutcomeChart({
  serviceName = "Field Trade SMS Dispatch & QuickBooks Billing Autopilot",
  defaultMonthlyTrucks = 6,
  onCtaClick
}) {
  const [trucks, setTrucks] = useState(defaultMonthlyTrucks);

  // Legacy contractor costs: ~$750/mo per truck in office billing clerk overhead + $400 unbilled part leakage
  const legacyBurdenPerTruck = 1150;
  const legacyTotalBurden = trucks * legacyBurdenPerTruck;
  // FieldText AI is $49/mo per active technician truck
  const fieldTextSoftwareCost = trucks * 49;
  const netContractorSavings = legacyTotalBurden - fieldTextSoftwareCost;
  const savingsPercent = Math.round(((legacyTotalBurden - fieldTextSoftwareCost) / legacyTotalBurden) * 100);

  const maxCost = Math.max(legacyTotalBurden, 1);
  const legacyBarHeight = 100;
  const autoBarHeight = Math.max(Math.round((fieldTextSoftwareCost / maxCost) * 100), 10);

  return (
    <div className="relative rounded-2xl border border-amber-500/30 bg-slate-900/90 p-6 md:p-8 backdrop-blur-xl shadow-2xl overflow-hidden my-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 border bg-slate-950 border-amber-500/40 text-amber-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            The Sequoia Equation: Software ($1) vs Back-Office Payroll ($6)
          </div>
          <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
            Contractor Bottom-Line Economics: <span className="text-amber-400">{savingsPercent}% Admin Cost Reclaimed</span>
          </h3>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            Plumbers and electricians hate typing into complex mobile apps with greasy hands. Waiting until Sunday night to invoice causes forgotten parts and late customer payments. We turn a single plain text message into a paid QuickBooks invoice in 14 seconds.
          </p>
        </div>

        <div className="text-right bg-slate-950/80 border border-amber-500/30 rounded-xl p-3 px-4 min-w-[190px]">
          <span className="text-[11px] text-slate-400 block font-medium">Monthly Back-Office Spend Slashed</span>
          <span className="text-2xl md:text-3xl font-black text-amber-400">
            ${netContractorSavings.toLocaleString()}
          </span>
          <span className="text-[10px] text-amber-300/80 flex items-center justify-end gap-1 font-semibold font-mono">
            <TrendingUp className="w-3 h-3" /> Same-Day Payment Clearance
          </span>
        </div>
      </div>

      {/* Interactive Volume Slider */}
      <div className="py-6 border-b border-white/10">
        <div className="flex items-center justify-between text-sm mb-3">
          <label className="text-slate-300 font-semibold flex items-center gap-2">
            <Wrench className="w-4 h-4 text-amber-400" />
            Number of Active Service Trucks / Vans in Fleet:
          </label>
          <span className="text-base font-bold text-white bg-slate-950 px-3 py-1 rounded-lg border border-amber-500/30 font-mono">
            {trucks} Service Vans (${(legacyTotalBurden * 12).toLocaleString()}/yr Administrative Overhead)
          </span>
        </div>
        <input 
          type="range" 
          min={1} 
          max={30} 
          step={1}
          value={trucks}
          onChange={(e) => setTrucks(Number(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
        />
        <div className="flex justify-between text-[11px] text-slate-500 mt-2 font-mono">
          <span>1 Van (Owner-Operator)</span>
          <span>6 Vans (Regional Plumbing/HVAC Depot)</span>
          <span>30+ Vans (Commercial Mechanical Contractor)</span>
        </div>
      </div>

      {/* Bklit UI Visual Comparison Chart & Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 items-center">
        {/* SVG Visual Bars */}
        <div className="md:col-span-5 bg-slate-950 rounded-xl p-5 border border-white/10">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center justify-between font-mono">
            <span>Monthly Invoicing Overhead</span>
            <span className="text-[10px] text-slate-500">Live Simulation</span>
          </div>

          <div className="space-y-4">
            {/* Legacy Bar */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-rose-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  Manual Office Staff + Unbilled Parts Leakage ($6)
                </span>
                <span className="font-mono font-bold text-rose-300">${legacyTotalBurden.toLocaleString()}</span>
              </div>
              <div className="h-6 w-full bg-slate-900 rounded-lg overflow-hidden border border-rose-950/40">
                <div 
                  className="h-full bg-gradient-to-r from-rose-600 to-rose-400 transition-all duration-300 rounded-lg"
                  style={{ width: `${legacyBarHeight}%` }}
                />
              </div>
            </div>

            {/* Autonomous Bar */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-amber-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  FieldText AI Zero-Data SMS Autopilot ($1)
                </span>
                <span className="font-mono font-bold text-amber-300">${fieldTextSoftwareCost.toLocaleString()}</span>
              </div>
              <div className="h-6 w-full bg-slate-900 rounded-lg overflow-hidden border border-amber-950/40">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-400 transition-all duration-300 rounded-lg shadow-lg shadow-amber-500/30"
                  style={{ width: `${autoBarHeight}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Annual Contractor Net Profit Added:</span>
            <span className="text-sm font-bold text-amber-400">+${(netContractorSavings * 12).toLocaleString()}</span>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="md:col-span-7 space-y-3">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Zero App Installation / 1-Bar Cellular</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Works inside sub-basements and crawlspaces with standard SMS. Techs never have to wrestle with slow 50MB mobile apps.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Automatic Parts Markup Calculation</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                NLP engine instantly identifies wholesale part names, applies trade markup matrices (e.g. 30%), adds hourly labor, and dispatches customer payment links.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Bi-Directional QuickBooks Sync</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Every generated bill syncs directly to chart of accounts with automated reconciliation when the customer pays via Apple Pay or credit card.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
