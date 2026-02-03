import { PanelInput } from '../logic/panelCalculations';

interface InputCardProps {
    values: PanelInput;
    onChange: (values: PanelInput) => void;
}

export default function InputCard({ values, onChange }: InputCardProps) {
    const handleChange = (field: keyof PanelInput, value: string) => {
        onChange({ ...values, [field]: value });
    };

    return (
        <div className="card">
            <div className="form-group">
                <label htmlFor="currentAmperage">Current Panel Amperage</label>
                <select
                    id="currentAmperage"
                    value={values.currentAmperage}
                    onChange={(e) => handleChange('currentAmperage', e.target.value)}
                >
                    <option value="60">60 Amp</option>
                    <option value="100">100 Amp</option>
                    <option value="150">150 Amp</option>
                    <option value="200">200 Amp</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="targetAmperage">Target Panel Amperage</label>
                <select
                    id="targetAmperage"
                    value={values.targetAmperage}
                    onChange={(e) => handleChange('targetAmperage', e.target.value)}
                >
                    <option value="100">100 Amp</option>
                    <option value="150">150 Amp</option>
                    <option value="200">200 Amp</option>
                    <option value="400">400 Amp</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="access">Panel Location / Access</label>
                <select
                    id="access"
                    value={values.access}
                    onChange={(e) => handleChange('access', e.target.value)}
                >
                    <option value="easy">Easy (garage/exterior)</option>
                    <option value="moderate">Moderate</option>
                    <option value="difficult">Difficult (finished walls/tight)</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="serviceUpgrade">Main Service Upgrade Required</label>
                <select
                    id="serviceUpgrade"
                    value={values.serviceUpgrade}
                    onChange={(e) => handleChange('serviceUpgrade', e.target.value)}
                >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="meterUpgrade">Meter Base Upgrade</label>
                <select
                    id="meterUpgrade"
                    value={values.meterUpgrade}
                    onChange={(e) => handleChange('meterUpgrade', e.target.value)}
                >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="permitIncluded">Permit & Inspection</label>
                <select
                    id="permitIncluded"
                    value={values.permitIncluded}
                    onChange={(e) => handleChange('permitIncluded', e.target.value)}
                >
                    <option value="yes">Included in quote</option>
                    <option value="no">Not included (add estimate)</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="region">Region</label>
                <select
                    id="region"
                    value={values.region}
                    onChange={(e) => handleChange('region', e.target.value)}
                >
                    <option value="low">Low-Cost Area</option>
                    <option value="average">Average Cost Area</option>
                    <option value="high">High-Cost Metro</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="surgeProtector">Whole-House Surge Protector</label>
                <select
                    id="surgeProtector"
                    value={values.surgeProtector}
                    onChange={(e) => handleChange('surgeProtector', e.target.value)}
                >
                    <option value="no">No</option>
                    <option value="yes">Yes (+$250–$600)</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="evReady">EV Charger-Ready Prep</label>
                <select
                    id="evReady"
                    value={values.evReady}
                    onChange={(e) => handleChange('evReady', e.target.value)}
                >
                    <option value="no">No</option>
                    <option value="yes">Yes (+$300–$900)</option>
                </select>
            </div>
        </div>
    );
}
