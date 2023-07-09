import PocketBase from 'pocketbase';
import type { Handle } from '@sveltejs/kit';
import { handleAsync } from '$lib/utils';

export const handle = (async ({ event, resolve }) => {
	event.locals.pb = new PocketBase('http://localhost:8090');
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	if (event.locals.pb.authStore.isValid) {
		const { error: errorRefresh } = await handleAsync(
			event.locals.pb.collection('users').authRefresh()
		);
		errorRefresh && errorRefresh.throw();
	}

	const response = await resolve(event);
	response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie());

	return response;
}) satisfies Handle;
