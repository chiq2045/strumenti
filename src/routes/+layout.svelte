<script lang="ts">
	import { page } from '$app/state';
	import '../app.css';

	$inspect(page.url.pathname, page.url.pathname === '/');
	type MenuItem = { pathName: string; title: string };
	let { children } = $props();
</script>

{#snippet navItem(pathName: string, title: string)}
	<a
		href={pathName}
		aria-current={page.url.pathname === pathName}
		class={page.url.pathname === pathName ? 'menu-active' : ''}
	>
		{title}
	</a>
{/snippet}

{#snippet collapsibleMenuItem(
	title: string,
	basePathName: string,
	items: MenuItem[],
	isSideNav?: boolean
)}
	<details
		open={isSideNav && page.url.pathname.includes(basePathName)}
		class={page.url.pathname.includes(basePathName) ? 'bg-base-200 rounded' : ''}
	>
		<summary>
			{title}
		</summary>
		<ul>
			{#each items as { pathName, title }}
				<li>
					{@render navItem(`${basePathName}${pathName}`, title)}
				</li>
			{/each}
		</ul>
	</details>
{/snippet}

{#snippet menu(menuClass: string, isSideNav?: boolean)}
	<ul class={menuClass}>
		<li>
			{@render navItem('/', 'Home')}
		</li>
		<li>
			{@render collapsibleMenuItem(
				'Instrument Catalog',
				'/instrument-catalog',
				[
					{ title: 'Instrument List', pathName: '/' },
					{ title: 'Add Instrument', pathName: '/new' },
					{ title: 'Print Instrument List', pathName: '/print' }
				],
				isSideNav
			)}
		</li>
		<li>
			{@render navItem('/gradebook', 'Gradebook')}
		</li>
	</ul>
{/snippet}

<div class="drawer">
	<input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<header>
			<nav class="navbar bg-base-100 w-full shadow">
				<div class="flex-none lg:hidden">
					<label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							class="inline-block h-6 w-6 stroke-current"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							></path>
						</svg>
					</label>
				</div>
				<div class="mx-2 flex-1 px-2">Strumenti</div>
				<div class="hidden flex-none lg:block">
					{@render menu('menu menu-horizontal')}
				</div>
			</nav>
		</header>
		<main class="p-4">{@render children()}</main>
	</div>
	<div class="drawer-side lg:hidden">
		<label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
		{@render menu('menu bg-base-200 min-h-full w-80 p-4', true)}
	</div>
</div>
