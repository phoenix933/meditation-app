export const Routes = {
	// Static
	DISCOVER: '/discover',
	HOME: '/',
	FAVORITES: '/favorites',
	LOGIN: '/login',
	PROFILE: '/profile',
	SIGNUP: '/signup',
	SUBSCRIBE: '/subscribe',

	// Dynamic
	course: (courseId: string) => `/courses/${courseId}`,
	session: (courseId: string, session: number) => `/courses/${courseId}/${session}`,
	subscribeWithRedirect: (redirect: string) => `/subscribe?redirect=${redirect}`
};

export const goBack = () => history.back();
