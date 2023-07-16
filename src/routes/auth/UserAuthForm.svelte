<script lang="ts">
	import { enhance } from '$app/forms';
	import { Icons } from '$components/docs';
	import { Button } from '$components/ui/button';
	import { Input } from '$components/ui/input';
	import { Label } from '$components/ui/label';
	import { cn } from '$lib/utils';

	let className: string | undefined | null = undefined;
	export { className as class };
	let isLoading = false;
</script>

<div class={cn('grid gap-6', className)} {...$$restProps}>
	<div class="flex flex-col space-y-2 text-center">
		<h1 class="text-2xl font-semibold tracking-tight">Create an account</h1>
		<p class="text-sm text-muted-foreground">Enter your email below to create your account</p>
	</div>
	<form
		method="POST"
		action="/auth?/auth"
		use:enhance={({ formElement }) => {
			isLoading = true;
			return async ({ update }) => {
				await update({ reset: !!formElement.success });
				isLoading = false;
			};
		}}
	>
		<div class="grid gap-2">
			<div class="grid gap-1">
				<Label class="sr-only" for="email">Email</Label>
				<Input
					id="email"
					name="email"
					placeholder="name@example.com"
					type="email"
					autoCapitalize="none"
					autoComplete="email"
					autoCorrect="off"
					disabled={isLoading}
				/>
			</div>
			<Button disabled={isLoading}>
				{#if isLoading}
					<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				Enter with Email
			</Button>
		</div>
	</form>
	<div class="relative">
		<div class="absolute inset-0 flex items-center">
			<span class="w-full border-t" />
		</div>
		<div class="relative flex justify-center text-xs uppercase">
			<span class="bg-background px-2 text-muted-foreground"> Or continue with </span>
		</div>
	</div>
</div>
