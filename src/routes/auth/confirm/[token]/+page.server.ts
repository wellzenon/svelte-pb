import type { PageServerLoad } from './$types';
import { random_password_generate, parseJwt, serializeNonPOJOs } from '$lib/utils';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, locals }) => {
	const password = random_password_generate(10, 50);
	const { email } = parseJwt(params.token);

	const passwordReset = await locals.pb
		.collection('users')
		.confirmPasswordReset(params.token, password, password);

	if (!email || !passwordReset) error(400, 'Authentication failed');

	const { record } = await locals.pb.collection('users').authWithPassword(email, password);
	return serializeNonPOJOs(record);
};
