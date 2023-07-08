import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) =>
	locals?.pb?.authStore?.model
		? { user: structuredClone(locals.pb.authStore.model) }
		: null) satisfies LayoutServerLoad;
