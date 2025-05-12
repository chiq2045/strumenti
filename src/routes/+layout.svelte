<script lang="ts">
	import { page } from '$app/state';
	import '../app.css';
	import '@spectrum-css/sidenav/dist/index.css';
	import '@spectrum-css/divider/dist/index.css';

	$inspect(page.url.pathname, page.url.pathname === '/');
	let { children } = $props();
</script>

<header class="navbar bg-base-100 shadow">
	<nav class="flex items-center gap-2 px-4">
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
	</nav>
</header>

<main class="px-4 pt-4">{@render children()}</main>
