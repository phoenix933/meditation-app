import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const impactMedium = () => Haptics.impact({ style: ImpactStyle.Medium });
