# Fresh Cross Env

[![JSR](https://jsr.io/badges/@brunobrsampaio/fresh-cross-env)](https://jsr.io/@brunobrsampaio/fresh-cross-env)
[![JSR Score](https://jsr.io/badges/@brunobrsampaio/fresh-cross-env/score)](https://jsr.io/@brunobrsampaio/fresh-cross-env)

This plugin aims to help share environment variables using deno's fresh
framework.

# Before starting

We often come across the problem of needing to use certain values ​​found in
environment variables on the client-side, but we know that the `Deno` namespace
is not supported on the client-side, being used in a method, a `render` from
preact or anywhere else that depends on dynamic data.

Therefore, this plugin comes with a non-definitive solution, until the framework
becomes mature enough to solve this problem. Until now, the plugin only works
with reading variables. In the future, the possibility of manipulating them on
the client's side will be evaluated.

# Installation

```sh
deno add @brunobrsampaio/fresh-cross-env
```

# How to use

Before we start, it is necessary to understand that the plugin does not work
alone, it needs to receive a list of variables that will be shared with the
client-side. But why? Let's face it, it is very dangerous for any and all
information to be shared, we often have app keys, secret keys, etc., so we need
them to remain secure on the server-side, so we create a `whitelist` with only
the allowed variables. That said, create your list carefully.

```ts
import { crossEnvPlugin } from '@brunobrsampaio/fresh-cross-env';
import { FreshConfig, Plugin } from '$fresh/server.ts';

export default {
  plugins: [
    ...
    crossEnvPlugin([
      'ENV_VAR_1', // Current value 'String'
      'ENV_VAR_2', // Current value 'Number'
      'ENV_VAR_3', // Current value 'Boolean'
      'ENV_VAR_4', // Current value 'Json'
      'ENV_VAR_5', // Current value 'Array'
    ]),
    ...
  ],
} satisfies FreshConfig;
```

# Methods

## **`getEnv(name:string)`**

This simple method is responsible for reading the desired variable. This method
is not limited to just client-side use, but can also be used on the server-side.

```ts
Deno.env.set("ENV_VAR_1", "John Doe");
Deno.env.set("ENV_VAR_2", 123456789);
Deno.env.set("ENV_VAR_3", true);
Deno.env.set("ENV_VAR_4", JSON.stringfy(["John Doe", 33, true]));
Deno.env.set(
  "ENV_VAR_5",
  JSON.stringfy({ name: "John Doe", age: 33, is_active: true }),
);
```

```tsx
import { getEnv } from '@brunobrsampaio/fresh-cross-env';
import { useEffect } from 'preact/hooks';

export default () => {

  useEffect(() => {
    console.log(getEnv('ENV_VAR_1'));
    console.log(getEnv('ENV_VAR_2'));
    console.log(getEnv('ENV_VAR_3'));
    console.log(getEnv('ENV_VAR_4'));
    console.log(getEnv('ENV_VAR_5'));
  }, []);

  ...
}
```

You realize that the return is already treated, without the need to use a
treatment for each type.

### Return

```
// ENV_VAR_1
"John Doe"

// ENV_VAR_2
123456789

// ENV_VAR_3
true

// ENV_VAR_4
[
  "John Doe", 
  33, 
  true
]

// ENV_VAR_5
{ 
  "name": 'John Doe', 
  "age": 33, 
  "is_active": true 
}
```

The `getEnv` method is not limited to its use within hooks, but can be used in
the `render` of pages, components and islands.

```tsx
import { getEnv } from "@brunobrsampaio/fresh-cross-env";

const MyPage = () => {
  return (
    <p>
      My name is <strong>{getEnv("ENV_VAR_1")}</strong>
    </p>
  );
};

export default MyPage;
```

### Return

```html
<p>
  My name is <strong>John Doe</strong>
</p>
```

# Questions and solutions

In the future, doubts, problems and solutions may arise, so we will leave this
session to try to help you.

## What happens if I try to access a variable not defined in the plugin list?

If you try to access a variable that is not defined in the plugin's whitelist
using the `getEnv` method, it will work on the server-side, but on the
client-side it will return `undefined`.
