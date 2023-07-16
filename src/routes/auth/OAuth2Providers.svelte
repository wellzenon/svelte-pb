<script lang="ts">
	import { Button } from '$components/ui/button';
	import { Icons } from '$components/docs';
	import { capitalize } from '$lib/utils';

	import type { PageServerData } from './$types';

	export let isLoading: boolean;
	export let providers: PageServerData['providers'];
	const providersWithIcons = providers.authProviders.map(({ name }) => ({
		name,
		logo: Icons[name as keyof typeof Icons] || null
	}));
</script>

{#each providersWithIcons as provider}
	<Button href="/oauth/{provider.name}" variant="outline">
		{#if isLoading}
			<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
		{:else if provider.logo}
			<svelte:component this={provider.logo} class="mr-2 h-4 w-4" />
		{/if}
		{' '}
		Connect with {capitalize(provider.name)}
	</Button>
{/each}
