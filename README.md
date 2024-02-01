# NordLayer interview task
![master pipeline](https://github.com/318h7/nordlayer-app/actions/workflows/main.yml/badge.svg)

## React + TypeScript + Vite
Based on the vite `react-ts` template

## Development

### Running
Use `npm run dev` to run the app with HMR
Use `npm run preview` to launch a demo production build

### Linting

Use `npm run lint` to run the linter

### Testing
Use `npm run test` to run the vitest runner

## Internationalization

Internationalization is supported via `i18-next`
locales are stored in the `./src/locales/`

## What would I do if I had more time
* Add more tests
* Make more reusable components
* Improve the style system

### Excuses excuses...
I have faced an issue with the react-query and testing-library when
the hook does not update it's state and never returns data.
It looks like it's a recurring one, there are multiple tickets of the same thing for different versions 🙄 
This has sucked some time so I decided to leave it for later and since you have asked to submit it ASAP and I was not able to use the full week as designed, I left this issue unresolved. But the idea was to test the hook in isolation with all the logic and do less checks in integration 🤷