export default function Header() {
    return (
        <header style={{ marginBottom: 'var(--space-6)', textAlign: 'center' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
                Electrical Panel Upgrade Cost Estimator 2026
            </h1>
            <p style={{ color: 'var(--color-text-muted)' }}>
                Calculate the cost of upgrading your electrical panel based on amperage, service requirements, and add-ons like EV charging prep.
            </p>
        </header>
    );
}
