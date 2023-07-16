import { error } from '@sveltejs/kit';
import { type ClassValue, clsx } from 'clsx';
import type { ClientResponseError } from 'pocketbase';

import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const capitalize = (str: string) => {
	return str
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
};

export const parseJwt = (token: string) =>
	JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());

export const random_password_generate: (min: number, max: number) => string = (min, max) => {
	const passwordChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#@!%&()/';
	const randPwLen = Math.floor(Math.random() * (max - min + 1)) + min;
	const randPassword = Array(randPwLen)
		.fill(passwordChars)
		.map(function (x) {
			return x[Math.floor(Math.random() * x.length)];
		})
		.join('');
	return randPassword;
};

type AsyncError = ((Error & { status?: number }) | ClientResponseError) & {
	throw: () => ClientResponseError | never;
};

export const handleAsync = async <T>(
	promise: Promise<T>
): Promise<{ data: T | null; error: AsyncError | null }> => {
	try {
		const data = await promise;
		return { data, error: null };
	} catch (e) {
		const err: AsyncError = Object.assign({}, e as Error | ClientResponseError, {
			throw: () => {
				console.log(err);
				throw error(err.status || 500, err.message);
			}
		});
		return { data: null, error: err };
	}
};
