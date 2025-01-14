import fs from "node:fs";
import path from "node:path";

/**
 * Dependencies that _are not_ bundled along with wrangler
 */
export const EXTERNAL_DEPENDENCIES = [
	"fsevents",
	"esbuild",
	"blake3-wasm",
	"miniflare",
	// todo - bundle miniflare too
	"selfsigned",
	"source-map",
	// CommonJS module using `module.require()` which isn't provided by `esbuild`
	"@cspotcode/source-map-support",
	"@esbuild-plugins/node-globals-polyfill",
	"@esbuild-plugins/node-modules-polyfill",
	"chokidar",
];

const pathToPackageJson = path.resolve(__dirname, "..", "package.json");
const packageJson = fs.readFileSync(pathToPackageJson, { encoding: "utf-8" });
const { dependencies, devDependencies } = JSON.parse(packageJson);

/**
 * Dependencies that _are_ bundled along with wrangler
 */
export const BUNDLED_DEPENDENCIES = Object.keys({
	...dependencies,
	...devDependencies,
}).filter((dep) => !EXTERNAL_DEPENDENCIES.includes(dep));
