import { Sparkles } from 'lucide-react';

export default function UnifiedCTA() {
    return (
        <section className="py-12 bg-slate-50 dark:bg-black overflow-hidden flex items-center justify-center min-h-[600px]">
            <div className="container mx-auto px-4">
                {/* Ana Konteyner */}
                <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-[#0B0F19] ring-1 ring-white/10 shadow-2xl">
                    <style>
                        {`
              /* Akış Animasyonları */
              /* flowIn: Yukarıdan merkeze geliş (Negatif offset çeker) */
              @keyframes flowIn { to { stroke-dashoffset: -1000; } }

              /* flowDown: Merkezden aşağıya gidiş (DÜZELTİLDİ: Negatif offset başlangıçtan bitişe çeker) */
              @keyframes flowDown { to { stroke-dashoffset: -1000; } }

              /* Logo Işığı */
              @keyframes pulseGlow {
                0%, 100% { opacity: 0.2; transform: scale(0.95); }
                50% { opacity: 0.5; transform: scale(1.1); }
              }

              .animate-flow-in {
                stroke-dasharray: 20 150;
                animation: flowIn 4s linear infinite;
              }

              .animate-flow-down {
                stroke-dasharray: 25 180; /* Daha belirgin çizgiler */
                animation: flowDown 2.5s linear infinite; /* Biraz daha hızlı akış */
              }
            `}
                    </style>

                    {/* Arka plan ışıkları */}
                    <div className="absolute top-[-20%] left-[20%] w-[60%] h-[40%] bg-blue-600/10 blur-[100px] rounded-full" />

                    <div className="relative z-10 flex flex-col items-center pt-12 pb-12">

                        {/* Header */}
                        <div className="text-center px-6 mb-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-4">
                                <Sparkles className="w-3 h-3" />
                                <span>KobiStart Sizin İçin Seçiyor</span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                                İşiniz İçin{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                                    En Doğru Platformu
                                </span>{' '}
                                Yapay Zeka Seçsin
                            </h2>

                            <p className="mt-4 mx-auto max-w-2xl text-sm md:text-base text-slate-400 text-center">
                                <span className="text-white font-medium">Platform Öneri Sihirbazı</span>, iş modelinizi analiz eder,
                                yüzlerce özelliği ve fiyat planını karşılaştırır ve
                                <span className="text-white font-medium"> sizin için en yüksek uyuma sahip platformu</span> otomatik olarak önerir.
                            </p>
                        </div>
                        {/* Visual Flow Area */}
                        <div className="relative w-full h-[400px] max-w-[800px]">

                            {/* SVG Katmanı */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 400" fill="none">
                                <defs>
                                    {/* Aşağı akış için gradyan - Bitişte (offset 100%) opaklık sıfırlanıyor ki yazıya çarpıp kaybolsun */}
                                    <linearGradient id="line-grad-down" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
                                        <stop offset="80%" stopColor="#3B82F6" stopOpacity="0.8" />
                                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                                    </linearGradient>
                                </defs>

                                {/* --- ÜST SABİT ÇİZGİLER (Platformlardan Logoya) --- */}
                                {/* Hedef Nokta (Logo Merkezi): X=400, Y=180 */}
                                <g stroke="#3B82F6" strokeWidth="1" strokeOpacity="0.2">
                                    <path d="M120 40 C 120 120, 400 100, 400 180" />
                                    <path d="M306 40 C 306 120, 400 100, 400 180" />
                                    <path d="M494 40 C 494 120, 400 100, 400 180" />
                                    <path d="M680 40 C 680 120, 400 100, 400 180" />
                                </g>

                                {/* ÜST HAREKETLİ IŞIKLAR (Üstten Logoya) */}
                                <g stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" className="opacity-60">
                                    <path d="M120 40 C 120 120, 400 100, 400 180" className="animate-flow-in" />
                                    <path d="M306 40 C 306 120, 400 100, 400 180" className="animate-flow-in" style={{ animationDelay: '0.5s' }} />
                                    <path d="M494 40 C 494 120, 400 100, 400 180" className="animate-flow-in" style={{ animationDelay: '1.0s' }} />
                                    <path d="M680 40 C 680 120, 400 100, 400 180" className="animate-flow-in" style={{ animationDelay: '1.5s' }} />
                                </g>

                                {/* --- ALT SABİT ÇİZGİLER (EKLENDİ: Görünürlük için) --- */}
                                {/* Merkezden (400,180) aşağı hedeflere (Y=290) */}
                                <g stroke="#3B82F6" strokeWidth="1" strokeOpacity="0.2">
                                    {/* Sol yörünge */}
                                    <path d="M400 180 C 400 240, 250 220, 250 290" />
                                    {/* Sağ yörünge */}
                                    <path d="M400 180 C 400 240, 550 220, 550 290" />
                                </g>

                                {/* --- ALT HAREKETLİ IŞIKLAR (Logodan Sonuçlara) --- */}
                                <g stroke="url(#line-grad-down)" strokeWidth="2" strokeLinecap="round">
                                    {/* Sol yörünge */}
                                    <path d="M400 180 C 400 240, 250 220, 250 290" className="animate-flow-down" />
                                    {/* Sağ yörünge */}
                                    <path d="M400 180 C 400 240, 550 220, 550 290" className="animate-flow-down" style={{ animationDelay: '0.8s' }} />
                                </g>
                            </svg>

                            {/* 1. ÜST ETİKETLER */}
                            <div className="absolute top-0 w-full h-10">
                                <span className="absolute left-[15%] -translate-x-1/2 text-[10px] font-bold tracking-widest text-slate-600 uppercase">Shopify</span>
                                <span className="absolute left-[38.25%] -translate-x-1/2 text-[10px] font-bold tracking-widest text-slate-600 uppercase">Ticimax</span>
                                <span className="absolute left-[61.75%] -translate-x-1/2 text-[10px] font-bold tracking-widest text-slate-600 uppercase">Ideasoft</span>
                                <span className="absolute left-[85%] -translate-x-1/2 text-[10px] font-bold tracking-widest text-slate-600 uppercase">Magento</span>
                            </div>

                            {/* 2. MERKEZ LOGO */}
                            <div className="absolute top-[180px] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                                <div className="absolute inset-[-20px] bg-blue-500/30 rounded-full blur-2xl animate-[pulseGlow_3s_infinite]" />
                                <div className="relative flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-lg ring-4 ring-[#0B0F19]">
                                    <div className="flex flex-col gap-1 rotate-12 transform scale-75">
                                        <div className="h-1 w-5 rounded-full bg-white/40" />
                                        <div className="h-1 w-8 rounded-full bg-white" />
                                        <div className="h-1 w-5 rounded-full bg-white/60" />
                                    </div>
                                </div>
                            </div>

                            {/* 3. ALT SONUÇLAR (Minimalist: Logo - Uyum Oranı) */}
                            {/* SVG hedeflerinin (Y=290) hemen altına yerleştirildi */}
                            <div className="absolute top-[295px] w-full flex justify-center gap-16 px-4">

                                {/* Sol Sonuç (WooCommerce) - X: 250 hizası */}
                                <div className="flex items-center gap-3 relative group">
                                    {/* Hafif bir hover efekti için arka plan ışığı (isteğe bağlı) */}
                                    <div className="absolute -inset-2 bg-indigo-500/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />

                                    {/* İkon */}
                                    <div className="relative h-9 w-9 rounded-md bg-indigo-500/20 ring-1 ring-indigo-500/30 flex items-center justify-center text-indigo-300 font-bold">W</div>
                                    {/* Metin */}
                                    <div className="relative flex items-baseline gap-2">
                                        <h3 className="text-white text-sm font-semibold">WooCommerce</h3>
                                        <span className="text-slate-600 text-xs">-</span>
                                        <span className="text-emerald-400 text-sm font-bold">%92 Uyum</span>
                                    </div>
                                </div>

                                {/* Sağ Sonuç (Shopify) - X: 550 hizası */}
                                <div className="flex items-center gap-3 relative opacity-50 grayscale group hover:grayscale-0 hover:opacity-100 transition duration-300">
                                    {/* İkon */}
                                    <div className="h-9 w-9 rounded-md bg-slate-700/50 ring-1 ring-slate-700/50 flex items-center justify-center text-slate-300 font-bold">S</div>
                                    {/* Metin */}
                                    <div className="flex items-baseline gap-2">
                                        <h3 className="text-slate-300 text-sm font-semibold">Shopify</h3>
                                        <span className="text-slate-600 text-xs">-</span>
                                        <span className="text-slate-400 text-sm font-bold">%62 Uyum</span>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
