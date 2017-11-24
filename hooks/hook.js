const path = require('path');

require('ts-node').register({
  project: path.join(__dirname, 'tsconfig.json')
});

const filterScriptByHookType = (hook) => (el) => el.attrib.src && el.attrib.type && el.attrib.type.toLowerCase() === hook;
const findPlatformHooks = (doc, platform) => doc.findall(`./platform[@name="${platform}"]/ts-hook`);
const concatPlatformHooks = (doc) => (hooks, platform) => hooks.concat(findPlatformHooks(doc, platform));
const execHook = (context) => async (_, hook) => {
  const scriptLocation = path.resolve(hook.attrib.src);
  const hookModule = require(scriptLocation);
  if (typeof hookModule.default === 'function') {
    context.scriptLocation = scriptLocation;
    await hookModule.default(context);
  } else {
    throw new Error(`Unable to execute hook "${hook.attrib.src}". It has no default export.`);
  }
};
const reduceP = (array, fn, acc) => array.reduce(
  (p, v, i, a) => p.then((r) => Promise.resolve(fn(r, v, i, a))),
  Promise.resolve(acc)
);

module.exports = (context) => {
  const xml = context.requireCordovaModule('cordova-common/src/util/xml-helpers');
  const configPath = path.resolve(context.opts.projectRoot, 'config.xml');
  const doc = xml.parseElementtreeSync(configPath);
  const platforms = context.opts.platforms;
  const hook = context.hook;

  const globalHooks = doc.findall('./ts-hook')
  const hooks = globalHooks
    .reduce(concatPlatformHooks(doc), globalHooks)
    .filter(filterScriptByHookType(hook));

  reduceP(hooks, execHook(context));
};
