import antfu from "@antfu/eslint-config";

export default antfu({
  react: true,
  nextjs: true,
  typescript: true,
  ignores: ["node_modules", ".next", "dist"],
});
