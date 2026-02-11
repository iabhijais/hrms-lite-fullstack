/**
 * PageHeader — Reusable page title and description header.
 */
export default function PageHeader({ title, description, children }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
                <h1 className="text-2xl font-bold text-surface-900 tracking-tight">{title}</h1>
                {description && (
                    <p className="mt-1 text-sm text-surface-500">{description}</p>
                )}
            </div>
            {children && <div className="flex items-center gap-3">{children}</div>}
        </div>
    );
}
