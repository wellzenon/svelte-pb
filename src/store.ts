import type { Admin, Record } from 'pocketbase';
import { writable } from 'svelte/store';

export const user = writable<Record | Admin | null>(null);
