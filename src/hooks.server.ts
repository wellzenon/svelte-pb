import PocketBase, { type Admin, type Record } from 'pocketbase';
import type { TypedPocketBase } from 'typed-pocketbase';
import type { CollectionRecords } from '../pb/pocketbase-types';
import type { MaybePromise, RequestEvent, ResolveOptions } from '@sveltejs/kit';

export type HandleFn = (input: {
	event: RequestEvent & {
		locals: {
			pb: TypedPocketBase<CollectionRecords>;
			user: Record | Admin | null;
		};
	};
	resolve: (event: RequestEvent, opts?: ResolveOptions) => MaybePromise<Response>;
}) => MaybePromise<boolean>;

export const handle: HandleFn = async ({ event, resolve }) => {
	const client: TypedPocketBase<CollectionRecords> = new PocketBase('http://localhost:8090');
	event.locals.pb = client;
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	if (event.locals.pb.authStore.isValid) {
		event.locals.user = event.locals.pb.authStore.model;
	}

	const response = await resolve(event);

	//TODO secure before deplyment
	response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }));

	return false;
};
