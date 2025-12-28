import LandingLayout from '@/layouts/LandingLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import CallToAction from './sections/CallToAction';
import Comparison from './sections/Comparison';
import Hero from './sections/Hero';
import HowItWorks from './sections/HowItWorks';
import Problem from './sections/Problem';
import Recommendation from './sections/Recommendation';
import Trust from './sections/Trust';

export default function Home() {
    const [selectedItems, setSelectedItems] = useState<{ platform: string, plan: string }[]>([]);

    return (
        <LandingLayout>
            <Head title="KobiStart - Intelligent SaaS Recommendations" />

            <Hero selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
            <Problem />
            <HowItWorks />
            <Recommendation />
            <Comparison selectedItems={selectedItems} />
            <Trust />
            <CallToAction />
        </LandingLayout>
    );
}
