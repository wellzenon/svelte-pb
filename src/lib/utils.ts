import { type ClassValue, clsx } from 'clsx';

import { twMerge } from 'tailwind-merge';

export const serializeNonPOJOs = (obj: object) => JSON.parse(JSON.stringify(obj));

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const parseJwt = (token: string) =>
	JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());

export const random_password_generate: (max: number, min: number) => string = (max, min) => {
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

export const handleAsync = async <T>(promise: Promise<T>): Promise<[T, null] | [null, Error]> => {
	try {
		const data = await promise;
		return [data, null];
	} catch (e) {
		return [null, e as Error];
	}
};
