<script lang="ts">
	import type { Record } from 'pocketbase';
	import '../app.postcss';
	import Button from '$components/ui/button/Button.svelte';

	export let data: { user: Record };
</script>

<div class="flex">
	<p>{data?.user?.email || 'No User'}</p>
	<form action="/auth?/logout" method="POST">
		<Button>Logout</Button>
	</form>
</div>
<slot />
