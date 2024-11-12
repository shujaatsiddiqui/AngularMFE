const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, "../../tsconfig.json"), [
  /* mapped paths to share */
]);

module.exports = {
  target: "web",
  output: {
    uniqueName: "remote",
    publicPath: "auto",
    scriptType: "text/javascript",
  },
  optimization: {
    runtimeChunk: false,
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    },
  },
  experiments: {
    outputModule: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      //library: { type: "module" },

      // For remotes (please adjust)
      name: "remote",
      filename: "remoteEntry.js",
      exposes: {
        // "./AppModule": "./projects/remote/src/app/app.module.ts",
        // "./TodoModule": "./projects/remote/src/app/todo/todo.module.ts",
        "./ManageApplicationModule":
          "./projects/remote/src/app/manage-application.module.ts",
      },
      // exposes: {
      //   "./ManageApplicationModule": "./src/app/manage-application.module.ts",
      // },

      // // For hosts (please adjust)
      // remotes: {
      //   host: "host@http://localhost:4200/remoteEntry.js",
      // },

      shared: share({
        "@angular/core": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        "@angular/common": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        "@angular/common/http": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        "@angular/router": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        "@azure/msal-angular": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        "@azure/msal-browser": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },

        ...sharedMappings.getDescriptors(),
      }),
    }),
    sharedMappings.getPlugin(),
  ],
};
