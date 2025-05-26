<script lang="ts">
	let {
		open = $bindable(),
		columnOptions,
		visibleColumns = $bindable(),
		categoryOptions,
		filteredCategories = $bindable()
	} = $props();
</script>

<details class="dropdown" bind:open>
	<summary class="btn btn-secondary btn-wide">
		Filters
		{#if open}
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
			<legend class="fieldset-legend">Filter Columns</legend>
			{#each columnOptions as option}
				<label class="label">
					<input
						type="checkbox"
						class="checkbox checkbox-secondary checkbox-sm"
						value={option.value}
						bind:group={visibleColumns}
					/>
					{option.key}
				</label>
			{/each}
		</fieldset>
		<fieldset class="fieldset border-base-300 rounded-box border p-4">
			<legend class="fieldset-legend">Filter Categories</legend>
			{#each categoryOptions as option}
				<label class="label">
					<input
						type="checkbox"
						class="checkbox checkbox-secondary checkbox-sm"
						value={option}
						bind:group={filteredCategories}
					/>
					{option}
				</label>
			{/each}
		</fieldset>
	</div>
</details>
