<script lang="ts">
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
	const instrument = data.instruments[0];
	let category = $state(instrument?.category ?? '');
	let instrumentType = $state(instrument?.instrument_type ?? '');
	let instrumentName = $state(instrument?.name ?? '');
	let score = $state((instrument?.score ?? 3) * 2);
</script>

<div class="flex flex-col gap-2">
	<div>
		<h1 class="text-lg">Instrument Information</h1>
		<p class="text-sm">You can edit the instrument information on this page</p>
	</div>
	<div class="divider"></div>
	{#if Boolean(instrument)}
		<form method="post" class="flex flex-col items-center gap-2 sm:grid sm:grid-cols-6">
			<label class="select w-full sm:col-span-3">
				<span class="mr-3">Category<span class="text-red-600">*</span></span>
				<select
					name="category"
					class="validator select"
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
				<div class="validator-hint">Select a category</div>
			</label>
			<label class="select w-full sm:col-span-3">
				<span class="mr-3">Instrument<span class="text-red-600">*</span></span>
				<select
					name="instrument_type"
					class="validator select"
					bind:value={instrumentType}
					onchange={(e) => {
						instrumentType = e.currentTarget.value;
						if (!instrumentName) {
							instrumentName = e.currentTarget.value;
						}
					}}
					required
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
				<div class="validator-hint">Select an appropriate instrument type</div>
			</label>
			<label class="input w-full sm:col-span-3">
				<span>Name</span>
				<input
					type="text"
					class="validator input"
					placeholder={instrumentName}
					name="name"
					bind:value={instrumentName}
					onchange={(e) => {
						instrumentName = e.currentTarget.value;
					}}
				/>
			</label>
			<label
				class="border-base-300 flex w-full items-center gap-3 rounded-lg border-1 p-2 sm:col-span-3"
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
						bind:value={score}
						onchange={(e) => {
							score = parseInt(e.currentTarget.value);
						}}
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
			</label>
			<label class="textarea w-full sm:col-span-3">
				<span>Description</span>
				<textarea name="description" value={instrument.description} class="textarea w-full"
				></textarea>
			</label>
			<label class="textarea w-full sm:col-span-3">
				<span>Notes</span>
				<textarea name="notes" value={instrument.notes} class="textarea w-full"></textarea>
			</label>
			<label class="textarea w-full sm:col-span-2">
				<span aria-hidden={true}>Inventory #<span class="text-red-600">*</span></span>
				<span class="sr-only">Inventory Number</span>
				<input
					name="inventory_number"
					value={instrument.inventory_number}
					class="input validator w-full"
					required
				/>
				<div class="validator-hint">Inventory number is required</div>
			</label>
			<label class="textarea w-full sm:col-span-2">
				<span aria-hidden={true}>Serial #</span>
				<span class="sr-only">Serial Number</span>
				<input name="serial_number" value={instrument.serial_number} class="input w-full" />
			</label>
			<label class="textarea w-full sm:col-span-2">
				<span aria-hidden={true}># of instruments</span>
				<span class="sr-only">Number of Instruments</span>
				<input
					name="number_of_instruments"
					value={instrument.number_of_instruments ?? 0}
					type="number"
					class="input w-full"
				/>
			</label>
			<div class="flex basis-full items-center justify-between gap-2 sm:col-span-6">
				<a class="btn btn-accent" href="/instrument-catalog">Back to List</a>
				<div>
					<button class="btn" type="reset">Reset</button>
					<button class="btn btn-primary" type="submit">Submit</button>
				</div>
			</div>
		</form>
	{:else}
		<div class="flex flex-col items-center justify-center">
			<p>
				This instrument does not exist in the Database.
				<span>Go back to <a href="/instrument-catalog">List</a></span>
			</p>
		</div>
	{/if}
</div>
