# In The Green 📈

A stock market tracking application that features quick calculations shares purchase price and shares potential sell price so the user can asses potential profit / deficit.

***UPDATE:*** AlphaVantage API not showing Australian Stock so search results will show US securities instead - looking for an alternative.

## User Story

```
AS an Australian stock trader

I WANT to quickly calculate potential selling price

SO THAT I can determine whether a profit is made after brokerage
```
## Get Started
Check the live version here:
https://inthegreen.herokuapp.com/

For local version:
```
1. npm install
2. npm run watch:fe
```
This will run the front end with **webpack** on localhost:8080

At this stage the back end script is strictly for heroku deployment.

## Primary Focus

To explore a range of technologies and improve my skills in:

```
Writing cleaner and readable code
✅ code for humans

Typescript
✅ understand the purpose of TS (static typing, modularity)
✅ practice using typing in code
✅ modularize code - sustainable and benefits from intellisense
✅ configure with tsconfig.json

Webpack
✅ configure webpack with typescript loader
✅ bundle successfully
✅ run dev server in development
⬜ bundle and serve backend code

Testing
✅ implement unit test with jest
⬜ implement integration test with jest

Vanilla Javascript
✅ refresh knowledge on JS fundamentals

eslint
✅ implement eslint with typescript

Materialize css
✅ incorporate a css library not used before
✅ used CDN
⬜ use local files through webpack (initially what I had done but too many unused scss files polluted the bundle)

```
## Challenges

```
⛔️ When trying to use cloneNode for calculation rows, typescript does not recognise cloned element as an HMTL type but instead a Node type. This means I cannot target the children elements to insert data.
```

## For Future Consideration

```
⬜ set different regions
✅ percentage indicator (profit/loss %) with matching colour
✅ save a default brokerage (indexedDB or localstorage)
⬜ show loading state when fetching api data
⬜ clear button to clear inputs
```
