<script lang="ts">
	import type { PageProps } from './$types';
	import { download } from './download';
	import { browser } from '$app/environment';
	// @ts-ignore
	let printJS;
	import { onMount } from 'svelte';
	import Filters from '../filters.svelte';

	const { data }: PageProps = $props();
	const columnOptions = [
		{ key: 'Inventory Number', value: '#' },
		{ key: 'Category', value: 'category' },
		{ key: 'Instrument Type', value: 'type' },
		{ key: 'Description', value: 'description' },
		{ key: 'Notes', value: 'notes' },
		{ key: 'Score', value: 'score' },
		{ key: 'Updated Date', value: 'date' }
	];
	const categoryOptions = ['Woodwind', 'Percussion', 'Brass', 'Other'];
	let visibleColumns = $state(columnOptions.map((v) => v.value));
	let filteredCategories = $state(categoryOptions);
	const instruments = $derived(
		data.instruments.filter((v) => filteredCategories.includes(v.category!))
	);
	let openFilters = $state(false);

	onMount(async () => {
		const p = await import('print-js');
		printJS = p.default;
	});
	const printTable = () => {
		if (browser) {
			// @ts-ignore
			printJS('table', 'html');
		}
	};
</script>

<div class="flex flex-col gap-2">
	<div class="flex items-center justify-between gap-2">
		<div class="flex items-center gap-2">
			<h1>Print Instruments</h1>
			<div class="badge badge-accent">{instruments.length}</div>
		</div>
		<div class="flex items-center gap-2">
			<button class="btn btn-primary" onclick={() => download(instruments, [...visibleColumns])}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
					/>
				</svg>
				Download
			</button>
			<button class="btn btn-primary" onclick={printTable}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
					/>
				</svg>
				Print
			</button>
		</div>
	</div>
	<Filters
		bind:open={openFilters}
		{columnOptions}
		bind:visibleColumns
		{categoryOptions}
		bind:filteredCategories
	/>
	<div class="divider"></div>
	<div class="overflow-x-auto">
		<table class="table-xs table-pin-rows table min-w-3xl" id="table">
			<caption class="text-sm">List of instruments</caption>
			<thead>
				<tr>
					{#if visibleColumns.includes('#')}
						<th>#</th>
					{/if}
					{#if visibleColumns.includes('category')}
						<th>Category</th>
					{/if}
					{#if visibleColumns.includes('type')}
						<th>Type</th>
					{/if}
					{#if visibleColumns.includes('description')}
						<th>Description</th>
					{/if}
					{#if visibleColumns.includes('notes')}
						<th>Notes</th>
					{/if}
					{#if visibleColumns.includes('score')}
						<th>Score</th>
					{/if}
					{#if visibleColumns.includes('date')}
						<th>Last Updated</th>
					{/if}
				</tr>
			</thead>
			<tbody>
				{#each instruments as instrument}
					<tr>
						{#if visibleColumns.includes('#')}
							<th>{instrument.inventory_number}</th>
						{/if}
						{#if visibleColumns.includes('category')}
							<td>{instrument.category}</td>
						{/if}
						{#if visibleColumns.includes('type')}
							<td>{instrument.name}</td>
						{/if}
						{#if visibleColumns.includes('description')}
							<td class="whitespace-pre-wrap">{instrument.description}</td>
						{/if}
						{#if visibleColumns.includes('notes')}
							<td class="whitespace-pre-wrap">{instrument.notes}</td>
						{/if}
						{#if visibleColumns.includes('score')}
							<td>{instrument.score}</td>
						{/if}
						{#if visibleColumns.includes('date')}
							<td
								>{new Date(
									(instrument.updated_date ?? instrument.created_date) as string
								).toLocaleDateString()}</td
							>
						{/if}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
