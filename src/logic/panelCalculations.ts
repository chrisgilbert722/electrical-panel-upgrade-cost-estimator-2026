export interface PanelInput {
    currentAmperage: '60' | '100' | '150' | '200';
    targetAmperage: '100' | '150' | '200' | '400';
    access: 'easy' | 'moderate' | 'difficult';
    serviceUpgrade: 'no' | 'yes';
    meterUpgrade: 'no' | 'yes';
    permitIncluded: 'yes' | 'no';
    region: 'low' | 'average' | 'high';
    surgeProtector: 'no' | 'yes';
    evReady: 'no' | 'yes';
}

export interface PanelResult {
    totalLow: number;
    totalHigh: number;
    baseLow: number;
    baseHigh: number;
    accessLow: number;
    accessHigh: number;
    serviceLow: number;
    serviceHigh: number;
    meterLow: number;
    meterHigh: number;
    permitLow: number;
    permitHigh: number;
    surgeLow: number;
    surgeHigh: number;
    evLow: number;
    evHigh: number;
    upgradeDescription: string;
}

function getBaseUpgradeCost(current: string, target: string): { low: number; high: number; desc: string } {
    // 400A upgrade
    if (target === '400') {
        return { low: 3500, high: 7500, desc: `${current}A to 400A (commercial-grade)` };
    }

    // 60A upgrades
    if (current === '60') {
        if (target === '100') return { low: 1200, high: 2500, desc: '60A to 100A' };
        if (target === '150') return { low: 1500, high: 3000, desc: '60A to 150A' };
        if (target === '200') return { low: 1800, high: 3800, desc: '60A to 200A' };
    }

    // 100A upgrades
    if (current === '100') {
        if (target === '100') return { low: 1000, high: 2000, desc: '100A panel replacement' };
        if (target === '150') return { low: 1400, high: 2800, desc: '100A to 150A' };
        if (target === '200') return { low: 1800, high: 3800, desc: '100A to 200A' };
    }

    // 150A upgrades
    if (current === '150') {
        if (target === '100') return { low: 1000, high: 2000, desc: '150A to 100A (downgrade)' };
        if (target === '150') return { low: 1200, high: 2500, desc: '150A panel replacement' };
        if (target === '200') return { low: 1500, high: 3200, desc: '150A to 200A' };
    }

    // 200A
    if (current === '200') {
        return { low: 1500, high: 3000, desc: '200A panel replacement' };
    }

    // Default fallback
    return { low: 1500, high: 3500, desc: `${current}A to ${target}A` };
}

const ACCESS_COSTS: Record<string, { low: number; high: number }> = {
    easy: { low: 0, high: 0 },
    moderate: { low: 400, high: 1000 },
    difficult: { low: 1200, high: 2800 }
};

const SERVICE_UPGRADE: { low: number; high: number } = { low: 1500, high: 4000 };
const METER_UPGRADE: { low: number; high: number } = { low: 400, high: 1200 };
const PERMIT_COST: { low: number; high: number } = { low: 250, high: 800 };
const SURGE_PROTECTOR: { low: number; high: number } = { low: 250, high: 600 };
const EV_READY: { low: number; high: number } = { low: 300, high: 900 };

const REGION_MULTIPLIERS: Record<string, number> = {
    low: 0.85,
    average: 1.0,
    high: 1.25
};

export function calculatePanelCost(input: PanelInput): PanelResult {
    const baseCost = getBaseUpgradeCost(input.currentAmperage, input.targetAmperage);
    const accessCost = ACCESS_COSTS[input.access];
    const regionMult = REGION_MULTIPLIERS[input.region];

    let baseLow = baseCost.low;
    let baseHigh = baseCost.high;

    let accessLow = accessCost.low;
    let accessHigh = accessCost.high;

    let serviceLow = 0;
    let serviceHigh = 0;
    if (input.serviceUpgrade === 'yes') {
        serviceLow = SERVICE_UPGRADE.low;
        serviceHigh = SERVICE_UPGRADE.high;
    }

    let meterLow = 0;
    let meterHigh = 0;
    if (input.meterUpgrade === 'yes') {
        meterLow = METER_UPGRADE.low;
        meterHigh = METER_UPGRADE.high;
    }

    let permitLow = 0;
    let permitHigh = 0;
    if (input.permitIncluded === 'no') {
        permitLow = PERMIT_COST.low;
        permitHigh = PERMIT_COST.high;
    }

    let surgeLow = 0;
    let surgeHigh = 0;
    if (input.surgeProtector === 'yes') {
        surgeLow = SURGE_PROTECTOR.low;
        surgeHigh = SURGE_PROTECTOR.high;
    }

    let evLow = 0;
    let evHigh = 0;
    if (input.evReady === 'yes') {
        evLow = EV_READY.low;
        evHigh = EV_READY.high;
    }

    // Calculate totals before region multiplier
    let totalLow = baseLow + accessLow + serviceLow + meterLow + permitLow + surgeLow + evLow;
    let totalHigh = baseHigh + accessHigh + serviceHigh + meterHigh + permitHigh + surgeHigh + evHigh;

    // Apply region multiplier to all costs
    totalLow = totalLow * regionMult;
    totalHigh = totalHigh * regionMult;
    baseLow = baseLow * regionMult;
    baseHigh = baseHigh * regionMult;
    accessLow = accessLow * regionMult;
    accessHigh = accessHigh * regionMult;
    serviceLow = serviceLow * regionMult;
    serviceHigh = serviceHigh * regionMult;
    meterLow = meterLow * regionMult;
    meterHigh = meterHigh * regionMult;
    permitLow = permitLow * regionMult;
    permitHigh = permitHigh * regionMult;
    surgeLow = surgeLow * regionMult;
    surgeHigh = surgeHigh * regionMult;
    evLow = evLow * regionMult;
    evHigh = evHigh * regionMult;

    return {
        totalLow: Math.round(totalLow),
        totalHigh: Math.round(totalHigh),
        baseLow: Math.round(baseLow),
        baseHigh: Math.round(baseHigh),
        accessLow: Math.round(accessLow),
        accessHigh: Math.round(accessHigh),
        serviceLow: Math.round(serviceLow),
        serviceHigh: Math.round(serviceHigh),
        meterLow: Math.round(meterLow),
        meterHigh: Math.round(meterHigh),
        permitLow: Math.round(permitLow),
        permitHigh: Math.round(permitHigh),
        surgeLow: Math.round(surgeLow),
        surgeHigh: Math.round(surgeHigh),
        evLow: Math.round(evLow),
        evHigh: Math.round(evHigh),
        upgradeDescription: baseCost.desc
    };
}

export const defaultValues: PanelInput = {
    currentAmperage: '100',
    targetAmperage: '200',
    access: 'easy',
    serviceUpgrade: 'no',
    meterUpgrade: 'no',
    permitIncluded: 'yes',
    region: 'average',
    surgeProtector: 'no',
    evReady: 'no'
};
