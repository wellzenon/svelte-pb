<script lang="ts">
	import '../app.postcss';
	import type { Record } from 'pocketbase';
	import { MainNav } from '$components/ui/nav';
	import { user } from '../store';

	export let data: { user: Record | null };
	$user = data?.user;
</script>

<MainNav />
<slot />
