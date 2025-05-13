<script lang="ts">
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

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
	<div role="separator" class="divider"></div>
	<div class="flex items-center justify-between gap-2">
		<label class="input">
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
					d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
				/>
			</svg>
			<input type="search" class="grow" placeholder="Search" />
		</label>
	</div>
	{#if data.instruments.length === 0}
		<span>No instruments</span>
	{:else}
		<table class="table">
			<thead>
				<tr>
					<th class="w-1/10 text-center" abbr="Inventory Number">#</th>
					<th class="w-2/10 text-left">Instrument</th>
					<th class="w-3/10 text-left">Description</th>
					<th class="w-3/10 text-left">Notes</th>
					<th class="w-1/10 text-right">Score</th>
				</tr>
			</thead>
			<tbody>
				{#each data.instruments as instrument}
					<tr>
						<th class="text-center">{instrument.inventory_number}</th>
						<td class="text-left">{instrument.instrument_type}</td>
						<td class="text-left">{instrument.description}</td>
						<td class="text-left">{instrument.notes}</td>
						<td class="text-right">{instrument.score}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</div>
