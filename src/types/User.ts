export type User = {
	id: string;
	email: string;
	stats: {
		completedSessions: number;
		lastSessionAt: Date;
		maxRunStreak: number;
		runStreak: number;
		runStreakUpdatedAt: Date;
		timeMeditated: number;
	};
	courses: {
		[key: string]: {
			isSaved: boolean;
			lastSession: number;
			maxSession: number;
			sessionsCount: number;
		};
	};
	lastSession?: {
		order: number;
		courseId: string;
	};
	subscription: {
		isValid: boolean;
		lastTransaction: any;
	};
};
