<script lang="ts">
	import { page } from '$app/stores';

	const email = $page.url.searchParams.get('email')?.toString() || '';
	$: emailProviderUrl = email ? email.slice(email.toString().indexOf('@') + 1).toString() : '';
</script>

<div class="container grid h-80 place-items-center mx-auto w-full">
	<div class="flex flex-col space-y-3 text-center">
		<h1 class="text-2xl font-semibold tracking-tight">Check your email</h1>
		<p class="text-sm text-muted-foreground">The Magic Link was sent to your email {email}</p>

		<a
			target="_blank"
			rel="noopener"
			href={`http://www.${emailProviderUrl}`}
			class="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
		>
			Go to <b>{`: ${emailProviderUrl}`}</b>
		</a>
	</div>
</div>
