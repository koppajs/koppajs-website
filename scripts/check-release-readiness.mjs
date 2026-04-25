import { readFileSync } from "node:fs";

const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
const packageLock = JSON.parse(readFileSync("package-lock.json", "utf8"));

const fail = (message) => {
  console.error(message);
  process.exitCode = 1;
};

const tagName = process.env.GITHUB_REF_NAME;

if (tagName) {
  const tagVersion = tagName.replace(/^v/, "");

  if (tagVersion !== packageJson.version) {
    fail(
      `Release tag ${tagName} does not match package.json version ${packageJson.version}.`,
    );
  }
}

const docsSpec = packageJson.dependencies?.["koppajs-documentation"];
const lockRootSpec =
  packageLock.packages?.[""]?.dependencies?.["koppajs-documentation"];
const lockPackage =
  packageLock.packages?.["node_modules/koppajs-documentation"];

if (!docsSpec) {
  fail("koppajs-documentation dependency is missing from package.json.");
} else if (docsSpec.startsWith("file:")) {
  fail("koppajs-documentation must be pinned to a released GitHub tag.");
} else if (
  !/^https:\/\/github\.com\/koppajs\/koppajs-documentation\/archive\/refs\/tags\/v\d+\.\d+\.\d+\.tar\.gz$/.test(
    docsSpec,
  )
) {
  fail("koppajs-documentation must use the GitHub tag archive URL format.");
}

if (lockRootSpec !== docsSpec) {
  fail("package-lock.json root dependency does not match package.json.");
}

if (!lockPackage) {
  fail("package-lock.json is missing node_modules/koppajs-documentation.");
} else if (lockPackage.resolved !== docsSpec) {
  fail(
    "package-lock.json does not resolve koppajs-documentation to the tag URL.",
  );
} else if (lockPackage.link) {
  fail("package-lock.json still treats koppajs-documentation as a local link.");
}

const lockText = JSON.stringify(packageLock);

if (
  lockText.includes("file:../koppajs-documentation") ||
  lockText.includes("../koppajs-documentation")
) {
  fail("package-lock.json still references the local documentation checkout.");
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log("Release readiness check passed.");
