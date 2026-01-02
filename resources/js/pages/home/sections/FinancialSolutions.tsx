import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { ArrowUpRight } from 'lucide-react';

const solutions = [
    {
        title: "50.000 TL'ye varan %0 faizli taksitli ticari kredi fırsatı!",
        description: 'Yeni müşterilere özel',
        image: 'https://placehold.co/600x300/ff0000/ffffff?text=AKBANK',
        brand: 'AKBANK',
        link: '#',
    },
    {
        title: "KOBİ'lere özel %0 faizli 90.000 TL'ye varan nakit fırsatı!",
        description: 'Yeni müşterilere özel',
        image: 'https://placehold.co/600x300/003366/ffffff?text=DenizBank',
        brand: 'DenizBank',
        link: '#',
    },
    {
        title: "Şirketim Kredi Kartı ile 25.000 TL'ye varan faizsiz sonradan taksit imkanı!",
        description: 'Ömür boyu aidatsız kredi kartı.',
        image: 'https://placehold.co/600x300/800080/ffffff?text=Enpara.com',
        brand: 'Enpara.com',
        link: '#',
    },
    {
        title: "İşletmeniz için 200.000 TL'ye varan %0 faizli nakit kredi!",
        description: 'Hızlı onay, anında kullanım',
        image: 'https://placehold.co/600x300/006400/ffffff?text=QNB+Finansbank',
        brand: 'QNB Finansbank',
        link: '#',
    },
    {
        title: "KOBİ'ler için %0 faizli 75.000 TL'ye varan ticari kredi!",
        description: 'İlk 6 ay faizsiz',
        image: 'https://placehold.co/600x300/FFA500/ffffff?text=Garanti+BBVA',
        brand: 'Garanti BBVA',
        link: '#',
    },
    {
        title: "İşletme krediniz 150.000 TL'ye kadar faizsiz!",
        description: 'Kolay başvuru, hızlı sonuç',
        image: 'https://placehold.co/600x300/8B0000/ffffff?text=İş+Bankası',
        brand: 'İş Bankası',
        link: '#',
    },
    {
        title: 'E-ticaret girişimcileri için özel 100.000 TL kredi fırsatı!',
        description: 'Tek tıkla başvuru',
        image: 'https://placehold.co/600x300/4682B4/ffffff?text=Yapı+Kredi',
        brand: 'Yapı Kredi',
        link: '#',
    },
];

export default function FinancialSolutions() {
    return (
        <section className="bg-white py-12 dark:bg-[#020617]">
            <div className="container mx-auto px-4">
                <h2 className="mb-8 text-2xl font-medium text-gray-900 dark:text-white">
                    KOBİ'lerin e-ticaret ihtiyaçları için en avantajlı çözümler
                </h2>

                <div className="relative">
                    <Carousel
                        opts={{
                            align: 'start',
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4 md:-ml-6">
                            {solutions.map((item, index) => (
                                <CarouselItem
                                    key={index}
                                    className="basis-full pl-4 md:basis-1/2 md:pl-6 lg:basis-1/3"
                                >
                                    <a
                                        href={item.link}
                                        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all hover:shadow-lg dark:border-white/10 dark:bg-white/5"
                                    >
                                        <div className="aspect-[2/1] w-full overflow-hidden bg-gray-100 dark:bg-white/5">
                                            <img
                                                src={item.image}
                                                alt={item.brand}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>

                                        <div className="flex flex-1 flex-col p-6">
                                            <div className="mb-4 flex items-start justify-between gap-4">
                                                <h3 className="text-lg leading-snug font-medium text-gray-900 dark:text-white">
                                                    {item.title}
                                                </h3>
                                                <ArrowUpRight className="h-5 w-5 flex-shrink-0 text-indigo-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-indigo-400" />
                                            </div>

                                            <p className="mt-auto text-sm text-gray-500 dark:text-gray-400">
                                                {item.description}
                                            </p>
                                        </div>
                                    </a>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className="hidden md:block">
                            <CarouselPrevious className="-left-4 border-gray-200 bg-white dark:border-white/10 dark:bg-zinc-900" />
                            <CarouselNext className="-right-4 border-gray-200 bg-white dark:border-white/10 dark:bg-zinc-900" />
                        </div>
                    </Carousel>
                </div>
            </div>
        </section>
    );
}
