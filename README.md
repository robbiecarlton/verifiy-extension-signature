#### This is currently under revision. Major updates and testing suggestions are subject to change.

# Chaperone RSM

Chaperone is Holo's secure web-zone for managing access to an Agent's identity and connections. A
hApp developer will use the [Holo Hosting Web SDK](https://github.com/Holo-Host/web-sdk) which makes calls to `Chaperone` over our
[Cross-origin Message Bus (COMB)](https://github.com/Holo-Host/cross-origin-message-bus).

## Basic development environment

This guide assumes you are starting in the parent directory (`envoy-chaperone`).

Open 3 terminal windows to the `envoy-chaperone` directory.

### window 1

```
nix develop
cargo build
cargo build --bin lair-fallback && RUST_LOG=debug cargo run --bin envoy-testing-wrapper -- --lair-fallback $CARGO_TARGET_DIR/debug/lair-fallback
```

Check that the location is right for your lair-fallback binary (the last argument in the last command above). Depending on your setup, your `target` folder might be somewhere else.

This command runs envoy and all it's dependencies, including a holochain running dummy-dna.

If this works, you should see a log that ends with `status: Running`

### window 2

```
cd chaperone
yarn install
yarn dev:test-wrapper
```

This starts up a server for chaperone, currently on port 24274.

### window 3

```
cd dummy-ui
yarn install
yarn serve
```

This starts up a server for the dummy UI, currently on port 8787.

Now you can go to http://localhost:8787 and see the dummy ui. You can make anonymous calls to envoy using this ui, and sign up/sign in and make identified calls.

## Code Formatting

In Holo repos, we try to follow StandardJS code style. This is easy to do in VSCode if you use the [prettier-standard][] extension. Unfortunately, that extension does not support Svelte, so we define a `.prettierrc` to configure the [Svelte VSCode extension][svelte-ext].

All you have to do to get automatic code formatting is install those two extensions, and make sure they are your default formatters for JS and Svelte code, respectively.

In `.vscode/settings.json`, we have some configuration for VSCode that should run these formatters automatically.

### Explanation of contents of `.prettierrc`

This section explains the contents of `.prettierrc`. We can't use code comments because they're not allowed in JSON. See the [prettier docs][] for a list of possible options.

The lines until `"bracketSameLine"` are configuring prettier to obey StandardJS formatting. A reference for what prettier options result in StandardJS conformance can be found [in the source code of the `prettier-standard` extension][ps-source]

The rest of them (`"bracketSameLine"`, `"arrowParens"`, and `"trailingComma"`) are from the personal preferences of @robbiecarlton.

[prettier docs]: https://prettier.io/docs/en/options.html
[prettier-standard]: https://marketplace.visualstudio.com/items?itemName=numso.prettier-standard-vscode
[svelte-ext]: https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode
[ps-source]: https://github.com/sheerun/prettier-standard/blob/1e93300bcb7f4f967a2010df0a41730dcca0a714/src/utils.js#L47-L54
