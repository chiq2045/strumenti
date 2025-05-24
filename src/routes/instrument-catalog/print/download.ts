import type { Entity } from '$lib';
import ExcelJs from 'exceljs';
import fileSaver from 'file-saver';

export const download = async (instruments: Entity<'instruments'>[], visibleColumns: string[]) => {
	const workbook = new ExcelJs.Workbook();
	workbook.creator = 'Strumenti';
	workbook.created = new Date();
	const allSheet = workbook.addWorksheet('All Instruments', {
		views: [{ state: 'frozen', xSplit: 1, ySplit: 1 }]
	});
	const woodwindSheet = workbook.addWorksheet('Woodwind', {
		views: [{ state: 'frozen', xSplit: 1, ySplit: 1 }]
	});
	const brassSheet = workbook.addWorksheet('Brass', {
		views: [{ state: 'frozen', xSplit: 1, ySplit: 1 }]
	});
	const percussionSheet = workbook.addWorksheet('Percussion', {
		views: [{ state: 'frozen', xSplit: 1, ySplit: 1 }]
	});
	const otherSheet = workbook.addWorksheet('Other', {
		views: [{ state: 'frozen', xSplit: 1, ySplit: 1 }]
	});
	// @ts-ignore
	const columns: Partial<ExcelJs.Column>[] = [
		...(visibleColumns.includes('#') ? [{ header: 'Inventory #', key: 'id' }] : []),
		...(visibleColumns.includes('category') ? [{ header: 'Category', key: 'category' }] : []),
		...(visibleColumns.includes('type') ? [{ header: 'Type', key: 'name' }] : []),
		...(visibleColumns.includes('description')
			? [{ header: 'Description', key: 'description', style: { alignment: { wrapText: true } } }]
			: []),
		...(visibleColumns.includes('notes')
			? [{ header: 'Notes', key: 'notes', style: { alignment: { wrapText: true } } }]
			: []),
		...(visibleColumns.includes('score')
			? [
					{
						header: 'Score',
						key: 'score',
						style: { alignment: { horizontal: 'right' } },
						numFmt: '0.0'
					}
				]
			: []),
		...(visibleColumns.includes('date') ? [{ header: 'Last Updated', key: 'date' }] : [])
	];
	allSheet.columns = columns;
	woodwindSheet.columns = columns;
	brassSheet.columns = columns;
	percussionSheet.columns = columns;
	otherSheet.columns = columns;
	const createRow = (instrument: Entity<'instruments'>) => ({
		id: instrument.inventory_number,
		category: instrument.category,
		name: instrument.name,
		description: instrument.description,
		notes: instrument.notes,
		score: instrument.score,
		date: new Date(instrument.updated_date ?? (instrument.created_date as string)).toLocaleString()
	});
	allSheet.addRows(instruments.map(createRow));
	woodwindSheet.addRows(instruments.filter((v) => v.category === 'Woodwind').map(createRow));
	brassSheet.addRows(instruments.filter((v) => v.category === 'Brass').map(createRow));
	percussionSheet.addRows(instruments.filter((v) => v.category === 'Percussion').map(createRow));
	otherSheet.addRows(instruments.filter((v) => v.category === 'Other').map(createRow));

	const buffer = await workbook.xlsx.writeBuffer();
	const blob = new Blob([buffer], {
		type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
	});

	fileSaver.saveAs(blob, 'instruments.xlsx');
};
