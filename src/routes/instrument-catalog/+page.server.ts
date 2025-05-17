import { api } from '$lib/server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => await api.getInstruments();

export const actions: Actions = {
	delete: async ({ request }) => {
		const formData = await request.formData();
		const ids = formData.getAll('ids') as string[];
		return api.deleteInstruments(ids);
	}
};
