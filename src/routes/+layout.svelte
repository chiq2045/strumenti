<script lang="ts">
	import { page } from '$app/state';
	import '../app.css';

	$inspect(page.url.pathname, page.url.pathname === '/');
	let { children } = $props();
</script>

{#snippet instrumentCatalogActions()}
	<div>
		{#if page.url.pathname === '/instrument-catalog'}
			Instrument List
		{:else if page.url.pathname === '/instrument-catalog/new'}
			Add New Instrument
		{:else if page.url.pathname === '/instrument-catalog/print'}
			Print instrument List
		{:else}
			View Instrument Details
		{/if}
	</div>
	<ul class="flex items-center gap-3">
		<li>
			<a href="/instrument-catalog/new" class="btn btn-circle btn-sm btn-secondary">
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
				<span class="sr-only">Add New Instrumnt</span>
			</a>
		</li>
		<li>
			<a href="/instrument-catalog/print" class="btn btn-circle btn-sm btn-secondary">
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
						d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
					/>
				</svg>
				<span class="sr-only">Print Instrument List</span>
			</a>
		</li>
		<li>
			<a href="/instrument-catalog/download" class="btn btn-circle btn-sm btn-secondary">
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
				<span class="sr-only">Download Instrument List</span>
			</a>
		</li>
	</ul>
{/snippet}

<header class="navbar bg-base-100 w-full shadow">
	<nav class="flex w-full items-center justify-between gap-2 px-4">
		<div class="flex items-center gap-2">
			<a href="/">
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
						d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
					/>
				</svg>
				<span class="sr-only">Strumenti</span>
			</a>
			<div role="tablist" class="tabs tabs-border">
				<a
					href="/"
					aria-current={page.url.pathname === '/'}
					role="tab"
					class={`tab ${page.url.pathname === '/' ? 'tab-active' : ''}`}
				>
					Home
				</a>
				<a
					href="/instrument-catalog"
					aria-current={page.url.pathname.startsWith('/instrument-catalog')}
					role="tab"
					class={`tab ${page.url.pathname.startsWith('/instrument-catalog') ? 'tab-active' : ''}`}
				>
					Instrument Catalog
				</a>
				<a
					href="/gradebook"
					aria-current={page.url.pathname.startsWith('/gradebook')}
					role="tab"
					class={`tab ${page.url.pathname.startsWith('/gradebook') ? 'tab-active' : ''}`}
				>
					Gradebook
				</a>
			</div>
		</div>
	</nav>
</header>

<main class="p-4">{@render children()}</main>
