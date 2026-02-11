import { Loader2, Inbox, AlertTriangle } from 'lucide-react';

/**
 * LoadingState — Full-area loading spinner.
 */
export function LoadingState({ message = 'Loading data...' }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <Loader2 className="w-8 h-8 text-brand-500 animate-spin mb-4" />
            <p className="text-sm text-surface-500 font-medium">{message}</p>
        </div>
    );
}

/**
 * EmptyState — Shown when there's no data.
 */
export function EmptyState({ icon: Icon = Inbox, title, message }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="w-14 h-14 rounded-2xl bg-surface-100 flex items-center justify-center mb-4">
                <Icon className="w-7 h-7 text-surface-400" />
            </div>
            <h3 className="text-base font-semibold text-surface-700">{title}</h3>
            <p className="text-sm text-surface-400 mt-1 text-center max-w-xs">{message}</p>
        </div>
    );
}

/**
 * ErrorState — Shown when an API call fails.
 */
export function ErrorState({ message = 'Something went wrong.', onRetry }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
                <AlertTriangle className="w-7 h-7 text-red-500" />
            </div>
            <h3 className="text-base font-semibold text-surface-700">Error</h3>
            <p className="text-sm text-surface-400 mt-1 text-center max-w-sm">{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="mt-4 px-4 py-2 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition-colors"
                >
                    Try Again
                </button>
            )}
        </div>
    );
}
