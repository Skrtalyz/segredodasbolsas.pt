/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { 
  Check, 
  X, 
  Star, 
  Lock, 
  BookOpen, 
  Clock, 
  Heart, 
  HelpCircle, 
  MessageCircle, 
  ArrowRight, 
  ShieldCheck, 
  FileText, 
  ShoppingBag, 
  Users, 
  TrendingUp, 
  Sparkles,
  Phone,
  Mail,
  Award
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// LINK DO HOTMART - SUBSTUTUÍVEL FACILMENTE PELO UTILIZADOR
const HOTMART_LINK = "https://pay.hotmart.com/C106096630V?checkoutMode=10";

export default function App() {
  // 1. Contador Regressivo Urgência (falso)
  // Define o cronómetro inicial em 23 horas, 47 minutos e 12 segundos
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem("segredo_bolsas_countdown");
    if (saved) {
      const parsed = parseInt(saved, 10);
      if (parsed > 0) return parsed;
    }
    return 23 * 3600 + 47 * 60 + 12; // 85632 segundos
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev <= 1 ? 23 * 3600 + 47 * 60 + 12 : prev - 1;
        localStorage.setItem("segredo_bolsas_countdown", next.toString());
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // 2. Barra de Progresso de Leitura
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  // 4. Modais Auxiliares para Rodapé (Privacidade, Termos, Contacto)
  const [activeModal, setActiveModal] = useState<"privicidade" | "termos" | "contacto" | null>(null);

  // 5. Função de scroll suave interna para secções
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#1A1A1A] antialiased selection:bg-[#D4A574]/30 selection:text-[#8B4513]">
      
      {/* BARRA DE PROGRESSO DE LEITURA */}
      <div 
        style={{ width: `${scrollProgress}%` }}
        className="fixed top-0 left-0 h-[4px] bg-[#8B4513] z-50 transition-all duration-75"
        id="reading-progress-bar"
      />

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F8F5F0] via-white to-white px-6 pt-16 pb-20 sm:px-8 md:pt-24 md:pb-28" id="hero-section">
        <div className="mx-auto max-w-[960px]">
          <div className="grid items-center gap-8 md:gap-12 md:grid-cols-12">
            
            {/* Texto Hero */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="md:col-span-7 py-2"
            >
              <span className="inline-flex items-center gap-1.5 bg-[#8B4513]/10 border border-[#8B4513]/20 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B4513] mb-6">
                <Sparkles className="h-3.5 w-3.5" /> Metodologia Europeia Exclusiva
              </span>
              
              <h1 className="font-serif text-3xl font-black leading-[1.08] text-[#1A1A1A] sm:text-4xl md:text-[44px] tracking-tight mb-6">
                O método que está a fazer mulheres comuns em Portugal ganhar <span className="text-[#8B4513] underline decoration-[#D4A574] decoration-4 underline-offset-4 transition-all duration-300 hover:decoration-[#8B4513]">€500–1.500/mês</span> com uma tela, um fio e 5 minutos por dia.
              </h1>
              
              <p className="text-base leading-relaxed text-zinc-650 mb-8 max-w-xl md:text-lg">
                Sem precisar de talento, loja física ou publicar nas redes sociais. Um método europeu documentado e validado por mais de 800 mulheres a trabalhar em casa.
              </p>

              {/* CTAs */}
              <div className="flex flex-col gap-3 sm:max-w-md">
                <motion.a 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={HOTMART_LINK} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex w-full items-center justify-center gap-2 rounded-md bg-[#16A34A] px-8 py-4.5 text-center text-base font-bold tracking-wide text-white transition-all duration-300 hover:bg-[#15803D] hover:shadow-xl hover:shadow-[#16A34A]/25"
                  id="hero-cta-button"
                >
                  Quero o método, acesso imediato
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                </motion.a>
              </div>
            </motion.div>

            {/* Imagem do Livro / Mockup */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
              className="md:col-span-5 flex justify-center"
            >
              <div className="relative w-full max-w-[280px] sm:max-w-[320px]">
                {/* Efeito Sombra */}
                <div className="absolute inset-0 bg-[#8B4513]/10 rounded-2xl blur-2xl transform rotate-3 scale-105"></div>
                
                <img 
                  src="https://i.postimg.cc/Sx100wNK/image.png" 
                  alt="O Segredo das Bolsas" 
                  className="relative w-full h-auto rounded-xl shadow-2xl border-4 border-[#e9c49a]/20 z-10"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. BLOCO DE DOR */}
      <section className="bg-[#F8F5F0]/60 px-6 py-16 sm:px-8 sm:py-24 border-y border-[#D4A574]/20" id="dor-section">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-[960px]"
        >
          
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B4513] block mb-2">A TUA LIBERDADE</span>
            <h2 className="font-serif text-3xl font-black leading-tight text-[#1A1A1A] sm:text-4xl max-w-xl mx-auto">
              Até quando vais esperar para teres uma renda que seja só tua?
            </h2>
            <div className="mx-auto mt-5 h-[2px] w-12 bg-[#8B4513]"></div>
          </div>

          <div className="mx-auto max-w-2xl">
            <div className="space-y-6">
              
              <div className="flex gap-3 sm:gap-4 border border-[#D4A574]/30 bg-white p-4 sm:p-6 shadow-sm transition-all duration-300 hover:border-[#8B4513] hover:shadow-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-orange-50 text-[#8B4513]">
                  <X className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[15px] text-stone-900 font-bold leading-relaxed">
                    "Cansaste de ter de pedir dinheiro para comprares coisas para ti própria."
                  </p>
                  <span className="text-xs text-zinc-500 mt-1 block font-medium">A dependência financeira desgasta até a mulher mais forte.</span>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4 border border-[#D4A574]/30 bg-white p-4 sm:p-6 shadow-sm transition-all duration-300 hover:border-[#8B4513] hover:shadow-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-orange-50 text-[#8B4513]">
                  <X className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[15px] text-stone-900 font-bold leading-relaxed">
                    "Sentes que o tempo está a passar, e as tuas vontades ficam sempre para depois."
                  </p>
                  <span className="text-xs text-zinc-500 mt-1 block font-medium">Há quanto tempo estás a adiar o teu início e a tua liberdade?</span>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4 border border-[#D4A574]/30 bg-white p-4 sm:p-6 shadow-sm transition-all duration-300 hover:border-[#8B4513] hover:shadow-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-orange-50 text-[#8B4513]">
                  <X className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[15px] text-stone-900 font-bold leading-relaxed">
                    "Querias ter algo que fosse só teu. Que ninguém te pudesse dar nem tirar."
                  </p>
                  <span className="text-xs text-zinc-500 mt-1 block font-medium">Uma habilidade segura que reside nas tuas próprias mãos e cabeça.</span>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4 bg-gradient-to-br from-[#8B4513]/10 to-[#8B4513]/5 p-4 sm:p-6 border-2 border-[#8B4513]/40">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#8B4513] text-white">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-base text-[#1A1A1A] font-extrabold leading-relaxed">
                    "Esse caminho existe. E está documentado dentro deste método."
                  </p>
                  <span className="text-sm text-zinc-700 mt-1.5 block font-medium leading-relaxed">
                    As chaves do método europeu que mudou as finanças de +800 portuguesas.
                  </span>
                </div>
              </div>

            </div>

          </div>

          <div className="mt-8 text-center">
            <motion.a 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={HOTMART_LINK}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md bg-[#16A34A] px-8 sm:px-10 py-4 text-center text-base font-bold text-white shadow-md transition-all duration-300 hover:bg-[#15803D] hover:shadow-xl hover:translate-y-[-1px]"
            >
              Quero a minha autonomia financeira
              <ArrowRight className="h-5 w-5" />
            </motion.a>
          </div>

        </motion.div>
      </section>

      {/* 5. O PRODUTO */}
      <section className="bg-[#F8F5F0] px-6 py-16 sm:px-8 sm:py-24 border-y border-[#D4A574]/20" id="produto-section">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-[960px]"
        >
          
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B4513]">CONTEÚDO COMPLETO E EXCLUSIVO</span>
            <h2 className="font-serif text-3xl font-black text-[#1A1A1A] sm:text-4xl mt-3">
              Conhece o Método
            </h2>
            <div className="mx-auto mt-5 h-[2px] w-12 bg-[#8B4513]"></div>
          </div>

          {/* Cartão de Detalhes do Livro */}
          <div className="bg-white rounded-xl p-5 sm:p-10 border-2 border-[#D4A574]/30 shadow-xl relative overflow-hidden">
            {/* Elegant upper decorative mark */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#8B4513] via-[#D4A574] to-[#8B4513]"></div>
            
            <div className="grid gap-10 md:grid-cols-12 items-center">
              
              {/* Mockup do Produto */}
              <div className="md:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[240px] group">
                  <div className="absolute inset-0 bg-[#8B4513]/5 rounded-xl blur-lg transform scale-105"></div>
                  
                  {/* Rich brown and gold mockup with a leather effect background */}
                  <div className="relative aspect-[3/4] w-full bg-gradient-to-br from-[#8B4513] to-[#592b0c] p-5 shadow-xl border-2 border-[#D4A574]/40 flex flex-col justify-between text-white overflow-hidden" style={{ borderRadius: "8px 16px 16px 8px" }}>
                    
                    {/* Leather texture overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:12px_12px] opacity-30"></div>
                    
                    <div className="border border-[#D4A574]/30 h-full w-full rounded-md p-4 flex flex-col justify-between relative bg-black/10">
                      
                      <div className="text-center">
                        <span className="text-[8px] tracking-[0.25em] font-extrabold uppercase text-[#D4A574]">MÉTODO DIGITAL (PDF)</span>
                        <div className="h-[1px] w-6 bg-[#D4A574]/30 mx-auto my-1.5"></div>
                      </div>
                      
                      <div className="text-center">
                        <p className="font-serif text-lg font-extrabold tracking-wider text-[#fffaf0] leading-none mb-1">O SEGREDO</p>
                        <p className="font-sans text-[10px] tracking-[0.3em] font-semibold text-[#D4A574]" style={{ margin: "6px 0" }}>DAS</p>
                        <p className="font-serif text-lg font-extrabold tracking-wider text-[#fffaf0] leading-none">BOLSAS</p>
                      </div>

                      <div className="text-center border-t border-[#D4A574]/15 pt-2">
                        <p className="text-[8px] tracking-widest text-[#D4A574] font-bold uppercase font-sans">EDITION LUXE</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Descrição do Produto */}
              <div className="md:col-span-7">
                <p className="text-base text-zinc-700 leading-relaxed mb-6 font-medium">
                  "O registo completo de mais de uma década de descobertas, viagens, experiências e bolsas produzidas pelas próprias mãos da autora. O único método em Portugal que reúne, num só material, os modelos europeus, os modelos exclusivos da autora e o método que está a fazer mulheres comuns ganhar €500–1.500 por mês a trabalhar de casa."
                </p>

                <div className="grid gap-6 sm:grid-cols-2 pt-4 border-t border-zinc-200">
                  
                  {/* Lista "Este método é para ti..." */}
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-[0.12em] text-[#8B4513] mb-3">Este método é para ti...</h4>
                    <ul className="space-y-2 text-sm text-zinc-600">
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4A574] shrink-0 mt-0.5">✔</span>
                        <span>Mesmo que nunca tenhas feito artesanato</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4A574] shrink-0 mt-0.5">✔</span>
                        <span>Mesmo que já tenhas tentado e desistido</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4A574] shrink-0 mt-0.5">✔</span>
                        <span>Mesmo que aches que não tens tempo</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4A574] shrink-0 mt-0.5">✔</span>
                        <span>Mesmo que aches que não tens talento</span>
                      </li>
                    </ul>
                  </div>

                  {/* Lista "O que recebes..." */}
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-[0.12em] text-[#8B4513] mb-3">O que recebes...</h4>
                    <ul className="space-y-2 text-sm text-zinc-600">
                      <li className="flex items-start gap-2">
                        <span className="text-[#8B4513] shrink-0 mt-0.5">★</span>
                        <span className="font-semibold text-zinc-800">6 capítulos · 500+ modelos</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#8B4513] shrink-0 mt-0.5">★</span>
                        <span className="font-semibold text-zinc-800">Método Express completo</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#8B4513] shrink-0 mt-0.5">★</span>
                        <span className="font-semibold text-zinc-800">Lista de fornecedores em PT e ES</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#8B4513] shrink-0 mt-0.5">★</span>
                        <span className="font-semibold text-zinc-800">Caminho de vendas pelo WhatsApp</span>
                      </li>
                    </ul>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* CTA do Meio */}
          <div className="mt-8 text-center">
            <motion.a 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={HOTMART_LINK}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md bg-[#16A34A] px-8 sm:px-10 py-4 text-center text-base font-bold text-white shadow-md transition-all duration-300 hover:bg-[#15803D] hover:shadow-xl hover:translate-y-[-1px]"
            >
              Quero o método, acesso imediato
              <ArrowRight className="h-5 w-5" />
            </motion.a>
          </div>

        </motion.div>
      </section>

      {/* 8. PORQUE FUNCIONA */}
      <section className="bg-white px-6 py-16 sm:px-8 sm:py-24" id="porque-funciona-section">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-[960px]"
        >
          
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#8B4513] block">VIABILIDADE ECONÓMICA</span>
            <h2 className="font-serif text-3xl font-black text-[#1A1A1A] sm:text-4xl mt-3">
              Mesmo para quem já tentou de tudo
            </h2>
            <div className="mx-auto mt-5 h-[2px] w-12 bg-[#8B4513]"></div>
          </div>

          {/* Grid de 8 Cards */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* Card 1 */}
            <motion.div 
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="bg-[#F8F5F0]/30 p-5 rounded-xl border-2 border-[#D4A574]/30 shadow-sm transition-all duration-300 hover:border-[#8B4513]/55 hover:shadow-md"
            >
              <span className="text-2xl font-serif font-black text-[#8B4513] block mb-2">01</span>
              <h4 className="text-[15px] font-extrabold text-[#1A1A1A] mb-1.5 leading-tight">Parte do zero</h4>
              <p className="text-xs text-zinc-650 leading-relaxed font-semibold">Nenhum conhecimento prévio necessário.</p>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="bg-[#F8F5F0]/30 p-5 rounded-xl border-2 border-[#D4A574]/30 shadow-sm transition-all duration-300 hover:border-[#8B4513]/55 hover:shadow-md"
            >
              <span className="text-2xl font-serif font-black text-[#8B4513] block mb-2">02</span>
              <h4 className="text-[15px] font-extrabold text-[#1A1A1A] mb-1.5 leading-tight">€15 para começar</h4>
              <p className="text-xs text-zinc-650 leading-relaxed font-semibold">10 bolsas produzidas com o investimento de um jantar fora.</p>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="bg-[#F8F5F0]/30 p-5 rounded-xl border-2 border-[#D4A574]/30 shadow-sm transition-all duration-300 hover:border-[#8B4513]/55 hover:shadow-md"
            >
              <span className="text-2xl font-serif font-black text-[#8B4513] block mb-2">03</span>
              <h4 className="text-[15px] font-extrabold text-[#1A1A1A] mb-1.5 leading-tight">Margem de 1.000%</h4>
              <p className="text-xs text-zinc-650 leading-relaxed font-semibold">Bolsa que custa €5 vende a €80. Faz as contas.</p>
            </motion.div>

            {/* Card 4 */}
            <motion.div 
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="bg-[#F8F5F0]/30 p-5 rounded-xl border-2 border-[#D4A574]/30 shadow-sm transition-all duration-300 hover:border-[#8B4513]/55 hover:shadow-md"
            >
              <span className="text-2xl font-serif font-black text-[#8B4513] block mb-2">04</span>
              <h4 className="text-[15px] font-extrabold text-[#1A1A1A] mb-1.5 leading-tight">5 min por bolsa</h4>
              <p className="text-xs text-zinc-650 leading-relaxed font-semibold">Uma tarde produz a semana inteira de vendas.</p>
            </motion.div>

            {/* Card 5 */}
            <motion.div 
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="bg-[#F8F5F0]/30 p-5 rounded-xl border-2 border-[#D4A574]/30 shadow-sm transition-all duration-300 hover:border-[#8B4513]/55 hover:shadow-md"
            >
              <span className="text-2xl font-serif font-black text-[#8B4513] block mb-2">05</span>
              <h4 className="text-[15px] font-extrabold text-[#1A1A1A] mb-1.5 leading-tight">Antifalhas</h4>
              <p className="text-xs text-zinc-650 leading-relaxed font-semibold">Erro zero, mesmo na primeira tentativa.</p>
            </motion.div>

            {/* Card 6 */}
            <motion.div 
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="bg-[#F8F5F0]/30 p-5 rounded-xl border-2 border-[#D4A574]/30 shadow-sm transition-all duration-300 hover:border-[#8B4513]/55 hover:shadow-md"
            >
              <span className="text-2xl font-serif font-black text-[#8B4513] block mb-2">06</span>
              <h4 className="text-[15px] font-extrabold text-[#1A1A1A] mb-1.5 font-sans leading-tight">Sem redes sociais</h4>
              <p className="text-xs text-zinc-650 leading-relaxed font-semibold">Sem posts, sem vídeos, sem aparecer. O caminho está no método.</p>
            </motion.div>

            {/* Card 7 */}
            <motion.div 
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="bg-[#F8F5F0]/30 p-5 rounded-xl border-2 border-[#D4A574]/30 shadow-sm transition-all duration-300 hover:border-[#8B4513]/55 hover:shadow-md"
            >
              <span className="text-2xl font-serif font-black text-[#8B4513] block mb-2">07</span>
              <h4 className="text-[15px] font-extrabold text-[#1A1A1A] mb-1.5 leading-tight">Procura eterna</h4>
              <p className="text-xs text-zinc-650 leading-relaxed font-semibold">Toda a mulher quer bolsas. Todos os meses. Em todas as classes.</p>
            </motion.div>

            {/* Card 8 */}
            <motion.div 
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="bg-[#F8F5F0]/30 p-5 rounded-xl border-2 border-[#D4A574]/30 shadow-sm transition-all duration-300 hover:border-[#8B4513]/55 hover:shadow-md"
            >
              <span className="text-2xl font-serif font-black text-[#8B4513] block mb-2">08</span>
              <h4 className="text-[15px] font-extrabold text-[#1A1A1A] mb-1.5 leading-tight">800+ provas</h4>
              <p className="text-xs text-zinc-650 leading-relaxed font-semibold font-sans">Não é teste. É método validado por gente como tu.</p>
            </motion.div>

          </div>

          <div className="mt-8 text-center">
            <motion.a 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={HOTMART_LINK}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md bg-[#16A34A] px-8 sm:px-10 py-4 text-center text-base font-bold text-white shadow-md transition-all duration-300 hover:bg-[#15803D] hover:shadow-xl hover:translate-y-[-1px]"
            >
              Começar hoje por apenas €7,90
              <ArrowRight className="h-5 w-5" />
            </motion.a>
          </div>

        </motion.div>
      </section>

      {/* 9. CONTEÚDO DO LIVRO */}
      <section className="bg-[#F8F5F0] px-6 py-16 sm:px-8 sm:py-24 border-y border-[#D4A574]/20" id="conteudo-detalhado">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-[960px]"
        >
          
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B4513]">POR DENTRO DESTA EDIÇÃO</span>
            <h2 className="font-serif text-3xl font-black text-[#1A1A1A] sm:text-4xl mt-3">
              Dentro do método vais encontrar
            </h2>
            <div className="mx-auto mt-5 h-[2px] w-12 bg-[#8B4513]"></div>
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            
            <div className="rounded-xl border-2 border-[#D4A574]/25 bg-white p-5 shadow-md flex flex-col justify-between">
              <div>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#8B4513] text-white font-serif font-black text-xs mb-4">01</span>
                <h4 className="text-[16px] font-black text-[#1A1A1A] mb-2 leading-tight">O Método Express</h4>
                <p className="text-xs sm:text-sm text-zinc-650 leading-relaxed font-medium">
                  Como produzir a tua primeira bolsa comercializável na primeira hora, seguindo um cronograma simples que poupa o teu tempo precioso.
                </p>
              </div>
            </div>

            <div className="rounded-xl border-2 border-[#D4A574]/25 bg-white p-5 shadow-md flex flex-col justify-between">
              <div>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#8B4513] text-white font-serif font-black text-xs mb-4">02</span>
                <h4 className="text-[16px] font-black text-[#1A1A1A] mb-2 leading-tight">O Protocolo Antifalhas</h4>
                <p className="text-xs sm:text-sm text-zinc-650 leading-relaxed font-medium">
                  Passo a passo gráfico completo para evitar desperdício de tela e fio, garantindo acabamento idêntico ao de lojas de luxo europeias.
                </p>
              </div>
            </div>

            <div className="rounded-xl border-2 border-[#D4A574]/25 bg-white p-5 shadow-md flex flex-col justify-between">
              <div>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#8B4513] text-white font-serif font-black text-xs mb-4">03</span>
                <h4 className="text-[16px] font-black text-[#1A1A1A] mb-2 leading-tight">A Lista de Fornecedores PT</h4>
                <p className="text-xs sm:text-sm text-zinc-650 leading-relaxed font-medium">
                  Os contactos e sites diretos dos maiores distribuidores grossistas de fitas e fechos em Portugal e Espanha para maximizar a tua margem de lucro.
                </p>
              </div>
            </div>

            <div className="rounded-xl border-2 border-[#D4A574]/25 bg-white p-5 shadow-md flex flex-col justify-between">
              <div>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#8B4513] text-white font-serif font-black text-xs mb-4">04</span>
                <h4 className="text-[16px] font-black text-[#1A1A1A] mb-2 leading-tight">6 Capítulos · 500+ modelos</h4>
                <p className="text-xs sm:text-sm text-zinc-650 leading-relaxed font-medium">
                  Uma recolha impressionante organizada por complexidade, garantindo que tens sempre novidades atraentes para entregar às tuas clientes fiéis.
                </p>
              </div>
            </div>

            <div className="rounded-xl border-2 border-[#D4A574]/25 bg-white p-5 shadow-md flex flex-col justify-between">
              <div>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#8B4513] text-white font-serif font-black text-xs mb-4">05</span>
                <h4 className="text-[16px] font-black text-[#1A1A1A] mb-2 leading-tight">Os Modelos Exclusivos</h4>
                <p className="text-xs sm:text-sm text-zinc-650 leading-relaxed font-medium">
                  Acederás aos moldes e designs exclusivos que a Maria João desenvolveu ao longo de dez anos de sucesso no mercado europeu de luxo informal.
                </p>
              </div>
            </div>

            <div className="rounded-xl border-2 border-[#D4A574]/25 bg-white p-5 shadow-md flex flex-col justify-between">
              <div>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#8B4513] text-white font-serif font-black text-xs mb-4">06</span>
                <h4 className="text-[16px] font-black text-[#1A1A1A] mb-2 leading-tight">Caminho pelo WhatsApp</h4>
                <p className="text-xs sm:text-sm text-zinc-650 leading-relaxed font-medium">
                  O roteiro exato de mensagens prontas para enviar a amigas, familiares ou compradoras locais. Vende sem precisar de ser chata ou insistente.
                </p>
              </div>
            </div>

          </div>

          <div className="mt-8 text-center">
            <motion.a 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={HOTMART_LINK}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md bg-[#16A34A] px-8 sm:px-10 py-4 text-center text-base font-bold text-white shadow-md transition-all duration-300 hover:bg-[#15803D] hover:shadow-xl hover:translate-y-[-1px]"
            >
              Quero aceder a tudo isto
              <ArrowRight className="h-5 w-5" />
            </motion.a>
          </div>

        </motion.div>
      </section>

      {/* EXTRA BONUS SECTION */}
      <section className="bg-[#F8F5F0] px-6 py-16 sm:px-8 sm:py-24 border-y border-[#D4A574]/25" id="bonus-section">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-[960px]"
        >
          
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B4513]">OFERTA DE LANÇAMENTO</span>
            <h2 className="font-serif text-3xl font-black text-[#1A1A1A] sm:text-4xl mt-3">
              E ainda recebes estes bónus, sem custo adicional
            </h2>
            <div className="mx-auto mt-5 h-[2px] w-12 bg-[#8B4513]"></div>
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
            
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-xl border-2 border-[#D4A574]/35 shadow-md flex flex-col justify-between transition-all duration-300 hover:border-[#8B4513]/50">
              <div>
                <div className="h-10 w-10 rounded-lg bg-[#8B4513]/10 flex items-center justify-center text-[#8B4513] mb-4">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="text-[16px] font-black text-[#1A1A1A] mb-2 leading-tight">Bónus 1: Lista de Fornecedores Exclusiva</h3>
                <p className="text-xs sm:text-sm text-zinc-650 leading-relaxed font-semibold">
                  Os contactos directos dos melhores distribuidores grossistas de fitas, tecidos e fechos em Portugal e Espanha. Os mesmos fornecedores que abastecem ateliês profissionais, agora acessíveis a ti, com preços que tornam a tua margem impossível de ignorar.
                </p>
              </div>
              <div className="mt-4 pt-1">
                <span className="inline-block px-3 py-1 rounded bg-[#EAF3DE] text-[#3B6D11] text-[11px] font-extrabold tracking-wide border border-[#3B6D11]/25">
                  Valor: €19, Incluído grátis
                </span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-xl border-2 border-[#D4A574]/35 shadow-md flex flex-col justify-between transition-all duration-300 hover:border-[#8B4513]/50">
              <div>
                <div className="h-10 w-10 rounded-lg bg-[#8B4513]/10 flex items-center justify-center text-[#8B4513] mb-4">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <h3 className="text-[16px] font-black text-[#1A1A1A] mb-2 leading-tight">Bónus 2: Guia de Preços e Lucros</h3>
                <p className="text-xs sm:text-sm text-zinc-650 leading-relaxed font-semibold">
                  Uma tabela simples que te diz exactamente quanto cobrar por cada tipo de bolsa, com base no custo real dos materiais e no mercado português actual. Acabou a incerteza de "será que estou a cobrar bem?"
                </p>
              </div>
              <div className="mt-4 pt-1">
                <span className="inline-block px-3 py-1 rounded bg-[#EAF3DE] text-[#3B6D11] text-[11px] font-extrabold tracking-wide border border-[#3B6D11]/25">
                  Valor: €12, Incluído grátis
                </span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-xl border-2 border-[#D4A574]/35 shadow-md flex flex-col justify-between transition-all duration-300 hover:border-[#8B4513]/50">
              <div>
                <div className="h-10 w-10 rounded-lg bg-[#8B4513]/10 flex items-center justify-center text-[#8B4513] mb-4">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <h3 className="text-[16px] font-black text-[#1A1A1A] mb-2 leading-tight">Bónus 3: Roteiro de Vendas pelo WhatsApp</h3>
                <p className="text-xs sm:text-sm text-zinc-650 leading-relaxed font-semibold">
                  As mensagens exactas, prontas a copiar e adaptar, para apresentares as tuas bolsas a amigas, familiares e conhecidas sem parecer chata nem insistente. O caminho mais curto entre a tua primeira bolsa pronta e o primeiro dinheiro na conta.
                </p>
              </div>
              <div className="mt-4 pt-1">
                <span className="inline-block px-3 py-1 rounded bg-[#EAF3DE] text-[#3B6D11] text-[11px] font-extrabold tracking-wide border border-[#3B6D11]/25">
                  Valor: €17, Incluído grátis
                </span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-6 rounded-xl border-2 border-[#D4A574]/35 shadow-md flex flex-col justify-between transition-all duration-300 hover:border-[#8B4513]/50">
              <div>
                <div className="h-10 w-10 rounded-lg bg-[#8B4513]/10 flex items-center justify-center text-[#8B4513] mb-4">
                  <Clock className="h-5 w-5" />
                </div>
                <h3 className="text-[16px] font-black text-[#1A1A1A] mb-2 leading-tight">Bónus 4: Calendário de Procura Anual</h3>
                <p className="text-xs sm:text-sm text-zinc-650 leading-relaxed font-semibold">
                  Os 12 meses do ano organizados pelos momentos de maior procura por bolsas artesanais em Portugal: datas comemorativas, épocas de ofertas, alturas de mercados e feiras. Sabe sempre o que produzir e quando vender para maximizar as tuas semanas de maior rendimento.
                </p>
              </div>
              <div className="mt-4 pt-1">
                <span className="inline-block px-3 py-1 rounded bg-[#EAF3DE] text-[#3B6D11] text-[11px] font-extrabold tracking-wide border border-[#3B6D11]/25">
                  Valor: €9, Incluído grátis
                </span>
              </div>
            </div>

          </div>

          <div className="mt-10 text-center">
            <p className="text-sm sm:text-base font-extrabold text-[#8B4513] tracking-wide bg-[#8B4513]/5 border-2 border-[#D4A574]/30 rounded-lg py-3 px-6 inline-block">
              Valor total dos bónus: €57, incluídos sem custo adicional com o teu método.
            </p>
          </div>

          <div className="mt-8 text-center">
            <motion.a 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={HOTMART_LINK}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md bg-[#16A34A] px-8 sm:px-10 py-4 text-center text-base font-bold text-white shadow-md transition-all duration-300 hover:bg-[#15803D] hover:shadow-xl hover:translate-y-[-1px]"
            >
              Quero o método e todos os bónus
              <ArrowRight className="h-5 w-5" />
            </motion.a>
          </div>

        </motion.div>
      </section>

      {/* 10. 3 PASSOS PARA LUCRAR */}
      <section className="bg-white px-6 py-16 sm:px-8 sm:py-24 border-y border-[#D4A574]/20" id="passos-section">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-[960px]"
        >
          
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#8B4513] block">PLANIFICAÇÃO RÁPIDA</span>
            <h2 className="font-serif text-3xl font-black text-[#1A1A1A] sm:text-4xl mt-3">
              Em 3 passos começas a ganhar dinheiro
            </h2>
            <div className="mx-auto mt-5 h-[2px] w-12 bg-[#8B4513]"></div>
          </div>

          <div className="space-y-6 max-w-3xl mx-auto">
            
            {/* Passo 1 */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="relative bg-[#F8F5F0]/30 rounded-xl p-5 sm:p-8 border-2 border-[#D4A574]/30 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#8B4513] text-white font-serif font-black text-xl shadow-md">
                1
              </div>
              <div>
                <h4 className="text-lg font-black text-zinc-900 mb-1.5">Acedes ao método</h4>
                <p className="text-sm text-zinc-650 leading-relaxed font-semibold">
                  Escolhes um modelo, segues o passo a passo de cinco minutos. Hoje mesmo, terás a tua primeira bolsa totalmente pontilhada e concluída.
                </p>
              </div>
            </motion.div>

            {/* Passo 2 */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="relative bg-[#F8F5F0]/30 rounded-xl p-5 sm:p-8 border-2 border-[#D4A574]/30 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#8B4513] text-white font-serif font-black text-xl shadow-md">
                2
              </div>
              <div>
                <h4 className="text-lg font-black text-zinc-900 mb-1.5">Produzes em série</h4>
                <p className="text-sm text-zinc-650 leading-relaxed font-semibold">
                  Apenas 5 minutos por peça. Com um investimento irrisório de €15, consegues produzir até 10 unidades requintadas numa única tarde de tranquilidade.
                </p>
              </div>
            </motion.div>

            {/* Passo 3 */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="relative bg-[#F8F5F0]/30 rounded-xl p-5 sm:p-8 border-2 border-[#D4A574]/30 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#8B4513] text-white font-serif font-black text-xl shadow-md">
                3
              </div>
              <div>
                <h4 className="text-lg font-black text-zinc-900 mb-1.5">Começas a vender</h4>
                <p className="text-sm text-zinc-650 leading-relaxed font-semibold">
                  Aplica o roteiro simplificado incluído na obra. Com apenas algumas conversas no WhatsApp, obterás as primeiras vendas monetizadas ainda esta semana.
                </p>
              </div>
            </motion.div>

          </div>

          <div className="mt-8 text-center">
            <motion.a 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={HOTMART_LINK}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md bg-[#16A34A] px-8 sm:px-10 py-4 text-center text-base font-bold text-white shadow-md transition-all duration-300 hover:bg-[#15803D] hover:shadow-xl hover:translate-y-[-1px]"
            >
              Dar o primeiro passo agora
              <ArrowRight className="h-5 w-5" />
            </motion.a>
          </div>

        </motion.div>
      </section>

      {/* 7. DIFERENCIAÇÃO */}
      <section className="bg-white px-6 py-16 sm:px-8 sm:py-24" id="diferenca-section">
        <div className="mx-auto max-w-[960px]">
          
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#8B4513] block">COMPARAÇÃO DIRETA</span>
            <h2 className="font-serif text-3xl font-black text-[#1A1A1A] sm:text-4xl mt-3">
              Este método é diferente de tudo o que está na internet
            </h2>
            <div className="mx-auto mt-5 h-[2px] w-12 bg-[#8B4513]"></div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            
            {/* Coluna Esquerda: O QUE NÃO É */}
            <div className="rounded-xl border border-red-200 bg-red-50/15 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-800 font-extrabold text-sm">✕</span>
                <h3 className="font-serif text-xl font-extrabold text-stone-900">O que NÃO é</h3>
              </div>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-red-650 font-extrabold shrink-0 mt-0.5">✕</span>
                  <span className="text-zinc-700 text-sm sm:text-base leading-relaxed">
                    Um material genérico de artesanato copiado de outros
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-655 font-extrabold shrink-0 mt-0.5">✕</span>
                  <span className="text-zinc-700 text-sm sm:text-base leading-relaxed">
                    Uma colectânea aleatória de modelos sem método
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-650 font-extrabold shrink-0 mt-0.5">✕</span>
                  <span className="text-zinc-700 text-sm sm:text-base leading-relaxed">
                    Uma promessa vazia de "trabalha em casa" sem caminho real
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-655 font-extrabold shrink-0 mt-0.5">✕</span>
                  <span className="text-zinc-700 text-sm sm:text-base leading-relaxed">
                    Um material amador feito de qualquer maneira
                  </span>
                </li>
              </ul>
            </div>

            {/* Coluna Direita: O QUE É */}
            <div className="rounded-xl border-2 border-[#D4A574]/35 bg-[#F8F5F0]/40 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-sm">✓</span>
                <h3 className="font-serif text-xl font-extrabold text-stone-900">O que É</h3>
              </div>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-700 font-extrabold shrink-0 mt-0.5">✓</span>
                  <span className="text-zinc-700 text-sm sm:text-base leading-relaxed font-semibold">
                    A primeira documentação completa do método europeu adaptado para Portugal.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-700 font-extrabold shrink-0 mt-0.5">✓</span>
                  <span className="text-zinc-700 text-sm sm:text-base leading-relaxed font-semibold">
                    O único material que combina o "como fazer" com o "como vender" no mesmo método.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-700 font-extrabold shrink-0 mt-0.5">✓</span>
                  <span className="text-zinc-700 text-sm sm:text-base leading-relaxed font-semibold">
                    Validado comercialmente por mais de 800 mulheres reais.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-700 font-extrabold shrink-0 mt-0.5">✓</span>
                  <span className="text-zinc-700 text-sm sm:text-base leading-relaxed font-semibold">
                    O método prático detalhado que estimula dedicação e gera resultados de verdade.
                  </span>
                </li>
              </ul>
            </div>

          </div>

          <div className="mt-8 text-center">
            <a 
              href={HOTMART_LINK}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-[#16A34A] px-10 py-4 text-center text-base font-bold text-white shadow-md transition-all duration-300 hover:bg-[#15803D] hover:shadow-xl hover:translate-y-[-1px]"
            >
              Quero o método original
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>

        </div>
      </section>

      {/* 11. QUALIFICAÇÃO */}
      <section className="bg-[#F8F5F0]/40 px-6 py-16 sm:px-8 sm:py-24 border-b border-[#D4A574]/20" id="qualificacao-section">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-[960px]"
        >
          
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#8B4513] block">PERFIL DO CANDIDATO</span>
            <h2 className="font-serif text-3xl font-black text-[#1A1A1A] sm:text-4xl mt-3">
              Este método é para ti?
            </h2>
            <div className="mx-auto mt-5 h-[2px] w-12 bg-[#8B4513]"></div>
          </div>

          <div className="grid gap-8 md:grid-cols-12 max-w-4xl mx-auto">
            
            {/* Sim, é para ti */}
            <div className="md:col-span-7 rounded-xl border-2 border-[#D4A574]/35 bg-white p-6 sm:p-8 shadow-md">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-850 font-extrabold font-sans">✓</span>
                <h3 className="text-lg font-black text-[#1A1A1A] uppercase tracking-wide">Sim, é para ti:</h3>
              </div>
              
              <ul className="space-y-4 text-zinc-750">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#8B4513] font-bold shrink-0 mt-0.5">✔</span>
                  <span className="text-sm leading-relaxed font-semibold">És uma mulher que quer uma renda própria ou alcançar a sua autonomia financeira.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#8B4513] font-bold shrink-0 mt-0.5">✔</span>
                  <span className="text-sm leading-relaxed font-semibold">Estás cansada de tentar coisas na Internet que não dão resultados reais ou palpáveis.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#8B4513] font-bold shrink-0 mt-0.5">✔</span>
                  <span className="text-sm leading-relaxed font-semibold">Tens algumas horas vagas por semana que gostarias de monetizar de forma produtiva.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#8B4513] font-bold shrink-0 mt-0.5">✔</span>
                  <span className="text-sm leading-relaxed font-semibold">És dona de casa, reformada, mãe, autónoma ou queres complementar o teu salário atual.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#8B4513] font-bold shrink-0 mt-0.5">✔</span>
                  <span className="text-sm leading-relaxed font-semibold">Estás disposta a abrir o método digital, ler as páginas e aplicar os passos simples apresentados.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#8B4513] font-bold shrink-0 mt-0.5">✔</span>
                  <span className="text-sm leading-relaxed font-semibold">Já alguma vez pensaste "eu gostava de ter o meu próprio dinheiro, só meu", mesmo que nunca tenhas feito nada a este respeito.</span>
                </li>
              </ul>
            </div>

            {/* Não é para ti */}
            <div className="md:col-span-12 lg:col-span-5 rounded-xl border border-red-200 bg-red-50/15 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-800 font-extrabold font-sans">✕</span>
                <h3 className="text-lg font-black text-[#1A1A1A] uppercase tracking-wide">Não é para ti:</h3>
              </div>
              
              <ul className="space-y-4 text-stone-750">
                <li className="flex items-start gap-2.5">
                  <span className="text-red-600 font-bold shrink-0 mt-0.5">✕</span>
                  <span className="text-sm leading-relaxed font-medium">Se achas que vais ficar rica numa semana sem fazer absolutamente nada.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-600 font-bold shrink-0 mt-0.5">✕</span>
                  <span className="text-sm leading-relaxed font-medium">Se apenas queres acumular métodos digitais sem intenção de os aplicar.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-600 font-bold shrink-0 mt-0.5">✕</span>
                  <span className="text-sm leading-relaxed font-medium">Se procuras truques ou uma fórmula mágica mirabolante rápida em vez de um método artesanal comprovado.</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="mt-12 text-center max-w-2xl mx-auto">
            <p className="text-sm sm:text-base italic text-zinc-650 font-semibold leading-relaxed">
              "Se te identificaste com pelo menos um ponto da lista acima, o método foi feito para ti. A única diferença entre as mulheres que começaram e as que ainda estão a pensar é esta página, e a decisão que tomas a seguir."
            </p>
          </div>

          <div className="mt-8 text-center">
            <motion.a 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={HOTMART_LINK}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md bg-[#16A34A] px-8 sm:px-10 py-4 text-center text-base font-bold text-white shadow-md transition-all duration-300 hover:bg-[#15803D] hover:shadow-xl hover:translate-y-[-1px]"
            >
              Sim, este método é para mim
              <ArrowRight className="h-5 w-5" />
            </motion.a>
          </div>

        </motion.div>
      </section>

      {/* 4. BLOCO DA AUTORA */}
      <section className="bg-white px-6 py-16 sm:px-8 sm:py-24" id="autora-section">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-[960px]"
        >
          
          <div className="grid gap-12 md:grid-cols-12 items-center">
            
            {/* Foto Autora */}
            <div className="md:col-span-4 order-2 md:order-1">
              <div className="relative mx-auto max-w-[260px]">
                {/* Board Mockup wrapper representing author profile */}
                <div className="absolute inset-0 bg-[#D4A574]/15 rounded-md transform -rotate-3 scale-105"></div>
                <div className="relative aspect-[4/5] w-full rounded-md overflow-hidden border-2 border-[#8B4513]/30 shadow-xl bg-[#F8F5F0]">
                  <img 
                    src="https://i.postimg.cc/QxsV7Lrz/image.png" 
                    alt="Maria João Silva" 
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            {/* Texto Autora */}
            <div className="md:col-span-8 order-1 md:order-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4A574] block mb-2">A HISTÓRIA POR TRÁS DO MÉTODO</span>
              <h2 className="font-serif text-3xl font-black text-[#1A1A1A] sm:text-4xl mb-4 leading-tight">
                Quem criou este método, e porquê
              </h2>
              <div className="h-[2px] w-12 bg-[#8B4513] mb-6"></div>

              <div className="space-y-4 text-zinc-650 leading-relaxed text-sm sm:text-base">
                <p className="italic">
                  "Houve um tempo em que pensava duas vezes antes de comprar um café. Que abria a carteira ao fim do mês e ficava em branco."
                </p>
                <p>
                  "Tentei de tudo. Trabalhei por conta de outrém, fui autónoma, vendi roupa em consignação. Até abrir um pequeno negócio que faliu em menos de um ano."
                </p>
                <p>
                  "Até ao dia em que descobri as bolsas artesanais, e um método europeu que ninguém em Portugal ainda usava da forma certa."
                </p>
                <p className="font-medium text-[#1A1A1A]">
                  "Hoje, mais de 800 mulheres já mudaram a sua situação financeira com o que aprendi e passei para a frente. Este método é o que eu gostaria de ter recebido na minha pior fase."
                </p>
              </div>
            </div>

          </div>

          <div className="mt-8 text-center">
            <motion.a 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={HOTMART_LINK}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md bg-[#16A34A] px-8 sm:px-10 py-4 text-center text-base font-bold text-white shadow-md transition-all duration-300 hover:bg-[#15803D] hover:shadow-xl hover:translate-y-[-1px]"
            >
              Quero o método da Maria João
              <ArrowRight className="h-5 w-5" />
            </motion.a>
          </div>

        </motion.div>
      </section>

      {/* 6. DEPOIMENTOS */}
      <section className="bg-[#F8F5F0] px-6 py-16 sm:px-8 sm:py-24" id="depoimentos-section">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-[960px]"
        >
          
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B4513]">PROVA REAL EM PORTUGAL</span>
            <h2 className="font-serif text-3xl font-black text-[#1A1A1A] sm:text-4xl mt-3">
              Vê o que mulheres como tu estão a conseguir
            </h2>
            <div className="mx-auto mt-5 h-[2px] w-12 bg-[#8B4513]"></div>
          </div>

          {/* Grid de Depoimentos */}
          <div className="grid gap-6 sm:grid-cols-2">
            
            {/* Depoimento 1 */}
            <div className="bg-white p-6 rounded-xl border border-[#D4A574]/30 shadow-md transition-all duration-300 hover:border-[#8B4513]/60 hover:shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current animate-pulse" />
                  ))}
                </div>
                <p className="text-zinc-700 text-sm leading-relaxed mb-4 italic font-medium">
                  "Logo na primeira semana já tinha a minha primeira bolsa pronta. Três meses depois nem reconheço a minha vida. Estou a vender todos os dias."
                </p>
              </div>
              <div className="border-t border-zinc-100 pt-3 mt-2 flex items-center justify-between">
                <span className="text-xs font-extrabold text-zinc-900 uppercase">Ana</span>
                <span className="text-[9px] uppercase font-bold text-[#8B4513] tracking-widest bg-[#8B4513]/5 border border-[#8B4513]/25 px-2.5 py-0.5">Compradora Verificada</span>
              </div>
            </div>

            {/* Depoimento 2 */}
            <div className="bg-white p-6 rounded-xl border border-[#D4A574]/30 shadow-md transition-all duration-300 hover:border-[#8B4513]/60 hover:shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current animate-pulse" />
                  ))}
                </div>
                <p className="text-zinc-700 text-sm leading-relaxed mb-4 italic font-medium">
                  "Vendi uma bolsa por €80 que custou menos de €5 a fazer. Foi quando percebi que o método tinha mudado tudo para mim."
                </p>
              </div>
              <div className="border-t border-zinc-100 pt-3 mt-2 flex items-center justify-between">
                <span className="text-xs font-extrabold text-zinc-900 uppercase">Marta</span>
                <span className="text-[9px] uppercase font-bold text-[#8B4513] tracking-widest bg-[#8B4513]/5 border border-[#8B4513]/25 px-2.5 py-0.5">Compradora Verificada</span>
              </div>
            </div>

            {/* Depoimento 3 */}
            <div className="bg-white p-6 rounded-xl border border-[#D4A574]/30 shadow-md transition-all duration-300 hover:border-[#8B4513]/60 hover:shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current animate-pulse" />
                  ))}
                </div>
                <p className="text-zinc-700 text-sm leading-relaxed mb-4 italic font-medium">
                  "Tinha 58 anos e ninguém me dava emprego. Este método devolveu-me a autonomia financeira numa idade em que já tinha desistido."
                </p>
              </div>
              <div className="border-t border-zinc-100 pt-3 mt-2 flex items-center justify-between">
                <span className="text-xs font-extrabold text-zinc-900 uppercase">Conceição, 58 anos</span>
                <span className="text-[9px] uppercase font-bold text-[#8B4513] tracking-widest bg-[#8B4513]/5 border border-[#8B4513]/25 px-2.5 py-0.5">Autonomia Financeira</span>
              </div>
            </div>

            {/* Depoimento 4 */}
            <div className="bg-white p-6 rounded-xl border border-[#D4A574]/30 shadow-md transition-all duration-300 hover:border-[#8B4513]/60 hover:shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current animate-pulse" />
                  ))}
                </div>
                <p className="text-zinc-700 text-sm leading-relaxed mb-4 italic font-medium">
                  "Este ano, com o dinheiro que comecei a ganhar com as bolsas, fiz a viagem que sempre sonhei. Nunca pensei que fosse possível."
                </p>
              </div>
              <div className="border-t border-zinc-100 pt-3 mt-2 flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#1A1A1A] uppercase">Fátima</span>
                <span className="text-[9px] uppercase font-bold text-[#8B4513] tracking-widest bg-[#8B4513]/5 border border-[#8B4513]/25 px-2.5 py-0.5">Resultado Verificado</span>
              </div>
            </div>

          </div>

          <div className="mt-8 text-center">
            <motion.a 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={HOTMART_LINK}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md bg-[#16A34A] px-8 sm:px-10 py-4 text-center text-base font-bold text-white shadow-md transition-all duration-300 hover:bg-[#15803D] hover:shadow-xl hover:translate-y-[-1px]"
            >
              Quero resultados como estes
              <ArrowRight className="h-5 w-5" />
            </motion.a>
          </div>

        </motion.div>
      </section>

      {/* SEÇÃO DE PROVA SOCIAL VISUAL */}
      <section className="bg-[#F8F5F0] px-6 py-16 sm:px-8 sm:py-24" id="bolsas-feitas-portfolio">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-[960px]"
        >
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B4513]">PROVA DE SUCESSO DE PORTUGAL</span>
            <h2 className="font-serif text-3xl font-black text-[#1A1A1A] sm:text-4xl mt-3">
              Bolsas feitas com o método — vendidas em Portugal
            </h2>
            <div className="mx-auto mt-5 h-[2px] w-12 bg-[#8B4513]"></div>
          </div>

          {/* Grid de 6 cards */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 */}
            <motion.div 
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.07)] overflow-hidden flex flex-col border border-zinc-200/40"
            >
              <div className="h-[200px] relative overflow-hidden bg-zinc-50">
                <img 
                  src="https://i.postimg.cc/T1rrdrXR/2d7f3ec787ca5ae6013fcd2a58fc914d.jpg" 
                  alt="Ana · Porto" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 flex flex-col gap-1 text-left pb-4 px-[14px]">
                <span className="text-[14px] font-bold text-[#1A1A1A]">Ana · Porto</span>
                <span className="text-[16px] font-semibold text-[#8B4513]">Vendida por €85</span>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.07)] overflow-hidden flex flex-col border border-zinc-200/40"
            >
              <div className="h-[200px] relative overflow-hidden bg-zinc-50">
                <img 
                  src="https://i.postimg.cc/26WWG4yv/fa69d4e6fc1d76c1bb4e4326da207f7e.jpg" 
                  alt="Conceição · Braga" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 flex flex-col gap-1 text-left pb-4 px-[14px]">
                <span className="text-[14px] font-bold text-[#1A1A1A]">Conceição · Braga</span>
                <span className="text-[16px] font-semibold text-[#8B4513]">Vendida por €60</span>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.07)] overflow-hidden flex flex-col border border-zinc-200/40"
            >
              <div className="h-[200px] relative overflow-hidden bg-zinc-50">
                <img 
                  src="https://i.postimg.cc/3xbDHLDK/4e2aae93dcf73e6e4bc2435d36f2ba29.jpg" 
                  alt="Marta · Lisboa" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 flex flex-col gap-1 text-left pb-4 px-[14px]">
                <span className="text-[14px] font-bold text-[#1A1A1A]">Marta · Lisboa</span>
                <span className="text-[16px] font-semibold text-[#8B4513]">Vendida por €95</span>
              </div>
            </motion.div>

            {/* Card 4 */}
            <motion.div 
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.07)] overflow-hidden flex flex-col border border-zinc-200/40"
            >
              <div className="h-[200px] relative overflow-hidden bg-zinc-50">
                <img 
                  src="https://i.postimg.cc/CxdzJj6Z/9dde040bdf4a1b330d6e4d29f052f608.jpg" 
                  alt="Filomena · Coimbra" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 flex flex-col gap-1 text-left pb-4 px-[14px]">
                <span className="text-[14px] font-bold text-[#1A1A1A]">Filomena · Coimbra</span>
                <span className="text-[16px] font-semibold text-[#8B4513]">Vendida por €70</span>
              </div>
            </motion.div>

            {/* Card 5 */}
            <motion.div 
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.07)] overflow-hidden flex flex-col border border-zinc-200/40"
            >
              <div className="h-[200px] relative overflow-hidden bg-zinc-50">
                <img 
                  src="https://i.postimg.cc/dV7VGJLh/f6218e1e03f855d2ac6f005bd7a4b7e8.jpg" 
                  alt="Sandra · Setúbal" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 flex flex-col gap-1 text-left pb-4 px-[14px]">
                <span className="text-[14px] font-bold text-[#1A1A1A]">Sandra · Setúbal</span>
                <span className="text-[16px] font-semibold text-[#8B4513]">Vendida por €80</span>
              </div>
            </motion.div>

            {/* Card 6 */}
            <motion.div 
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.07)] overflow-hidden flex flex-col border border-zinc-200/40"
            >
              <div className="h-[200px] relative overflow-hidden bg-zinc-50">
                <img 
                  src="https://i.postimg.cc/gjkYjWCb/d2765fdc2e6b7ddb8c4ccf995a61a7be.jpg" 
                  alt="Teresa · Aveiro" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 flex flex-col gap-1 text-left pb-4 px-[14px]">
                <span className="text-[14px] font-bold text-[#1A1A1A]">Teresa · Aveiro</span>
                <span className="text-[16px] font-semibold text-[#8B4513]">Vendida por €65</span>
              </div>
            </motion.div>
          </div>

          <div className="text-center mt-6">
            <p className="text-[15px] italic text-[#666666] mt-6">
              "Estas bolsas foram feitas com o método. A próxima pode ser tua."
            </p>
          </div>

          <div className="mt-8 text-center">
            <motion.a 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={HOTMART_LINK}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md bg-[#16A34A] px-8 sm:px-10 py-4 text-center text-base font-bold text-white shadow-md transition-all duration-300 hover:bg-[#15803D] hover:shadow-xl hover:translate-y-[-1px]"
            >
              Quero fazer bolsas como estas
              <ArrowRight className="h-5 w-5" />
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* 12. CTA FINAL */}
      <section className="bg-zinc-950 px-6 py-16 text-white sm:px-8 sm:py-24 border-t-2 border-[#8B4513]" id="oferta-cta-final">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-[960px] text-center"
        >
          
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4A574] inline-block mb-3">O TEU INVESTIMENTO</span>
          <h2 className="font-serif text-3xl font-black leading-tight tracking-tight sm:text-4xl max-w-xl mx-auto mb-4 text-white">
            Tudo o que recebes — por apenas €7,90
          </h2>
          <div className="max-w-xl mx-auto text-left bg-zinc-900 border-2 border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 mb-8 mt-8 shadow-2xl relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex justify-between items-center gap-4 text-xs sm:text-sm font-medium border-b border-zinc-800/40 pb-2.5">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>O Segredo das Bolsas: método digital completo</span>
                </div>
                <span className="text-zinc-400 font-mono">€19</span>
              </div>
              <div className="flex justify-between items-center gap-4 text-xs sm:text-sm font-medium border-b border-zinc-800/40 pb-2.5">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>6 capítulos · 500+ modelos europeus e exclusivos</span>
                </div>
                <span className="text-zinc-500 text-xs font-semibold">incluído</span>
              </div>
              <div className="flex justify-between items-center gap-4 text-xs sm:text-sm font-medium border-b border-zinc-800/40 pb-2.5">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Método Express: primeira bolsa pronta hoje</span>
                </div>
                <span className="text-zinc-500 text-xs font-semibold">incluído</span>
              </div>
              <div className="flex justify-between items-center gap-4 text-xs sm:text-sm font-medium border-b border-zinc-800/40 pb-2.5">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Protocolo Antifalhas: erro zero na primeira tentativa</span>
                </div>
                <span className="text-zinc-500 text-xs font-semibold">incluído</span>
              </div>
              <div className="flex justify-between items-center gap-4 text-xs sm:text-sm font-medium border-b border-zinc-800/40 pb-2.5">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Bónus 1: Lista de Fornecedores PT e ES</span>
                </div>
                <span className="text-zinc-400 font-mono">€19</span>
              </div>
              <div className="flex justify-between items-center gap-4 text-xs sm:text-sm font-medium border-b border-zinc-800/40 pb-2.5">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Bónus 2: Guia de Preços e Lucros</span>
                </div>
                <span className="text-zinc-400 font-mono">€12</span>
              </div>
              <div className="flex justify-between items-center gap-4 text-xs sm:text-sm font-medium border-b border-zinc-800/40 pb-2.5">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Bónus 3: Roteiro de Vendas pelo WhatsApp</span>
                </div>
                <span className="text-zinc-400 font-mono">€17</span>
              </div>
              <div className="flex justify-between items-center gap-4 text-xs sm:text-sm font-medium pb-1">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Bónus 4: Calendário de Procura Anual</span>
                </div>
                <span className="text-zinc-400 font-mono">€9</span>
              </div>
            </div>

            <div className="border-t border-zinc-800/60 my-6"></div>

            <div className="text-center mb-6">
              <p className="text-zinc-500 text-xs sm:text-sm font-bold tracking-wide uppercase mb-1">
                Valor total: <del style={{ color: "#999999" }}>€76</del>
              </p>
              <p className="font-serif text-4xl sm:text-5xl font-black text-[#D4A574] leading-tight mb-2">
                Hoje por apenas <span className="text-[#16A34A]">€7,90</span>
              </p>
              <p className="text-zinc-400 text-xs sm:text-sm font-semibold tracking-wide">
                Pagamento único. Sem mensalidades. Acesso imediato e vitalício.
              </p>
            </div>

            <div className="max-w-md mx-auto mb-6">
              <motion.a 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={HOTMART_LINK} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#16A34A] px-6 py-4 text-center text-base font-black uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#15803D] hover:shadow-[0_0_20px_rgba(22,163,74,0.3)] focus:outline-none"
                id="final-cta-button"
              >
                Quero tudo isto, acesso imediato
              </motion.a>
            </div>

            <div className="text-zinc-400 text-[10px] sm:text-xs font-semibold tracking-wider flex flex-wrap justify-center items-center gap-x-2 gap-y-1">
              <span>Pagamento seguro</span>
              <span>•</span>
              <span>MB Way</span>
              <span>•</span>
              <span>Cartão bancário</span>
              <span>•</span>
              <span>PayPal</span>
              <span>•</span>
              <span>Garantia de 7 dias</span>
            </div>
          </div>

          {/* BLOCO DE GARANTIA */}
          <div className="max-w-xl mx-auto bg-zinc-900 border-2 border-[#D4A574]/40 rounded-2xl p-6 sm:p-8 text-left mb-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#D4A574]/60"></div>
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="h-6 w-6 text-[#D4A574] shrink-0" />
              <h4 className="text-base sm:text-lg font-black text-white">Garantia total de 7 dias</h4>
            </div>
            <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-semibold">
              Se acederes ao método, seguires os passos, e achares que não é para ti, devolvo-te 100% do valor pago. Sem perguntas, sem burocracia. O risco é completamente meu.
            </p>
          </div>

          <p className="text-zinc-500 text-xs sm:text-sm italic font-semibold max-w-lg mx-auto leading-relaxed">
            "Já vendeste uma bolsa? Pagaste o método e ainda sobra. Se não venderes nenhuma, eu devolvo-te o dinheiro. É assim tão simples."
          </p>

        </motion.div>
      </section>



      {/* 13. RODAPÉ */}
      <footer className="bg-zinc-900 px-6 py-12 text-zinc-400 border-t border-zinc-805" id="main-footer">
        <div className="mx-auto max-w-[960px]">
          <div className="text-center">
            <p className="text-[10px] text-zinc-500">
              © {new Date().getFullYear()} O Segredo das Bolsas. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* AUXILIARY COMPLIANCE MODALS (Overlays de Privacidade/Termos/Contacto) */}
      <AnimatePresence>
        {activeModal && (
          <section className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-stone-950/70"
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white p-6 sm:p-8 shadow-2xl z-10 border border-zinc-200"
            >
              <button 
                onClick={() => setActiveModal(null)}
                className="absolute right-4 top-4 text-zinc-400 hover:text-zinc-600 p-1"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="max-h-[70vh] overflow-y-auto pr-2 mt-2">
                
                {activeModal === "privicidade" && (
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-zinc-900 mb-4">Política de Privacidade</h3>
                    <div className="space-y-4 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                      <p>A tua privacidade é de extrema relevância para nós. Respeitamos a privacidade em relação a qualquer informação tua que possamos recolher.</p>
                      <p>Solicitamos informações pessoais apenas quando realmente precisamos delas para te fornecer o acesso seguro ao material digital. Fazemo-lo por meios justos e legais, com o teu total conhecimento e consentimento informado.</p>
                      <p>Não partilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido estritamente por lei em vigor.</p>
                      <p>Os pagamentos são processados em plataformas externas seguras cifradas com SSL (Hotmart). Não guardamos os teus dados bancários ou cartões nos nossos sistemas.</p>
                    </div>
                  </div>
                )}

                {activeModal === "termos" && (
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-zinc-900 mb-4">Termos e Condições</h3>
                    <div className="space-y-4 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                      <p>Ao acederes ao método digital O Segredo das Bolsas, concordas em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis.</p>
                      <p>O conteúdo deste método, incluindo textos, moldes, fornecedores e estratégias comerciais, está protegido por leis de direitos de autor aplicáveis.</p>
                      <p>A licença fornecida após a compra é estritamente de caráter pessoal e intransmissível. É terminantemente proibido piratear, partilhar ou revender os ficheiros PDF sem autorização por escrito dos detentores legais.</p>
                    </div>
                  </div>
                )}

                {activeModal === "contacto" && (
                  <div className="text-center py-6">
                    <h3 className="font-serif text-2xl font-bold text-zinc-900 mb-3">Contacto Comercial</h3>
                    <p className="text-sm text-zinc-650 max-w-md mx-auto mb-6">
                      Tens alguma dúvida em relação ao teu acesso, acompanhamento ou fornecimento? A nossa equipa de apoio em Portugal está pronta para te responder!
                    </p>
                    <div className="mx-auto max-w-sm space-y-3 pt-4 border-t border-zinc-150">
                      <div className="flex items-center justify-center gap-3 text-zinc-700">
                        <Mail className="h-5 w-5 text-primary" />
                        <span className="text-sm font-semibold">suporte@osegredodasbolsas.pt</span>
                      </div>
                      <div className="flex items-center justify-center gap-3 text-zinc-700">
                        <Phone className="h-5 w-5 text-primary" />
                        <span className="text-sm font-semibold">+351 912 345 678 (WhatsApp pós-venda)</span>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              <div className="mt-6 pt-4 border-t border-zinc-100 flex justify-end">
                <button 
                  onClick={() => setActiveModal(null)}
                  className="rounded-lg bg-zinc-100 hover:bg-zinc-200 px-5 py-2 text-xs font-semibold text-zinc-700 transition-colors"
                >
                  Fechar Janela
                </button>
              </div>
            </motion.div>
          </section>
        )}
      </AnimatePresence>

    </div>
  );
}
