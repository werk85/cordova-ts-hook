# cordova-ts-config

Cordova/Phonegap plugin to allow the definition of hooks via TypeScript

## Installation

```sh
cordova plugin add cordova-ts-hook
```

## Usage

In your `config.xml` replace all `<hook />` tags with `<ts-hook />`, change the extension of your hooks from `js` to `ts` and export your hook function via `export default function (context) {}`.

## Example

Create a file `hooks/hello-world.ts` in your project root.

```ts
import { Context } from 'cordova-ts-hook';

export default function (context: Context): void {
  console.log('Hello from TypeScript');
}
```

Now add the hook definition to the `config.xml` file

```xml
<?xml version='1.0' encoding='utf-8'?>
<widget id="com.biegertfunk.fragenapp" version="0.0.1" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
    ...
    <ts-hook src="hooks/hello-world.ts" type="before_prepare" />
    ...
</widget>
```

Your can now run `cordova prepare` too see the console log output from your hook.

### Async

You are able to write async hooks that are executed serially via e. g.

```ts
export default function (context: Context): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 3000));
}
```