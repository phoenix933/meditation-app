import type { Session } from './Session';

export type Course = {
	description: string;
	id: string;
	name: string;
	thumb: string;

	sessions: Session[];
};
