# Pokemon Memory Card
A pokemon themed memory card game built with React.

## Preview
## [Play](https://pokemon-memory-cards-by-sairacat.vercel.app/)

## How to play?
1. Click card to earn points.
2. **Don't click same card twice.**
3. Cards will be shuffled after each click.

## Built with
- React
- Javascript
- CSS
- PokeAPI

## Practiced & Reviewed Techniques
- `useState()` hook
- `useEffect()` hook
- `useRef()` hook
- Asynchronous JavaScript (`async`/`await` & `Promise.all()`) for fetching API data

## Component Structure & How they work
src/
└── components/
    ├── App.jsx
    ├── ButtonCard.jsx
    ├── Gameboard.jsx
    ├── Homepage.jsx
    ├── Loading.jsx
    └── Result.jsx

- App holds most state variables and callbacks, passes them down to other components for rendering, and receive updated data triggered by its child components.
- pageIndex state in App controls which component get mounted/rendered(e.g., Homepage gets rendered when pageIndex === 0).
- Loading handles asynchronous fetching data. useEffect hook is in this component. Whenever it gets mounted, callbacks in the Effect will get called.
- Other components just render contents determined by its states or props and invoking callbacks(update state) passed from App.