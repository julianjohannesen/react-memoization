Notes on an article on various ways to memoize in React.

## What does memoizing do in React?

Memoize hooks make it possible for React to remember data or functions that might cause re-rendering when re-rendering is not needed. They can also preserve or cache data or functions, so new copies are not created.

## What do the different memoize functions do for functional components?

They give to functional components the versatility that shouldComponentUpdate and PureComponent give to class components - namely being able to specify when a component should update and also being able to memoize callbacks that would otherwise be newly initialized on every render.

Memoization hooks also allow you to optimize during first load as well as on update, all while maintaining a small bundle size. 

Pure and Class components do not allow you to optimize during first load, and they both have larger bundle sizes.

## What's the difference between storing data and memoizing data? 

Stored data actually affects the UI. Memoized data does not. That's a generalization. The useRef hook can do both. It an store data and memoize data.

React's storage hooks are useState and useRef.

React's memoizing hooks are useRef, useCallback, and useMemo.

## What does useMemo do?

useMemo memoizes by taking a function that needs to be memoized and an array of values that when changed, would invalidate the memoization.

## What's the difference between React.memo and React.useMemo?

