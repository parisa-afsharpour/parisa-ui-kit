//tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    format: ["esm", "cjs"],
    dts: {
        tsconfig: "tsconfig.build.json"
    },
    clean: true,
    splitting: false,
    sourcemap: true,
    external: ["react", "react-dom", "antd"]
});