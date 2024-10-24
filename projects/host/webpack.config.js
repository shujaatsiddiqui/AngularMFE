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
    // uniqueName: "host",
    // publicPath: "auto",
    // scriptType: "text/javascript",

    uniqueName: "host",
    publicPath: "http://localhost:4200/", // Explicitly set the publicPath if auto is not working
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
      name: "host",
      filename: "remoteEntry.js",
      // exposes: {
      //   "./AuthService": "./projects/host/src/app/store/auth/auth.service.ts",
      //   // "./AuthServices": "/projects/hos",
      // },

      // For hosts (please adjust)
      remotes: {
        remote: "remote@http://localhost:4300/remoteEntry.js",
      },

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

        "@ngrx/store": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        "@ngrx/effects": {
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
