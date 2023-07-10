import { toasts } from '$stores/app';

function addToast(message: string, type: "error" | "success" | "info", duration: number) {
	const toast = {
		id: `${Date.now()}_${type}_${duration}`,
		type,
		message,
		duration
	};

	toasts.update(($toasts) => [toast, ...$toasts]);

	setTimeout(() => {
		toasts.update(($toasts) => $toasts.filter((t) => t.id !== toast.id));
	}, toast.duration);
}

export function removeToast(toastId: string) {
	toasts.update(($toasts) => $toasts.filter((t) => t.id !== toastId));
}

export function showErrorToast(message: string, duration = 5_000) {
	addToast(message, "error", duration);
}

export function showSuccessToast(message: string, duration = 5_000) {
	addToast(message, "success", duration);
}
