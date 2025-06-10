import { INSTANT_APP_ADMIN_TOKEN, INSTANT_APP_ID } from '$env/static/private';
import { id, init } from '@instantdb/admin';
import schema from '../../../instant.schema';
import type { Entity, EntityWithoutId } from '$lib';

const db = init({
	appId: INSTANT_APP_ID,
	adminToken: INSTANT_APP_ADMIN_TOKEN,
	schema
});

export const api = {
	getInstruments: async () =>
		await db.query({
			instruments: {}
		}),
	getAllInstrumentData: async () => await db.query({ instruments: {} }),
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
	addInstrument: async (newInstrument: EntityWithoutId<'instruments'>) =>
		await db.transact([
			db.tx.instruments[id()].update({
				...newInstrument,
				created_date: new Date() as unknown as string
			})
		]),
	editInstrument: async (updatedInstrument: Entity<'instruments'>) => {
		const { id: updatedId, ...instrument } = updatedInstrument;
		return await db.transact([
			db.tx.instruments[updatedId].update({ ...instrument, updated_date: new Date().toISOString() })
		]);
	},
	deleteInstruments: async (instrumentIds: string[]) =>
		await db.transact(instrumentIds.map((v) => db.tx.instruments[v].delete()))
};
