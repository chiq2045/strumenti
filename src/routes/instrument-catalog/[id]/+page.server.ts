import { api } from '$lib/server';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) =>
	await api.getInstrument(params.id).then((res) => ({
		...res,
		categoryOptions: [
			{ value: 'Woodwind', label: 'Woodwind' },
			{ value: 'Percussion', label: 'Percussion' },
			{ value: 'Brass', label: 'Brass' },
			{ value: 'Other', label: 'Other' }
		],
		woodwindOptions: [
			{ value: 'Piccolo', label: 'Piccolo' },
			{ value: 'Flute', label: 'Flute' },
			{ value: 'Oboe', label: 'Oboe' },
			{ value: 'Clarinet', label: 'Clarinet' },
			{ value: 'BassClarinet', label: 'BassClarinet' },
			{ value: 'Bassoon', label: 'Bassoon' },
			{ value: 'AltoSaxophone', label: 'AltoSaxophone' },
			{ value: 'TenorSaxophone', label: 'TenorSaxophone' },
			{ value: 'Other', label: 'Other' }
		],
		percussionOptions: [
			{ value: 'Drums', label: 'Drums' },
			{ value: 'BarredInstument', label: 'BarredInstument' },
			{ value: 'Cymbals', label: 'Cymbals' },
			{ value: 'PitchedPercussion', label: 'PitchedPercussion' },
			{ value: 'UnpitchedPercussion', label: 'UnpitchedPercussion' },
			{ value: 'Other', label: 'Other' }
		],
		brassOptions: [
			{ value: 'Trumpet', label: 'Trumpet' },
			{ value: 'FrenchHorn', label: 'FrenchHorn' },
			{ value: 'Trombone', label: 'Trombone' },
			{ value: 'Baritone', label: 'Baritone' },
			{ value: 'Tuba', label: 'Tuba' },
			{ value: 'Other', label: 'Other' }
		],
		otherOptions: [
			{ value: 'Guitar', label: 'Guitar' },
			{ value: 'ClassroomMusic', label: 'ClassroomMusic' },
			{ value: 'Other', label: 'Other' }
		]
	}));

export const actions: Actions = {
	default: async ({ request, params }) => {
		const { id } = params;
		const formData = await request.formData();
		await api.editInstrument({
			id,
			category: formData.get('category') as string,
			description: formData.get('description') as string,
			instrument_type: formData.get('instrument_type') as string,
			inventory_number: formData.get('inventory_number') as string,
			name: formData.get('name') as string,
			notes: formData.get('notes') as string,
			number_of_instruments: parseInt(formData.get('number_of_instruments') as string),
			score: parseInt(formData.get('score') as string),
			serial_number: formData.get('serial_number') as string
		});
		return redirect(303, '/instrument-catalog');
	}
};
