<script lang="ts">
	let { showModal = $bindable(), header, actions, children } = $props();
	let dialog = $state<HTMLDialogElement>();
	$effect(() => {
		if (showModal) dialog?.showModal();
	});
</script>

<dialog
	class="modal"
	bind:this={dialog}
	onclose={() => (showModal = false)}
	onclick={(e) => {
		if (e.target === dialog) {
			dialog.close();
		}
	}}
>
	<div class="modal-box">
		<header class="flex items-center justify-between">
			<div class="text-lg font-bold">
				{@render header?.()}
			</div>
			<button
				class="btn btn-circle"
				onclick={() => {
					dialog?.close();
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
				</svg>
				<span class="sr-only">Close Modal</span>
			</button>
		</header>
		<div class="p-4">
			{@render children?.()}
		</div>
		<div class="modal-action">
			<div class="divider"></div>
			<div class="p-4">
				{@render actions?.()}
			</div>
		</div>
	</div>
</dialog>
