import type { Actions } from '@sveltejs/kit';
export const actions: Actions = {
	register: async ({ locals, request }) => {
		const formData = await request.formData();
		const data = Object.fromEntries([...formData]);
		console.log({ data });
	}
};
