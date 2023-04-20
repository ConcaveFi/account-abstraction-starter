## Starter web3 repo

This is a monorepo with `pnpm` workspaces and `turborepo`

```sh
pnpm install

# start apps/web dev server
pnpm dev
```

### Stack

- [Tailwind](https://tailwindcss.com/)
- [Wagmi](https://wagmi.sh)
- [@tanstack/query](https://tanstack.com/query/v4)
- [Dnum](https://github.com/bpierre/dnum)
- [Zerodev](https://zerodev.app/)

I'd recommend using [radix ui](https://www.radix-ui.com/) or [headless ui](https://headlessui.com/) for complex components like menus, tooltips etc
and [jotai](jotai.org) for global state, ala [Conduit](https://github.com/ConcaveFi/conduit)

### Setup

The Setup is pretty straight foward, very similar to `Conduit` but with Next `pages` instead of `app` dir

#### Contracts

There is a `contract.ts` and `abis.ts` add the top level, create a named export for each contract/abi instead of single export map, to ensure treeshaking works

You can see in `WagmiProvider` the `zerodev` config, it's an account abstractions sdk, that creates a smart wallet, session keys, batch transactions and sponsors the gas
It's early some stuff works weardly, if `zerodev` shows itself not to be relyabe, you can create a similar setup with [Web3Auth](https://web3auth.io/), [Safe](https://safe.global/) and [Gelato](https://www.gelato.network/)
