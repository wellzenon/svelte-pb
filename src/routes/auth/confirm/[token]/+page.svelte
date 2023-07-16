<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData & { ok: boolean; message: string };
</script>

<h1>{data.message}</h1>
