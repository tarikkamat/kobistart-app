import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function CallToAction() {
    return (
        <section className="relative overflow-hidden py-24 text-center">
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-blue-50 to-transparent dark:from-blue-900/20" />

            <div className="container mx-auto px-4">
                <h2 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl dark:text-white">
                    Stop guessing. <br className="hidden sm:block" />
                    Start choosing with confidence.
                </h2>
                <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                    Join hundreds of founders who saved weeks of research and thousands of dollars by picking the right stack first.
                </p>
                <Button
                    size="lg"
                    className="h-14 rounded-full bg-gray-900 px-8 text-lg font-semibold shadow-xl hover:bg-black dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                >
                    Find My Best Platform
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </div>
        </section>
    );
}
