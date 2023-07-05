import { error, type Handle } from '@sveltejs/kit';
import PocketBase, { ClientResponseError } from 'pocketbase';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.pb = new PocketBase('http://localhost:8090');
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		event.locals.pb.authStore.isValid && (await event.locals.pb.collection('users').authRefresh());
	} catch (e) {
		event.locals.pb.authStore.clear();
		error((e as ClientResponseError).status, (e as ClientResponseError).message);
	}
	const response = await resolve(event);

	//TODO secure before deplyment
	response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie());

	return response;
};
