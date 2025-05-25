<script lang="ts">
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
	let search = $state('');
	let filteredInstruments = $derived(
		data.instruments.filter((instrument) => {
			const { id, ...v } = instrument;
			return JSON.stringify(v).toLowerCase().includes(search.toLowerCase());
		})
	);
	const getColor = (category?: string) => {
		switch (category?.toLowerCase()) {
			case 'woodwind':
				return 'bg-blue-100';
			case 'percussion':
				return 'bg-green-100';
			case 'brass':
				return 'bg-red-100';
			default:
				return 'bg-base-100';
		}
	};
</script>

{#snippet viewInstrumentDetailsButton(id: string)}
	<a
		href={`/instrument-catalog/${id}`}
		class="btn btn-accent btn-xs btn-outline btn-circle shadow-sm"
	>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
			<path
				fill-rule="evenodd"
				d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"
				clip-rule="evenodd"
			/>
		</svg>
		<span class="sr-only">View Instrument Details</span>
	</a>
{/snippet}

<div class="flex flex-col gap-2">
	<div class="flex items-center justify-between gap-2">
		<div class="flex items-center gap-2">
			<h1 class="text-lg font-bold">Instrument List</h1>
			<div class="badge badge-soft badge-accent">{data.instruments.length}</div>
		</div>
		<div>
			<a href="/instrument-catalog/new" class="btn btn-primary">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-5"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
				</svg>
				New Instrument
			</a>
		</div>
	</div>
	<div role="separator" class="divider my-0"></div>
	<div class="flex items-center justify-between gap-2">
		<label class="input">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-5"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
				/>
			</svg>
			<input
				type="search"
				class="grow"
				placeholder="Search"
				bind:value={search}
				onchange={(e) => {
					search = e.currentTarget.value;
				}}
			/>
		</label>
		<div>
			<a href="/instrument-catalog/print" class="btn btn-accent btn-soft">
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
				<span class="sr-only">Print</span>
			</a>
		</div>
	</div>
	{#if data.instruments.length === 0}
		<span class="flex justify-center pt-2 text-xl">No instruments</span>
	{:else if filteredInstruments.length === 0}
		<span class="flex justify-center pt-2 text-xl">No instruments matching filters</span>
	{:else}
		<form>
			<ul class="list gap-1 md:hidden">
				{#each filteredInstruments as instrument}
					<li class={`list-row ${getColor(instrument.category)} shadow-sm`}>
						<div class="flex w-20 flex-col items-center justify-center gap-2">
							<div class="font-bold">{instrument.inventory_number}</div>
							{@render viewInstrumentDetailsButton(instrument.id)}
						</div>
						<div>
							<dl class="flex flex-row flex-wrap">
								<dt class="basis-1/5">Instrument</dt>
								<dd class="grow basis-4/5">{instrument.name}</dd>
								<dt class="basis-1/5">Description</dt>
								<dd class="grow basis-4/5 whitespace-pre-wrap">{instrument.description}</dd>
								<dt class="basis-1/5">Notes</dt>
								<dd class="grow basis-4/5 whitespace-pre-wrap">{instrument.notes}</dd>
								<dt class="basis-1/5">Score</dt>
								<dd class="grow basis-4/5">{instrument.score}</dd>
							</dl>
						</div>
					</li>
				{/each}
			</ul>
			<table class="table border-separate border-spacing-x-0 border-spacing-y-1 max-md:hidden">
				<thead>
					<tr class="bg-base-200">
						<th class="w-15/100" abbr="Inventory Number">#</th>
						<th class="w-15/100 text-left">Instrument</th>
						<th class="w-30/100 text-left">Description</th>
						<th class="w-30/100 text-left">Notes</th>
						<th class="w-10/100 text-right">Score</th>
					</tr>
				</thead>
				<tbody>
					{#each filteredInstruments as instrument}
						<tr class={getColor(instrument.category)}>
							<th class="">
								{@render viewInstrumentDetailsButton(instrument.id)}
								<span class="pl-1">
									{instrument.inventory_number}
								</span>
							</th>
							<td class="text-left">{instrument.name}</td>
							<td class="text-left whitespace-pre-wrap">{instrument.description}</td>
							<td class="text-left whitespace-pre-wrap">{instrument.notes}</td>
							<td class="text-right">{instrument.score}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</form>
	{/if}
</div>

<style>
	@reference "../../app.css";
	dt::after {
		content: ': ';
	}
	dt {
		@apply text-gray-700;
	}
</style>
