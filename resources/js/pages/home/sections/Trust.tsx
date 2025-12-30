export default function Trust() {
    return (
        <section className="relative py-12 border-t border-slate-200 dark:border-white/10 bg-gradient-to-b from-green-50/50 to-emerald-50/30 dark:from-green-950/20 dark:to-emerald-950/10 backdrop-blur-sm overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/10 blur-[100px] dark:bg-green-500/5" />
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 text-center">
                    <div className="space-y-1">
                        <h4 className="text-2xl font-bold text-gray-900 dark:text-white">%100</h4>
                        <p className="text-sm text-gray-500 uppercase tracking-wider">Tarafsız</p>
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-2xl font-bold text-gray-900 dark:text-white">0</h4>
                        <p className="text-sm text-gray-500 uppercase tracking-wider">Ücretli Sıralama</p>
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-2xl font-bold text-gray-900 dark:text-white">50+</h4>
                        <p className="text-sm text-gray-500 uppercase tracking-wider">Veri Noktası</p>
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-2xl font-bold text-gray-900 dark:text-white">Ücretsiz</h4>
                        <p className="text-sm text-gray-500 uppercase tracking-wider">Girişimciler İçin</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
