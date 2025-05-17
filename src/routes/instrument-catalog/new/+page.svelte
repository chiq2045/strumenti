<script lang="ts">
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
	let category = $state('');
	let instrumentType = $state('');
	let instrumentName = $state('');
</script>

<div class="flex flex-col gap-2">
	<div>
		<h1 class="text-lg">Add New Instrument</h1>
		<p class="text-sm">You can add the instrument information on this page</p>
	</div>
	<div class="divider"></div>
	<form method="post" class="flex flex-col gap-2 sm:grid sm:grid-cols-6">
		<div class="w-full sm:col-span-3">
			<label class="select w-full">
				<span class="mr-3">Category<span class="text-red-600">*</span></span>
				<select
					name="category"
					class="validator select w-full"
					bind:value={category}
					onchange={(e) => {
						category = e.currentTarget.value;
						instrumentType = '';
					}}
					required
				>
					{#each data.categoryOptions as option}
						<option value={option.value}>{option.label}</option>
					{/each}
				</select>
			</label>
			<div class="validator-hint">Select a category</div>
		</div>
		<div class="w-full sm:col-span-3">
			<label class="select w-full">
				<span class="mr-3">Instrument<span class="text-red-600">*</span></span>
				<select
					name="instrument_type"
					class="validator select w-full"
					bind:value={instrumentType}
					onchange={(e) => {
						instrumentType = e.currentTarget.value;
						if (!instrumentName) {
							instrumentName = e.currentTarget.value;
						}
					}}
					required
					disabled={!category}
				>
					{#if category === 'Woodwind'}
						{#each data.woodwindOptions as option}
							<option value={option.value}>{option.label}</option>
						{/each}
					{:else if category === 'Percussion'}
						{#each data.percussionOptions as option}
							<option value={option.value}>{option.label}</option>
						{/each}
					{:else if category === 'Brass'}
						{#each data.brassOptions as option}
							<option value={option.value}>{option.label}</option>
						{/each}
					{:else if category === 'Other'}
						{#each data.otherOptions as option}
							<option value={option.value}>{option.label}</option>
						{/each}
					{/if}
				</select>
			</label>
			<div class="validator-hint">Select an appropriate instrument type</div>
		</div>
		<label class="input w-full sm:col-span-3">
			<span>Name</span>
			<input
				type="text"
				class="input w-full"
				placeholder={instrumentName}
				name="name"
				bind:value={instrumentName}
				onchange={(e) => {
					instrumentName = e.currentTarget.value;
				}}
			/>
		</label>
		<div class="sm:grid-col-3 w-full">
			<label class="input w-full">
				<span aria-hidden={true}>Inventory #<span class="text-red-600">*</span></span>
				<span class="sr-only">Inventory Number</span>
				<input name="inventory_number" class="input validator w-full" required />
			</label>
			<div class="validator-hint">Inventory number is required</div>
		</div>
		<label class="input w-full sm:col-span-3">
			<span aria-hidden={true}>Serial #</span>
			<span class="sr-only">Serial Number</span>
			<input name="serial_number" class="input w-full" />
		</label>
		<label class="input w-full sm:col-span-3">
			<span aria-hidden={true}># of instruments</span>
			<span class="sr-only">Number of Instruments</span>
			<input name="number_of_instruments" class="input w-full" type="number" value={0} />
		</label>
		<label class="textarea w-full sm:col-span-3">
			<span>Description</span>
			<textarea name="description" class="textarea w-full"></textarea>
		</label>
		<label class="textarea w-full sm:col-span-3">
			<span>Notes</span>
			<textarea name="notes" class="textarea w-full"></textarea>
		</label>
		<label class="grid w-full grid-cols-subgrid items-center gap-2 sm:col-span-6">
			<div
				class="border-base-300 rounded-lg border-1 p-2 sm:col-span-4 sm:col-start-2 lg:col-span-2 lg:col-start-3"
			>
				<span class="text-sm">Score<span class="text-red-600">*</span></span>
				<div class="w-full">
					<input
						type="range"
						min="0"
						max="10"
						class="validator range range-sm w-full"
						placeholder={instrumentName}
						name="score"
						required
					/>
					<div class="flex w-full justify-between px-2.5">
						<span>0</span>
						<span>1</span>
						<span>2</span>
						<span>3</span>
						<span>4</span>
						<span>5</span>
					</div>
				</div>
			</div>
		</label>
		<div class="divider my-2 basis-full sm:col-span-6"></div>
		<div class="flex basis-full items-center justify-between gap-2 sm:col-span-6">
			<a class="btn btn-accent" href="/instrument-catalog">Back to List</a>
			<div>
				<button class="btn" type="reset">Reset</button>
				<button class="btn btn-primary" type="submit">Submit</button>
			</div>
		</div>
	</form>
</div>
