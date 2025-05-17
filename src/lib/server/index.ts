import { INSTANT_APP_ADMIN_TOKEN, INSTANT_APP_ID } from '$env/static/private';
import { id, init, type InstaQLEntity } from '@instantdb/admin';
import schema, { type AppSchema } from '../../../instant.schema';

type Entity<T extends keyof AppSchema['entities']> = InstaQLEntity<AppSchema, T>;
type EntityWithoutId<T extends keyof AppSchema['entities']> = Omit<Entity<T>, 'id'>;

const db = init({
	appId: INSTANT_APP_ID,
	adminToken: INSTANT_APP_ADMIN_TOKEN,
	schema
});

export const api = {
	getInstruments: async () =>
		await db.query({
			instruments: {
				$: {
					fields: ['id', 'category', 'name', 'description', 'notes', 'score', 'inventory_number']
				}
			}
		}),
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
