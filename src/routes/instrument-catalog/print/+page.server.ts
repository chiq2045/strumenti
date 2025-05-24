import { api } from '$lib/server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => await api.getAllInstrumentData();
