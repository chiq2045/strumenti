// place files you want to import through the `$lib` alias in this folder.

import type { InstaQLEntity } from '@instantdb/admin';
import type { AppSchema } from '../../instant.schema';

export type Entity<T extends keyof AppSchema['entities']> = InstaQLEntity<AppSchema, T>;
export type EntityWithoutId<T extends keyof AppSchema['entities']> = Omit<Entity<T>, 'id'>;
