import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    PolarAngleAxis,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadarChart,
    ResponsiveContainer,
} from 'recharts';
import { BarChart3 } from 'lucide-react';

interface Props {
    // No props needed for dummy data
}

export default function CapabilitiesSection({}: Props) {
    const data = [
        { subject: 'Kullanım Kolaylığı', A: 9, fullMark: 10 },
        { subject: 'Destek', A: 8, fullMark: 10 },
        { subject: 'Özellikler', A: 9, fullMark: 10 },
        { subject: 'Fiyat/Perf.', A: 8, fullMark: 10 },
        { subject: 'Entegrasyon', A: 7, fullMark: 10 },
        { subject: 'Özelleştirme', A: 8, fullMark: 10 },
    ];

    return (
        <Card className="overflow-hidden border-zinc-200 shadow-sm dark:border-zinc-800">
            <CardHeader className="border-b border-zinc-100 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/50">
                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                    <BarChart3 className="h-4 w-4 text-blue-600" />
                    Platform Yetenekleri
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart
                            cx="50%"
                            cy="50%"
                            outerRadius="80%"
                            data={data}
                        >
                            <PolarGrid
                                stroke="currentColor"
                                className="text-zinc-200 dark:text-zinc-800"
                            />
                            <PolarAngleAxis
                                dataKey="subject"
                                tick={{
                                    fill: 'currentColor',
                                    fontSize: 10,
                                    fontWeight: 500,
                                }}
                                className="text-zinc-500 dark:text-zinc-400"
                            />
                            <PolarRadiusAxis
                                angle={30}
                                domain={[0, 10]}
                                tick={false}
                                axisLine={false}
                            />
                            <Radar
                                name="Capabilities"
                                dataKey="A"
                                stroke="#2563eb"
                                fill="#3b82f6"
                                fillOpacity={0.4}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900/50">
                        <span className="block text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
                            Lider Özellik
                        </span>
                        <span className="block text-sm font-bold text-zinc-900 dark:text-zinc-50">
                            Kolay Kurulum
                        </span>
                    </div>
                    <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900/50">
                        <span className="block text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
                            Hız
                        </span>
                        <span className="block text-sm font-bold text-zinc-900 dark:text-zinc-50">
                            Yüksek Performans
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
