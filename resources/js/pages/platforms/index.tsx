import LandingLayout from '@/layouts/LandingLayout';
import { Platform } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import PlatformGrid from './sections/PlatformGrid';

interface PageProps extends Record<string, unknown> {
    platforms: Platform[];
}

export default function PlatformsIndex() {
    const { platforms } = usePage<PageProps>().props;

    return (
        <LandingLayout>
            <Head title="Platformlar - KobiStart" />

            <PlatformGrid platforms={platforms} />
        </LandingLayout>
    );
}
