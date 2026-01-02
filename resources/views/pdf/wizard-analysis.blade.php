<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Platform Önerisi Analizi - {{ $primary['platform']['name'] ?? 'Analiz' }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'DejaVu Sans', Arial, sans-serif;
            font-size: 12px;
            line-height: 1.6;
            color: #333;
            padding: 20px;
        }

        .header {
            border-bottom: 3px solid #2563eb;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }

        .header h1 {
            color: #1e40af;
            font-size: 24px;
            margin-bottom: 10px;
        }

        .header .date {
            color: #666;
            font-size: 11px;
        }

        .platform-section {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
        }

        .platform-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 2px solid #e2e8f0;
        }

        .platform-info h2 {
            color: #1e293b;
            font-size: 20px;
            margin-bottom: 5px;
        }

        .platform-info .plan {
            color: #64748b;
            font-size: 14px;
        }

        .score-badge {
            background: #2563eb;
            color: white;
            padding: 10px 20px;
            border-radius: 6px;
            font-size: 18px;
            font-weight: bold;
        }

        .confidence-badge {
            display: inline-block;
            padding: 5px 12px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: bold;
            margin-top: 10px;
        }

        .confidence-high {
            background: #10b981;
            color: white;
        }

        .confidence-medium {
            background: #f59e0b;
            color: white;
        }

        .confidence-low {
            background: #ef4444;
            color: white;
        }

        .section {
            margin-bottom: 25px;
        }

        .section-title {
            color: #1e40af;
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .section-title::before {
            content: "✓";
            background: #10b981;
            color: white;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
        }

        .warning-section .section-title::before {
            content: "!";
            background: #f59e0b;
        }

        .list-item {
            padding: 8px 0;
            padding-left: 20px;
            border-left: 3px solid #e2e8f0;
            margin-bottom: 8px;
        }

        .list-item::before {
            content: "•";
            color: #2563eb;
            font-weight: bold;
            margin-left: -15px;
            margin-right: 8px;
        }

        .warning-list .list-item {
            border-left-color: #f59e0b;
        }

        .warning-list .list-item::before {
            color: #f59e0b;
        }

        .secondary-section {
            background: #f1f5f9;
            border: 1px solid #cbd5e1;
            border-radius: 8px;
            padding: 15px;
            margin-top: 20px;
        }

        .secondary-section h3 {
            color: #475569;
            font-size: 14px;
            margin-bottom: 10px;
        }

        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            text-align: center;
            color: #64748b;
            font-size: 10px;
        }

        .insights-section {
            background: #eff6ff;
            border: 1px solid #bfdbfe;
            border-radius: 8px;
            padding: 15px;
            margin-top: 20px;
        }

        .insights-section h3 {
            color: #1e40af;
            font-size: 14px;
            margin-bottom: 10px;
        }

        .page-break {
            page-break-before: always;
        }
    </style>
</head>
<body>
<div class="header">
    <h1>E-Ticaret Platform Önerisi Analizi</h1>
    <div class="date">Oluşturulma Tarihi: {{ $date }}</div>
</div>

@if($primary)
    <div class="platform-section">
        <div class="platform-header">
            <div class="platform-info">
                <h2>{{ $primary['platform']['name'] ?? 'Platform' }}</h2>
                @if(isset($primary['recommendedPlan']))
                    <div class="plan">Önerilen Plan: {{ $primary['recommendedPlan']['name'] }} -
                        ${{ number_format($primary['recommendedPlan']['monthlyPrice'], 2) }}
                        /{{ $primary['recommendedPlan']['currency'] === 'USD' ? 'ay' : $primary['recommendedPlan']['currency'] }}
                    </div>
                @endif
                <span class="confidence-badge confidence-{{ $primary['confidence'] ?? 'medium' }}">
                    {{ ucfirst($primary['confidence'] ?? 'medium') }} Güven
                </span>
            </div>
            <div class="score-badge">
                {{ $primary['score'] ?? 0 }}/100
            </div>
        </div>

        @if(isset($primary['reasons']) && count($primary['reasons']) > 0)
            <div class="section">
                <div class="section-title">Neden Bu Platform?</div>
                <div>
                    @foreach($primary['reasons'] as $reason)
                        <div class="list-item">{{ $reason }}</div>
                    @endforeach
                </div>
            </div>
        @endif

        @if(isset($primary['warnings']) && count($primary['warnings']) > 0)
            <div class="section warning-section">
                <div class="section-title">Dikkat Edilmesi Gerekenler</div>
                <div class="warning-list">
                    @foreach($primary['warnings'] as $warning)
                        <div class="list-item">{{ $warning }}</div>
                    @endforeach
                </div>
            </div>
        @endif
    </div>
@endif

@if($secondary)
    <div class="secondary-section">
        <h3>İkinci Sırada: {{ $secondary['platform']['name'] ?? 'Platform' }}</h3>
        <p><strong>Eşleşme Skoru:</strong> %{{ $secondary['score'] ?? 0 }}</p>
        @if(isset($secondary['reasons']) && count($secondary['reasons']) > 0)
            <p><strong>Nedenler:</strong></p>
            <ul style="margin-left: 20px; margin-top: 5px;">
                @foreach(array_slice($secondary['reasons'], 0, 3) as $reason)
                    <li>{{ $reason }}</li>
                @endforeach
            </ul>
        @endif
        @if(isset($secondary['criticalGaps']) && count($secondary['criticalGaps']) > 0)
            <p style="color: #dc2626; margin-top: 10px;"><strong>Kritik Eksiklikler:</strong></p>
            <ul style="margin-left: 20px; color: #dc2626;">
                @foreach($secondary['criticalGaps'] as $gap)
                    <li>{{ $gap }}</li>
                @endforeach
            </ul>
        @endif
    </div>
@endif

@if($insights)
    <div class="insights-section">
        <h3>Öngörüler ve Öneriler</h3>
        @if(isset($insights['strengths']) && count($insights['strengths']) > 0)
            <p><strong>Güçlü Yönler:</strong></p>
            <ul style="margin-left: 20px; margin-top: 5px;">
                @foreach($insights['strengths'] as $strength)
                    <li>{{ $strength }}</li>
                @endforeach
            </ul>
        @endif
        @if(isset($insights['considerations']) && count($insights['considerations']) > 0)
            <p style="margin-top: 10px;"><strong>Dikkat Edilmesi Gerekenler:</strong></p>
            <ul style="margin-left: 20px; margin-top: 5px;">
                @foreach($insights['considerations'] as $consideration)
                    <li>{{ $consideration }}</li>
                @endforeach
            </ul>
        @endif
        @if(isset($insights['nextSteps']) && count($insights['nextSteps']) > 0)
            <p style="margin-top: 10px;"><strong>Sonraki Adımlar:</strong></p>
            <ul style="margin-left: 20px; margin-top: 5px;">
                @foreach($insights['nextSteps'] as $step)
                    <li>{{ $step }}</li>
                @endforeach
            </ul>
        @endif
    </div>
@endif

@if($alternativeScenarios && count($alternativeScenarios) > 0)
    <div class="section" style="margin-top: 30px;">
        <div class="section-title">Alternatif Senaryolar</div>
        @foreach($alternativeScenarios as $scenario)
            <div
                style="background: #f8fafc; padding: 12px; border-radius: 6px; margin-bottom: 10px; border-left: 3px solid #8b5cf6;">
                <p><strong>{{ $scenario['scenario'] }}</strong></p>
                <p style="margin-top: 5px;">{{ $scenario['impact'] }}</p>
                @if(isset($scenario['newRecommendation']))
                    <p style="margin-top: 5px; color: #6366f1;">
                        <strong>Yeni
                            Öneri:</strong> {{ $scenario['newRecommendation']['platform']['name'] ?? 'Platform' }}
                    </p>
                @endif
            </div>
        @endforeach
    </div>
@endif

<div class="footer">
    <p>Bu rapor KobiStart platform öneri sistemi tarafından oluşturulmuştur.</p>
    <p>Daha fazla bilgi için: {{ config('app.url') }}</p>
</div>
</body>
</html>

