const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, "tsconfig.json"), [
  /* mapped paths to share */
]);

module.exports = {
  output: {
    uniqueName: "person",
    publicPath: "auto",
  },
  optimization: {
    runtimeChunk: false,
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "person",
      filename: "remoteEntry.js",
      exposes: {
        './PersonModule': ".//src/app/person/person.module.ts",
      },

      shared: share({
        "@angular/core": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
          eager: true,
        },
        "@angular/common": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
          eager: true,
        },
        "@angular/common/http": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
          eager: true,
        },
        "@angular/router": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
          eager: true,
        },
        "@ngrx/store": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
          eager: true,
        },
        "@ngrx/effects": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
          eager: true,
        },

        ...sharedMappings.getDescriptors(true),
      }),
    }),
    sharedMappings.getPlugin(),
  ],
};
