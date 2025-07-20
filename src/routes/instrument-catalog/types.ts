export const SortDirection = {
	ascending: 'ascending',
	descending: 'descending'
};

export const SortBy = {
	dateAdded: 0,
	scoreOrder: 1,
	category: 2,
	inventoryNumber: 3
};

export type CurrentSort = {
	sortBy: typeof SortBy;
	sortDirection: typeof SortDirection;
};

export const ScoreOrder = {
	Flute: 0,
	Oboe: 1,
	Basoon: 2,
	Clarinet: 3,
	AltoSaxophone: 4,
	TenorSaxophone: 5,
	Cornet: 6,
	Trumpet: 7,
	FrenchHorn: 8,
	Trombone: 9,
	Baritone: 10,
	Tuba: 11,
	Timpany: 12,
	Percussion: 13
};
