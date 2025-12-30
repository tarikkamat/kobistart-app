import LandingLayout from '@/layouts/LandingLayout';
import { Head, usePage } from '@inertiajs/react';
import { Platform, Plan, Comment, User } from '@/types';
import PlatformHeader from './sections/PlatformHeader';
import PlansSection from './sections/PlansSection';
import CapabilitiesSection from './sections/CapabilitiesSection';
import CommentsSection from './sections/CommentsSection';

interface PageProps extends Record<string, unknown> {
    platform: Platform;
    plans: Plan[];
}

export default function PlatformShow() {
    const { platform, plans } = usePage<PageProps>().props;

    // Type assertion for comments since we know they are loaded but types might need adjustment
    const comments = (platform.comments || []) as (Comment & { user: User })[];

    return (
        <LandingLayout>
            <Head title={`${platform.name} - KobiStart`} />

            <PlatformHeader platform={platform} />

            <div className="container mx-auto px-4 py-8 space-y-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-12">
                        <PlansSection plans={plans} />
                        <CommentsSection platform={platform} comments={comments} />
                    </div>

                    {/* Sidebar Area */}
                    <div className="space-y-8">
                        <CapabilitiesSection />
                        {/* We can add more widgets here later like "Similar Platforms" etc */}
                    </div>
                </div>
            </div>
        </LandingLayout>
    );
}

