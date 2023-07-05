import type { LayoutServerLoad } from './$types';
import { serializeNonPOJOs } from '$lib/utils';

export const load: LayoutServerLoad = async ({ locals }) => {
	return locals?.pb?.authStore?.model
		? { user: serializeNonPOJOs(locals.pb.authStore.model) }
		: null;
};
