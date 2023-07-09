import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { random_password_generate, parseJwt, handleAsync } from '$lib/utils';

export const load = (async ({ params, locals }) => {
	if (locals.pb.authStore.isValid) throw redirect(303, '/');

	const password = random_password_generate(10, 50);
	const { email } = parseJwt(params.token);

	if (!email) throw error(400, 'Authentication failed');

	const { error: errorReset } = await handleAsync(
		locals.pb.collection('users').confirmPasswordReset(params.token, password, password)
	);
	if (errorReset) return { ok: false, message: 'Magic Link expired' };

	const { error: errorAuth } = await handleAsync(
		locals.pb.collection('users').authWithPassword(email, password)
	);
	errorAuth && errorAuth.throw();
	// throw redirect(303, '/'); //DOES NOT WORK!
	return { ok: true, message: 'You are logged in!' };
}) satisfies PageServerLoad;
