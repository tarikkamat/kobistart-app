import LandingLayout from '@/layouts/LandingLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Platform } from '@/types';
import CallToAction from './sections/CallToAction';
import Comparison from './sections/Comparison';
import Hero from './sections/Hero';
import HowItWorks from './sections/HowItWorks';
import Problem from './sections/Problem';
import Recommendation from './sections/Recommendation';
import Trust from './sections/Trust';

interface PageProps extends Record<string, unknown> {
    platforms: Platform[];
    canRegister: boolean;
}

export default function Home() {
    const { platforms } = usePage<PageProps>().props;
    const [selectedItems, setSelectedItems] = useState<{ platform: string, plan: string }[]>([]);

    return (
        <LandingLayout>
            <Head title="KobiStart - Intelligent SaaS Recommendations" />

            <Hero
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
                platforms={platforms}
            />
            <Problem />
            <HowItWorks />
            <Recommendation />
            <Comparison selectedItems={selectedItems} />
            <Trust />
            <CallToAction />
        </LandingLayout>
    );
}
