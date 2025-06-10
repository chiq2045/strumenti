<script lang="ts">
	import DeleteModal from '../delete-modal.svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
	const instrument = data.instruments[0];
	let category = $state(instrument?.category ?? '');
	let instrumentType = $state(instrument?.instrument_type ?? '');
	let instrumentName = $state(instrument?.name ?? '');
	let showModal = $state(false);
	const closeModal = () => {
		showModal = false;
	};
	const scoreValues = Array.from({ length: 11 }, (_, i) => i / 2);
</script>

<DeleteModal bind:showModal>
	{#snippet header()}
		<h2>Delete Instrument</h2>
	{/snippet}
	<p>Do you want to delete this instrument?</p>
	{#snippet actions()}
		<form method="post" action="/instrument-catalog?/delete">
			<input hidden name="ids" value={instrument.id} />
			<button class="btn btn-neutral" onclick={closeModal}>No</button>
			<button class="btn btn-error" type="submit" onclick={closeModal}>Yes</button>
		</form>
	{/snippet}
</DeleteModal>
<div class="flex flex-col gap-2">
	<div class="flex justify-between gap-2">
		<div>
			<h1 class="text-lg">Instrument Information</h1>
			<p class="text-sm">You can edit the instrument information on this page</p>
		</div>
		<button
			class="btn btn-secondary"
			onclick={() => {
				showModal = true;
			}}
		>
			Delete
		</button>
	</div>
	<div class="divider"></div>
	{#if Boolean(instrument)}
		<form method="post" class="flex flex-col gap-2 sm:grid sm:grid-cols-6">
			<div class="w-full sm:col-span-3">
				<label class="select w-full">
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
				</label>
				<div class="validator-hint">Select a category</div>
			</div>
			<div class="w-full sm:col-span-3">
				<label class="select w-full">
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
				</label>
				<div class="validator-hint">Select an appropriate instrument type</div>
			</div>
			<label class="input w-full sm:col-span-2">
				<span>Name</span>
				<input
					type="text"
					class="input"
					placeholder={instrumentName}
					name="name"
					bind:value={instrumentName}
					onchange={(e) => {
						instrumentName = e.currentTarget.value;
					}}
				/>
			</label>
			<div class="w-full sm:col-span-2">
				<label class="input w-full">
					<span aria-hidden={true}>Inventory #<span class="text-red-600">*</span></span>
					<span class="sr-only">Inventory Number</span>
					<input
						name="inventory_number"
						value={instrument.inventory_number}
						class="input validator"
						required
					/>
				</label>
				<div class="validator-hint">Inventory number is required</div>
			</div>
			<label class="select w-full sm:col-span-2">
				<span class="mr-3">Score<span class="text-red-600">*</span></span>
				<select class="select w-full" name="score" required value={instrument.score}>
					{#each scoreValues as option}
						<option value={option}>{option}</option>
					{/each}
				</select>
			</label>
			<label class="input w-full sm:col-span-3">
				<span aria-hidden={true}>Serial #</span>
				<span class="sr-only">Serial Number</span>
				<input name="serial_number" value={instrument.serial_number} class="input" />
			</label>
			<label class="input w-full sm:col-span-3">
				<span aria-hidden={true}># of instruments</span>
				<span class="sr-only">Number of Instruments</span>
				<input
					name="number_of_instruments"
					value={instrument.number_of_instruments ?? 0}
					type="number"
					class="input"
				/>
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
			<div class="divider my-2 basis-full sm:col-span-6"></div>
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
