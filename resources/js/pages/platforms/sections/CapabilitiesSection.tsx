import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Platform } from '@/types';
import {
    PolarAngleAxis,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadarChart,
    ResponsiveContainer,
} from 'recharts';

interface Props {
    // No props needed for dummy data
}

export default function CapabilitiesSection({ }: Props) {
    const data = [
        { subject: 'Kullanım Kolaylığı', A: 9, fullMark: 10 },
        { subject: 'Destek', A: 8, fullMark: 10 },
        { subject: 'Özellikler', A: 9, fullMark: 10 },
        { subject: 'Fiyat/Perf.', A: 8, fullMark: 10 },
        { subject: 'Entegrasyon', A: 7, fullMark: 10 },
        { subject: 'Özelleştirme', A: 8, fullMark: 10 },
    ];

    return (
        <Card className="h-full border-none bg-white/40 shadow-sm backdrop-blur-md dark:bg-zinc-900/40">
            <CardHeader>
                <CardTitle>Platform Yetenekleri</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                            <PolarGrid stroke="currentColor" className="text-zinc-300 dark:text-zinc-700" />
                            <PolarAngleAxis
                                dataKey="subject"
                                tick={{ fill: 'currentColor', fontSize: 12 }}
                                className="text-zinc-600 dark:text-zinc-400"
                            />
                            <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
                            <Radar
                                name="Capabilities"
                                dataKey="A"
                                stroke="#2563eb"
                                fill="#3b82f6"
                                fillOpacity={0.5}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
