import { type Actions, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { handleAsync, random_password_generate } from '$lib/utils';

export const load = (async ({ locals }) => {
	if (locals.pb.authStore.isValid) throw redirect(303, '/');
}) satisfies PageServerLoad;

export const actions = {
	auth: async ({ locals, request }) => {
		const formData = await request.formData();
		const data = Object.fromEntries([...formData]);

		data.password = random_password_generate(10, 50);
		data.passwordConfirm = data.password;

		// Tries do create an user with the email
		const { error: errorCreate } = await handleAsync(locals.pb.collection('users').create(data));

		if (!errorCreate) {
			//Log in to get user ID
			const { data: authData, error: errorAuth } = await handleAsync(
				locals.pb.collection('users').authWithPassword(data.email.toString(), data.password)
			);

			if (authData) {
				//Use user ID to update user
				const { error: errorUpdate } = await handleAsync(
					locals.pb.collection('users').update(authData.record.id, {
						name: data.email.slice(0, data.email.toString().indexOf('@')).toString()
					})
				);
				errorUpdate && errorUpdate.throw();
			} else {
				errorAuth && errorAuth.throw();
			}
		}

		// Send password reset email which will act as a Magic Link
		const { error: errorReset } = await handleAsync(
			locals.pb.collection('users').requestPasswordReset(data.email.toString())
		);
		errorReset && errorReset.throw();

		locals.pb.authStore.clear();
	},
	logout: async ({ locals }) => {
		locals.pb.authStore.clear();
		throw redirect(303, '/auth');
	}
} satisfies Actions;
