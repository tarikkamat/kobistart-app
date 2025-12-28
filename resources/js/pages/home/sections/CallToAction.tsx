import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CallToAction() {
    return (
        <section className="relative py-24 bg-white dark:bg-transparent">
            <div className="container mx-auto px-4">
                <div className="relative overflow-hidden rounded-3xl bg-gray-900 px-6 py-16 text-center shadow-2xl md:px-12 md:py-20 dark:bg-white/5 dark:ring-1 dark:ring-white/10">
                    {/* Decorative background elements */}
                    <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-[100px]" />
                    <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-[100px]" />

                    <div className="relative z-10">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400 ring-1 ring-inset ring-blue-500/20">
                            <Sparkles className="h-4 w-4" />
                            <span>Ready to scale?</span>
                        </div>

                        <h2 className="mb-6 text-3xl font-bold tracking-tight text-white md:text-5xl">
                            Stop guessing. <br className="hidden sm:block" />
                            Start choosing with confidence.
                        </h2>

                        <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-400">
                            Join hundreds of founders who saved weeks of research and thousands of dollars by picking the right stack first.
                        </p>

                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Button
                                size="lg"
                                className="group h-14 rounded-full bg-blue-600 px-8 text-lg font-semibold text-white shadow-lg transition-all hover:bg-blue-500 hover:shadow-blue-500/25"
                            >
                                Find My Best Platform
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
