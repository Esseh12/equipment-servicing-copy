import { useState, useEffect, useCallback } from 'react';
import { ConfigResponse } from '../api/config/route';
import { getAppConfig, invalidateConfigCache } from '@/lib/config';

export function useAppConfig() {
	const [config, setConfig] = useState<ConfigResponse | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	// Create a refreshConfig function that can be called to force a refresh
	const refreshConfig = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			// Invalidate the cache first
			invalidateConfigCache();

			// Then fetch fresh config
			const appConfig = await getAppConfig(true);
			setConfig(appConfig);
			setLoading(false);
		} catch (err) {
			setError(err instanceof Error ? err : new Error('Unknown error'));
			setLoading(false);
		}
	}, []);

	// Initial config load
	useEffect(() => {
		async function loadConfig() {
			try {
				const appConfig = await getAppConfig();
				setConfig(appConfig);
				setLoading(false);
			} catch (err) {
				setError(err instanceof Error ? err : new Error('Unknown error'));
				setLoading(false);
			}
		}

		loadConfig();

		// Optional: Set up a refresh interval if you want periodic checks
		const refreshInterval = setInterval(() => {
			getAppConfig(true)
				.then((appConfig) => {
					// Only update state if config actually changed
					if (JSON.stringify(appConfig) !== JSON.stringify(config)) {
						setConfig(appConfig);
					}
				})
				.catch(() => {
					console.error('Background config refresh failed:');
				});
		}, 60000); // Check every minute

		return () => clearInterval(refreshInterval);
	}, [config]);

	return { config, loading, error, refreshConfig };
}
