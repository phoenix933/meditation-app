export type Toast = {
	id: string;
	message: string;
	type: 'success' | 'info' | 'warning' | 'error';
	duration: number;
};
