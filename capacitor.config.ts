import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: '',
	appName: '',
	webDir: 'build',
	bundledWebRuntime: false,

	plugins: {
	},

	// Uncomment this for live reload
	server: {
		url: 'http://192.168.0.122:3000/',
		cleartext: true
	}
};

export default config;
