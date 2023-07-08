<script lang="ts">
	import { docsConfig } from '$lib/config/docs';
	import { siteConfig } from '$lib/config/site';
	import { Icons } from '$components/docs';
	import { cn } from '$lib/utils';
	import { user } from '../../../../store';
	import { Button } from '$lib/components/ui/button';
	import { applyAction, enhance } from '$app/forms';
</script>

<div class="mr-4 hidden md:flex">
	<a href="/" class="mr-6 flex items-center space-x-2">
		<Icons.logo class="h-6 w-6" />
		<span class="hidden font-bold sm:inline-block">
			{siteConfig.name}
		</span>
	</a>
	<nav class="flex items-center space-x-6 text-sm font-medium">
		<p>{$user?.email || 'No User'}</p>
		{#each docsConfig.mainNav as navItem}
			<a
				href={navItem.href}
				class={cn(
					'transition-colors hover:text-foreground/80'
					// $page.url.pathname === navItem.href ? 'text-foreground' : 'text-foreground/60'
				)}
				target={navItem.external ? '_blank' : undefined}
				rel={navItem.external ? 'noreferrer' : undefined}
			>
				{navItem.title}
			</a>
		{/each}
		{#if $user?.email}
			<form
				action="/auth?/logout"
				method="POST"
				use:enhance={() =>
					async ({ result }) => {
						$user = null;
						applyAction(result);
					}}
			>
				<Button>Logout</Button>
			</form>
		{:else}
			<form action="/auth">
				<Button>Login</Button>
			</form>
		{/if}
	</nav>
</div>
