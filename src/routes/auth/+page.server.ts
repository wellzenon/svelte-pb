import type { ClientResponseError } from 'pocketbase';
import { error, type Actions, redirect } from '@sveltejs/kit';
import { random_password_generate } from '$lib/utils';

export const actions: Actions = {
	register: async ({ locals, request }) => {
		const formData = await request.formData();
		const data = Object.fromEntries([...formData]);

		try {
			data.password = random_password_generate(10, 50);
			data.passwordConfirm = data.password;

			await locals.pb.collection('users').create(data);
			await locals.pb.collection('users').requestVerification(data.email.toString());

			const { record } = await locals.pb
				.collection('users')
				.authWithPassword(data.email.toString(), data.password);

			await locals.pb.collection('users').update(record.id, {
				name: data.email.slice(0, data.email.toString().indexOf('@')).toString()
			});
		} catch (err) {
			if ((err as ClientResponseError)?.status >= 400) {
				await locals.pb.collection('users').requestPasswordReset(data.email.toString());
			} else {
				error((err as ClientResponseError)?.status, (err as ClientResponseError)?.message);
			}
		} finally {
			locals.pb.authStore.clear();
		}
	},
	logout: async ({ locals }) => {
		console.log(locals.pb.authStore.clear());
		throw redirect(303, '/auth');
	}
};
