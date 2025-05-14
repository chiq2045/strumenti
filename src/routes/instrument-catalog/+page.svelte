<script lang="ts">
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
	let search = $state('');
	let instruments = $derived(
		data.instruments.filter((instrument) => {
			const { id, ...v } = instrument;
			return JSON.stringify(v).toLowerCase().includes(search.toLowerCase());
		})
	);
	let selectedInstruments = $state<string[]>([]);
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
	<a href={`/instrument-catalog/${id}`} class="btn btn-accent btn-sm shadow-sm">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="size-4"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
			/>
		</svg>
		<span class="sr-only">View Instrument Details</span>
	</a>
{/snippet}

<div class="flex flex-col gap-2">
	<div class="flex items-center justify-between gap-2">
		<div class="flex items-center gap-2">
			<h1>Instrument List</h1>
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
				New Instrumnt
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
	</div>
	{#if data.instruments.length === 0}
		<span class="flex justify-center pt-2 text-xl">No instruments</span>
	{:else if instruments.length === 0}
		<span class="flex justify-center pt-2 text-xl">No instruments matching filters</span>
	{:else}
		<ul class="list gap-1 md:hidden">
			{#each instruments as instrument}
				<li class={`list-row ${getColor(instrument.category)} shadow-sm`}>
					<div class="flex flex-col items-center justify-center gap-2">
						<div class="text-lg">{instrument.inventory_number}</div>
						{@render viewInstrumentDetailsButton(instrument.id)}
					</div>
					<div>
						<dl class="flex flex-row flex-wrap">
							<dt class="basis-1/5">Instrument</dt>
							<dd class="grow basis-4/5">{instrument.instrument_type}</dd>
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
					<th class="w-2/10" abbr="Inventory Number">#</th>
					<th class="w-1/10 text-left">Instrument</th>
					<th class="w-3/10 text-left">Description</th>
					<th class="w-3/10 text-left">Notes</th>
					<th class="w-1/10 text-right">Score</th>
				</tr>
			</thead>
			<tbody>
				{#each instruments as instrument}
					<tr class={getColor(instrument.category)}>
						<th class="">
							{@render viewInstrumentDetailsButton(instrument.id)}
							<span class="pl-1">
								{instrument.inventory_number}
							</span>
						</th>
						<td class="text-left">{instrument.instrument_type}</td>
						<td class="text-left whitespace-pre-wrap">{instrument.description}</td>
						<td class="text-left whitespace-pre-wrap">{instrument.notes}</td>
						<td class="text-right">{instrument.score}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</div>
