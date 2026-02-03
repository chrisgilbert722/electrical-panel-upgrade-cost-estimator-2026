import { PanelResult } from '../logic/panelCalculations';

interface ResultsPanelProps {
    result: PanelResult;
}

export default function ResultsPanel({ result }: ResultsPanelProps) {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };

    return (
        <div className="card" style={{ background: 'var(--color-accent)', color: 'white' }}>
            <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: 'var(--space-2)' }}>
                    Estimated Panel Upgrade Cost
                </p>
                <p style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
                    {formatCurrency(result.totalLow)} – {formatCurrency(result.totalHigh)}
                </p>
                <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                    {result.upgradeDescription} • Base: {formatCurrency(result.baseLow)}–{formatCurrency(result.baseHigh)}
                </p>
            </div>
        </div>
    );
}
