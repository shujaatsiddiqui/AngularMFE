/**
 * This is a config object for setting up a remote module/component in a micro-frontend (MFE) setup.
 * Basically, it lets your host app load and use a module or component from another remote MFE app.
 *
 * @typedef {Object} PlatformConfig
 *
 * @property {Object} identifier - A unique key for the remote module/component you're bringing in.
 *    This is the "ID" that helps the app figure out where the remote module lives and how to load it.
 *
 * @property {string} identifier.path - The route or path in your host app where the module/component will appear.
 *    Think of this as the "URL" or "route" where the component will be accessed.
 *
 * @property {string} identifier.remoteEntry - The URL to the `remoteEntry.js` file from the remote MFE app.
 *    This is the entry point the host app uses to load the remote app's code and metadata.
 *
 * @property {string} identifier.remoteName - The name of the remote MFE app that you're loading the module from.
 *    It's like the ID for the remote app in the Webpack Module Federation setup.
 *
 * @property {string} identifier.exposedModule - The specific module or file being shared from the remote app.
 *    This points to the exact component or module you want to use in your host app (e.g., a React component or Angular module).
 *
 * @property {string} identifier.exposedModuleName - The name the remote module (e.g if exposedModule is "./TodoModule", then exposedModuleName is "TodoModule").
 *    This is how your host app will import and use the module.
 */

const platformConfig = {
  identifier: {
    path: "<path-where-component-will-be-served>", // Where in your app will the module be loaded
    remoteEntry: "<url-to-remoteEntry.js>", // The URL to the remote entry point (remoteEntry.js)
    remoteName: "<remote-name>", // The name of the remote MFE app
    exposedModule: "<path-to-exposed-module>", // The internal path to the module inside the remote app
    exposedModuleName: "<name-under-which-exposed-module-will-be-imported>", // The name under which the exposed module will be exported in the remote app
    query: {
      isRequired: false, // Is the query parmas required in the URL to be loaded? (Optional flag...e.g [true | false])
      params: [], // Any query params if needed (e.g ["id", "version"])
    },

    // .... rest of the config goes here (there can be more than `one` module)
  },
};

/**
 * *******[IMPORTANT]*******
 * Don't forget! You’ll need a JSON file for this config, which can be served from your assets folder (for Testing purposes).
 * Alternatively, you can use this structure to create or update the response from your API.
 */
