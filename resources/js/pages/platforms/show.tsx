import LandingLayout from '@/layouts/LandingLayout';
import { Head, usePage } from '@inertiajs/react';
import { Platform, Plan } from '@/types';
import PlatformHeader from './sections/PlatformHeader';
import PlansSection from './sections/PlansSection';

interface PageProps extends Record<string, unknown> {
    platform: Platform;
    plans: Plan[];
}

export default function PlatformShow() {
    const { platform, plans } = usePage<PageProps>().props;

    return (
        <LandingLayout>
            <Head title={`${platform.name} - KobiStart`} />

            <PlatformHeader platform={platform} />
            <PlansSection plans={plans} />
        </LandingLayout>
    );
}

