import { INSTANT_APP_ADMIN_TOKEN, INSTANT_APP_ID } from '$env/static/private';
import { id, init, type InstaQLEntity } from '@instantdb/admin';
import schema, { type AppSchema } from '../../../instant.schema';

const db = init({
	appId: INSTANT_APP_ID,
	adminToken: INSTANT_APP_ADMIN_TOKEN,
	schema
});

export const api = {
	getInstruments: async () => await db.query({ instruments: {} }),
	getInstrument: async (instrumentId: string) =>
		await db.query({
			instruments: {
				$: {
					where: {
						id: instrumentId
					}
				}
			}
		}),
	addInstrument: async (newInstrument: Omit<InstaQLEntity<AppSchema, 'instruments'>, 'id'>) =>
		await db.transact([db.tx.instruments[id()].update(newInstrument)])
};
