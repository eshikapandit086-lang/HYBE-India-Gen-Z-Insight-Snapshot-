import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Download, FileText, ImageIcon, Loader2 } from 'lucide-react';
import * as htmlToImage from 'html-to-image';
import { jsPDF } from 'jspdf';

/**
 * HYBE India Gen Z Insight Snapshot
 * Implementation of the provided design in React + Tailwind
 */

export default function App() {
  const reportRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const exportAsImage = async () => {
    if (!reportRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await htmlToImage.toPng(reportRef.current, {
        quality: 1.0,
        backgroundColor: '#0a0a0a',
        pixelRatio: 2,
      });
      const link = document.createElement('a');
      link.download = 'HYBE_India_Insight_Snapshot.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export failed', err);
    } finally {
      setIsExporting(false);
    }
  };

  const exportAsPDF = async () => {
    if (!reportRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await htmlToImage.toPng(reportRef.current, {
        quality: 1.0,
        backgroundColor: '#0a0a0a',
        pixelRatio: 2,
      });
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('HYBE_India_Insight_Snapshot.pdf');
    } catch (err) {
      console.error('PDF Export failed', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f0] overflow-x-hidden">
      {/* Floating Controls */}
      <div className="fixed top-8 left-8 z-[2000] flex flex-col gap-4">
        <button
          onClick={exportAsImage}
          disabled={isExporting}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#1a1a1a] border border-[#2e2e2e] hover:bg-[#e8002d] hover:border-[#e8002d] transition-all group disabled:opacity-50 cursor-pointer"
        >
          {isExporting ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <ImageIcon className="w-4 h-4 group-hover:scale-110 transition-transform text-[#e8002d] group-hover:text-white" />}
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase font-bold text-[#888] group-hover:text-white">Export PNG</span>
        </button>
        <button
          onClick={exportAsPDF}
          disabled={isExporting}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#1a1a1a] border border-[#2e2e2e] hover:bg-[#e8002d] hover:border-[#e8002d] transition-all group disabled:opacity-50 cursor-pointer"
        >
          {isExporting ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <FileText className="w-4 h-4 group-hover:scale-110 transition-transform text-[#e8002d] group-hover:text-white" />}
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase font-bold text-[#888] group-hover:text-white">Export PDF</span>
        </button>
      </div>

      {/* Main Report Container */}
      <div 
        ref={reportRef} 
        className="w-full max-w-[1024px] mx-auto min-h-screen bg-[#0a0a0a] p-12 flex flex-col relative overflow-hidden select-none underline-offset-4"
      >
        {/* Corner Ribbon */}
        <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden pointer-events-none z-50">
          <div className="absolute top-8 -right-8 w-40 h-10 bg-[#e8002d] rotate-45 flex items-center justify-center shadow-lg">
            <span className="text-[10px] font-bold tracking-[0.3em] text-white">REPORT 2026</span>
          </div>
        </div>

        {/* Header Section */}
        <motion.header 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-between items-start border-b border-[#2e2e2e] pb-8 mb-12"
        >
          <div className="flex flex-col">
            <span className="text-[#e8002d] font-mono text-[10px] tracking-[0.4em] mb-4 uppercase font-bold">HYBE INDIA / GEN Z AUDIENCE INTELLIGENCE</span>
            <h1 className="text-[100px] sm:text-[80px] leading-[0.85] font-black tracking-tighter uppercase italic">
              Gen Z <br/><span className="text-[#e8002d]">India</span> Insight
            </h1>
          </div>
          <div className="text-right flex flex-col gap-1.5 pt-4">
            <span className="font-mono text-[10px] text-[#888] tracking-widest uppercase mb-1">Prepared by</span>
            <span className="text-2xl font-medium tracking-tight border-b-2 border-[#e8002d]/20 inline-block pb-1">Eshika S. Pandit</span>
            <span className="text-sm text-[#888] font-mono tracking-tighter">BSc Data Science / Fergusson College</span>
            <span className="text-[10px] text-[#555] mt-2 tracking-[0.2em] uppercase font-bold">May 2026 // Independent Project</span>
          </div>
        </motion.header>

        {/* Core Observation & Stat Strip */}
        <div className="grid grid-cols-12 gap-12 mb-12 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="col-span-8 flex flex-col gap-4"
          >
            <div className="bg-[#1a1a1a] border-l-4 border-[#e8002d] p-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#e8002d]/5 rounded-full -mr-12 -mt-12 transition-transform duration-700 group-hover:scale-150" />
              <h3 className="text-[#e8002d] font-mono text-[11px] tracking-[0.3em] uppercase mb-4 font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#e8002d] rounded-full"></span>
                The Core Strategic Opportunity
              </h3>
              <p className="text-xl leading-relaxed text-[#ccc] font-light">
                Indian engagement is <span className="text-white font-bold italic underline decoration-[#e8002d]/30 underline-offset-8">scattered</span>. Success lies not in visibility, but in converting passive scrollers into structured, loyal youth communities with <span className="text-white border-b border-white/20">measurable retention loops</span>.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="col-span-4 flex flex-col justify-center border-l border-[#2e2e2e] pl-10 gap-8 h-full"
          >
            <div className="group">
              <div className="text-5xl font-black text-[#f5f5f0] tracking-tighter group-hover:text-[#e8002d] transition-colors">87<span className="text-[#e8002d]">M+</span></div>
              <div className="text-[10px] text-[#888] uppercase tracking-[0.2em] font-bold mt-2 leading-tight">Monthly Active <br/>K-Pop Engagements</div>
              <div className="text-[8px] text-[#444] font-mono mt-1">SOURCE: PLATFORM DATA 2025</div>
            </div>
            <div className="group">
              <div className="text-5xl font-black text-[#f5f5f0] tracking-tighter group-hover:text-[#e8002d] transition-colors">3.2<span className="text-[#e8002d]">X</span></div>
              <div className="text-[10px] text-[#888] uppercase tracking-[0.2em] font-bold mt-2 leading-tight">Retention lift via <br/>community roles</div>
              <div className="text-[8px] text-[#444] font-mono mt-1">RESEARCH: GEN Z LOYALTY INDEX</div>
            </div>
          </motion.div>
        </div>

        {/* Dual Column Content */}
        <div className="grid grid-cols-2 gap-16 mb-16 items-start">
          <motion.section
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h4 className="border-b border-[#2e2e2e] pb-3 mb-8 font-mono text-[12px] tracking-[0.3em] text-[#e8002d] uppercase font-bold">Strategic Pillars</h4>
            <ul className="space-y-8">
              {[
                { id: "01", title: "Campus Ambassador Network", body: "City-level connectors across Pune, Mumbai, & Delhi for on-ground fandom activation." },
                { id: "02", title: "Fan-Led Content Systems", body: "Moving from brand projection to user-generated community missions via Instagram clusters." },
                { id: "03", title: "Offline-to-Online Funnels", body: "Converting pop-up visitors into recurring digital participants with measurable data capture." }
              ].map((item, i) => (
                <li key={i} className="flex gap-6 group">
                  <span className="text-3xl font-black text-[#1a1a1a] leading-none group-hover:text-[#e8002d] transition-colors duration-500">{item.id}</span>
                  <div className="flex flex-col">
                    <p className="font-black text-[13px] uppercase tracking-wide text-white mb-2">{item.title}</p>
                    <p className="text-[12px] text-[#888] leading-relaxed italic">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.section>

          <motion.section
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h4 className="border-b border-[#2e2e2e] pb-3 mb-8 font-mono text-[12px] tracking-[0.3em] text-[#e8002d] uppercase font-bold">Demographic Index</h4>
            <div className="space-y-6">
              {[
                { label: "Passive Consumption", pct: 89 },
                { label: "Active Participation", pct: 34 },
                { label: "Merch Intent", pct: 51 },
                { label: "Brand Loyalty (Involved)", pct: 78 }
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-2 group">
                  <div className="flex justify-between text-[10px] uppercase font-black tracking-widest text-[#888] group-hover:text-white transition-colors">
                    <span>{item.label}</span>
                    <span className="text-[#e8002d]">{item.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-[#1a1a1a] w-full overflow-hidden relative">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.8, ease: "circOut" }}
                      className="h-full bg-[#e8002d]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Quote / Highlight */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center border-y border-[#2e2e2e] py-12"
        >
          <div className="text-4xl font-black italic uppercase tracking-tighter leading-none mb-4">
            \"India doesn't need <span className="text-[#e8002d]">visibility.</span> It needs <span className="text-[#e8002d]">infrastructure.</span>\"
          </div>
          <div className="font-mono text-[10px] tracking-[0.2em] text-[#555] uppercase">K-Wave Intelligence Project · independent research</div>
        </motion.div>

        {/* Footer Contact */}
        <motion.footer 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-auto pt-10 border-t border-[#2e2e2e] flex justify-between items-end"
        >
          <div className="max-w-2xl">
            <p className="text-[#888] text-[11px] leading-relaxed uppercase tracking-tight">
              <span className="text-[#e8002d] font-bold italic mr-2 select-text">HYBE K-Wave Intelligence Project:</span> 
              Currently mapping artist popularity and fan behavior patterns across Tier-1 Indian cities using Spotify, YouTube, and Social Listening datasets. My research focuses on converting high-intent local energy into sustainable global metrics.
            </p>
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0 pl-12">
            <a href="mailto:eshikapandit086@gmail.com" className="text-[#f5f5f0] text-sm font-black hover:text-[#e8002d] transition-colors border-b border-[#f5f5f0]/30 pb-0.5 select-text">eshikapandit086@gmail.com</a>
            <span className="text-[#888] font-mono text-[9px] tracking-[0.2em] uppercase font-bold">Pune, India // +91 84210 78838</span>
            <div className="flex gap-3 mt-2">
              <div className="w-3 h-3 bg-[#e8002d]" />
              <div className="w-3 h-3 bg-[#2e2e2e]" />
              <div className="w-3 h-3 bg-[#1a1a1a]" />
            </div>
          </div>
        </motion.footer>

        {/* Background Accents */}
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-[#e8002d]/2 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-[#e8002d]/2 blur-[120px] pointer-events-none" />
      </div>
    </div>
  );
}
