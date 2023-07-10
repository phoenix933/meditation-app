# Masterpeace

## Running the project

### In a web browser

To start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

### Live reload on a simulator 

To start a live reload session on an iPhone simulator first you need to make sure that your `capacitor.config.json` has a `server` entry configured, where `url` is your IP address (read more: https://capacitorjs.com/docs/guides/live-reload):

```
"server": {
  "url": "http://172.20.10.2:3000",
  "cleartext": true
},
``` 

Next, expose your local LAN by running the following command:

```bash
npm run dev -- --host
```

Next, run `npx cap copy` to copy the updated Capacitor config into all native projects.

Open the native IDE if it's not already open:

```bash
npx cap open ios
```

Finally, click the Run button to launch the app and start using Live Reload.

⚠️ Be careful not to commit the server config to source control.

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## When using the native app

Remember to update!

```
npx cap update (android|ios)
```

## Releasing for Android

Please read this [blog post](https://cprince.hashnode.dev/deploying-ionic-capacitor-apps-to-android-and-uploading-to-play-store).
