'use client';

import { ConfigResponse } from '@/app/api/config/route';

// Cache with version control to allow invalidation
let cachedConfig: {
	data: ConfigResponse | null;
	timestamp: number;
	version: string;
} = {
	data: null,
	timestamp: 0,
	version: '',
};

// Cache expiration time in milliseconds (e.g., 30 seconds)
const CACHE_TTL = 30 * 1000;

/**
 * Fetches application configuration from the server
 * @param forceRefresh Force a refresh regardless of cache
 */
export async function getAppConfig(
	forceRefresh = false
): Promise<ConfigResponse> {
	const now = Date.now();

	// Return cached config if available and not expired
	if (
		!forceRefresh &&
		cachedConfig.data &&
		now - cachedConfig.timestamp < CACHE_TTL
	) {
		return cachedConfig.data;
	}

	try {
		// Generate a cache-busting query parameter
		const cacheBuster = `_=${now}`;

		// Fetch config from the server
		const response = await fetch(`/api/config?${cacheBuster}`, {
			// Prevent caching
			headers: {
				'Cache-Control': 'no-cache, no-store, must-revalidate',
				Pragma: 'no-cache',
				Expires: '0',
			},
			// Don't use browser cache
			cache: 'no-store',
			// Don't revalidate on the server
			next: { revalidate: 0 },
		});

		if (!response.ok) {
			throw new Error(`Failed to load configuration: ${response.status}`);
		}

		// Parse the response
		const config = await response.json();

		// Generate a version hash based on config content
		// This helps detect when config actually changes
		const configVersion = JSON.stringify(config);

		// Update the cache with new data, timestamp, and version
		cachedConfig = {
			data: config,
			timestamp: now,
			version: configVersion,
		};

		return config;
	} catch (error) {
		console.error('Error loading application config:', error);

		// Return fallback values if fetch fails
		return {
			message: 'Fallback configuration',
			env: {
				site_name: 'AccessInternetBanking',
				title: 'Access InternetBanking',
				description: 'NextJS with Tailwind CSS project',
				locale: 'en',
			},
		};
	}
}

// Allow manually refreshing the config
export function invalidateConfigCache() {
	cachedConfig = {
		data: null,
		timestamp: 0,
		version: '',
	};
}
