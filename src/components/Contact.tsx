"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { decryptPhone } from "@/lib/security";
import { PERSONAL_INFO } from "@/lib/data";
import { Mail, Phone, Copy, Check, Send, Sparkles } from "lucide-react";

export function Contact() {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [phone, setPhone] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    context: ""
  });

    const handleInquiry = (e: React.FormEvent) => {
      e.preventDefault();
      setFormStatus("submitting");
      
      const subject = encodeURIComponent(formData.subject || `Inquiry from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\n\n` +
        `Context:\n${formData.context}`
      );
      
      const mailtoLink = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
      
      // Update UI state
      setTimeout(() => {
        setFormStatus("sent");
        
        // Use window.open for better cross-browser compatibility with mailto
        window.open(mailtoLink, '_blank');
        
        // Reset form after a delay
        setTimeout(() => {
          setFormStatus("idle");
          setFormData({ name: "", subject: "", context: "" });
        }, 3000);
      }, 800);
    };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const result = decryptPhone(password.trim());
    if (result) {
      setPhone(result);
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setPassword("");
      setTimeout(() => setError(false), 2000);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="section-container relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3 text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-6">
            <div className="w-8 h-[1px] bg-accent/30" /> Initiate Contact
          </div>
          
          <h2 className="section-title">
            Let's build <br />
            <span className="opacity-[var(--muted-opacity)]">the future.</span>
          </h2>
          
          <p className="text-text-secondary text-base mb-12 max-w-sm leading-relaxed font-bold tracking-tight">
            I'm always looking for ambitious projects that challenge the status quo of data and systems.
          </p>
          
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-accent text-white flex items-center justify-center glow-md shrink-0">
                  <Mail size={22} />
                </div>
                <div>
                  <div className="text-[9px] uppercase tracking-[0.4em] font-black text-text-secondary mb-2">Electronic Mail</div>
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="text-lg font-black text-foreground hover:text-accent transition-colors tracking-tight">
                      {PERSONAL_INFO.email}
                    </a>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-card-bg text-accent flex items-center justify-center border border-card-border shrink-0">
                  <Phone size={22} />
                </div>
                <div className="flex-1">
                  <div className="text-[9px] uppercase tracking-[0.4em] font-black text-text-secondary mb-2">Direct Terminal</div>
                  <AnimatePresence mode="wait">
                    {!isUnlocked ? (
                      <motion.form 
                        key="lock"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleUnlock}
                        className="flex gap-3 mt-1"
                      >
                          <div className="relative flex-1 max-w-[220px] mb-8 md:mb-0">
                              <input 
                                type="password" 
                                placeholder="UNLOCK CODE..."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full bg-card-bg/40 border ${error ? 'border-red-500/50' : 'border-card-border/40'} rounded-full px-6 py-4 text-[10px] focus:outline-none focus:ring-4 focus:ring-accent/5 transition-all font-black tracking-widest text-foreground uppercase`}
                              />
                                <p className="absolute -bottom-10 left-0 w-full text-[8px] font-black uppercase tracking-widest text-accent leading-tight bg-accent/5 p-2 rounded-lg border border-accent/10 whitespace-nowrap">
                                  <Sparkles size={10} className="inline mr-1 mb-0.5" />
                                  Tip: Drop a mail for the unlock code.
                                </p>
                          </div>
                        <button 
                          type="submit"
                          className="px-8 py-4 bg-accent text-white rounded-full text-[9px] font-black uppercase tracking-widest hover:glow-md active:scale-95 transition-all"
                        >
                          Unlock
                        </button>
                      </motion.form>
                    ) : (
                      <motion.div 
                        key="unlock"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-4 mt-1"
                      >
                        <span className="text-2xl font-black tracking-tighter text-accent">{phone}</span>
                        <button 
                          onClick={() => copyToClipboard(phone || "")}
                          className="p-3 rounded-full bg-accent/5 hover:bg-accent hover:text-white text-accent transition-all border border-accent/10"
                        >
                          {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 apple-card p-8 md:p-12 glow-lg">
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-4 rounded-2xl bg-accent text-white glow-md">
                  <Send size={20} />
                </div>
                <h3 className="text-2xl font-black tracking-tighter uppercase">Inquiry Protocol</h3>
              </div>

            
                  <form onSubmit={handleInquiry} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase tracking-[0.4em] text-text-secondary opacity-60 ml-2">Name</label>
                            <input 
                              required 
                              type="text" 
                              placeholder="IDENTITY..." 
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                              className="w-full bg-bg/50 border border-card-border/40 rounded-full px-6 py-4 focus:outline-none focus:ring-4 focus:ring-accent/5 transition-all text-[10px] font-black tracking-widest placeholder:text-text-secondary/20 text-text-primary" 
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase tracking-[0.4em] text-text-secondary opacity-60 ml-2">Subject Line</label>
                            <input 
                              required 
                              type="text" 
                              placeholder="ENDPOINT..." 
                              value={formData.subject}
                              onChange={(e) => setFormData({...formData, subject: e.target.value})}
                              className="w-full bg-bg/50 border border-card-border/40 rounded-full px-6 py-4 focus:outline-none focus:ring-4 focus:ring-accent/5 transition-all text-[10px] font-black tracking-widest placeholder:text-text-secondary/20 text-text-primary" 
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-[0.4em] text-text-secondary opacity-60 ml-2">Context</label>
                          <textarea 
                            required 
                            rows={4} 
                            placeholder="TRANSMIT DATA..." 
                            value={formData.context}
                            onChange={(e) => setFormData({...formData, context: e.target.value})}
                            className="w-full bg-bg/50 border border-card-border/40 rounded-[2rem] px-6 py-5 focus:outline-none focus:ring-4 focus:ring-accent/5 transition-all text-[10px] font-black tracking-widest resize-none placeholder:text-text-secondary/20 text-text-primary"
                          ></textarea>
                        </div>
                    <button 
                      type="submit"
                      disabled={formStatus !== "idle"}
                      className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {formStatus === "idle" && "Launch Mail Client"}
                      {formStatus === "submitting" && "Preparing Transmission..."}
                      {formStatus === "sent" && "Client Launched"}
                      {formStatus === "error" && "Protocol Error"}
                    </button>
                </form>
          </div>
        </div>
      </div>
    </section>
  );
}
