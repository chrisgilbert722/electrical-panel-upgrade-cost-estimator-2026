import { PanelResult } from '../logic/panelCalculations';

interface BreakdownTableProps {
    result: PanelResult;
}

export default function BreakdownTable({ result }: BreakdownTableProps) {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };

    return (
        <div className="card">
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 'var(--space-4)' }}>
                Cost Breakdown
            </h2>
            <table>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Low Estimate</th>
                        <th>High Estimate</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Panel Upgrade ({result.upgradeDescription})</td>
                        <td>{formatCurrency(result.baseLow)}</td>
                        <td>{formatCurrency(result.baseHigh)}</td>
                    </tr>
                    {(result.accessLow > 0 || result.accessHigh > 0) && (
                        <tr>
                            <td>Access Surcharge</td>
                            <td>{formatCurrency(result.accessLow)}</td>
                            <td>{formatCurrency(result.accessHigh)}</td>
                        </tr>
                    )}
                    {(result.serviceLow > 0 || result.serviceHigh > 0) && (
                        <tr>
                            <td>Main Service Upgrade</td>
                            <td>{formatCurrency(result.serviceLow)}</td>
                            <td>{formatCurrency(result.serviceHigh)}</td>
                        </tr>
                    )}
                    {(result.meterLow > 0 || result.meterHigh > 0) && (
                        <tr>
                            <td>Meter Base Upgrade</td>
                            <td>{formatCurrency(result.meterLow)}</td>
                            <td>{formatCurrency(result.meterHigh)}</td>
                        </tr>
                    )}
                    {(result.permitLow > 0 || result.permitHigh > 0) && (
                        <tr>
                            <td>Permit & Inspection (est.)</td>
                            <td>{formatCurrency(result.permitLow)}</td>
                            <td>{formatCurrency(result.permitHigh)}</td>
                        </tr>
                    )}
                    {(result.surgeLow > 0 || result.surgeHigh > 0) && (
                        <tr>
                            <td>Surge Protector</td>
                            <td>{formatCurrency(result.surgeLow)}</td>
                            <td>{formatCurrency(result.surgeHigh)}</td>
                        </tr>
                    )}
                    {(result.evLow > 0 || result.evHigh > 0) && (
                        <tr>
                            <td>EV Charger-Ready Prep</td>
                            <td>{formatCurrency(result.evLow)}</td>
                            <td>{formatCurrency(result.evHigh)}</td>
                        </tr>
                    )}
                    <tr style={{ fontWeight: 600 }}>
                        <td>Total Estimated Cost</td>
                        <td>{formatCurrency(result.totalLow)}</td>
                        <td>{formatCurrency(result.totalHigh)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
