import { Routes } from '$lib/routes';

export const FOOTER_ROUTES = [Routes.DISCOVER, Routes.FAVORITES, Routes.HOME, Routes.PROFILE];

export const isFooterRoute = (route: string) => FOOTER_ROUTES.includes(route);
