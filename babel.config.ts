export default {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],
  plugins: ["@babel/plugin-transform-typescript"],
  jest: {
    module: true,
    imports: true,
  },
};
