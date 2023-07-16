import PocketBase from 'pocketbase';
import type { Handle } from '@sveltejs/kit';
import { handleAsync } from '$lib/utils';
import { PUBLIC_PB_URL } from '$env/static/public';

export const handle = (async ({ event, resolve }) => {
	event.locals.pb = new PocketBase(PUBLIC_PB_URL);
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	if (event.locals.pb.authStore.isValid) {
		const { error: errorRefresh } = await handleAsync(
			event.locals.pb.collection('users').authRefresh()
		);
		if (errorRefresh) event.locals.pb.authStore.clear();
	}

	const response = await resolve(event);
	response.headers.append(
		'set-cookie',
		event.locals.pb.authStore.exportToCookie({ sameSite: 'Lax' })
	);

	return response;
}) satisfies Handle;
