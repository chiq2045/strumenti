<script lang="ts">
	import { SortBy, SortDirection } from './types';

	let { openSort = $bindable(), currentSort = $bindable() } = $props();

	$inspect('sort', openSort);
	const sortOptions = [
		{ key: 'Date Added', value: SortBy.dateAdded },
		{ key: 'Score Order', value: SortBy.scoreOrder },
		{ key: 'Category', value: SortBy.category },
		{ key: 'Inventory Number', value: SortBy.inventoryNumber }
	];
</script>

<details class="dropdown" open={openSort}>
	<summary class="btn btn-wide">
		{sortOptions.find((option) => option.value === currentSort.sortBy)?.key}
		{#if currentSort.sortDirection === SortDirection.ascending}
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
					d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
				/>
			</svg>
		{:else}
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
					d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
				/>
			</svg>
		{/if}
		<span class="sr-only">{currentSort.sortDirection}</span>
		{#if openSort}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-6"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
			</svg>
		{:else}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-6"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
			</svg>
		{/if}
	</summary>
	<div
		class="dropdown-content bg-base-100 border-base-300 rounded-box flex gap-2 border p-4 shadow-sm"
	>
		<fieldset class="fieldset border-base-300 rounded-box border p-4">
			<legend class="fieldset-legend">Sort Instruments</legend>
			{#each sortOptions as option}
				<div class="flex items-center gap-2">
					<button
						class={`btn btn-neutral ${currentSort.sortBy === option.value ? 'btn-outline' : 'btn-dash'} btn-sm btn-circle`}
						onclick={() => {
							currentSort = {
								sortBy: option.value,
								sortDirection:
									currentSort.sortDirection === SortDirection.descending ||
									currentSort.sortBy !== option.value
										? SortDirection.ascending
										: SortDirection.descending
							};
						}}
					>
						{#if currentSort.sortDirection === SortDirection.ascending || currentSort.sortBy !== option.value}
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
									d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
								/>
							</svg>
							<span class="sr-only">Ascending</span>
						{:else}
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
									d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
								/>
							</svg>
							<span class="sr-only">Descending</span>
						{/if}
					</button>
					{option.key}
				</div>
			{/each}
		</fieldset>
	</div>
</details>
