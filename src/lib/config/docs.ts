import type { NavItem } from '$lib/types/nav';

interface DocsConfig {
	mainNav: NavItem[];
}

export const docsConfig: DocsConfig = {
	mainNav: [
		{
			title: 'Home',
			href: '/'
		},
		{
			title: 'Auth',
			href: '/auth'
		}
	]
};
