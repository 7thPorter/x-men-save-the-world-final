# Use of React Hooks in this workshop

Several React Hooks were used in this workshop. There are many more, but this workshop covered the basics:

## useState

Perhaps the most foundational of all the hooks, useState allows functional components to maintain and update persistent state, just like class components can. The syntax for useState is as follows:

First, the state must be initialized like so - **const [variableName, setVariableName] = useState(defaultValue);** *Note that in this syntax, the setter (in this case, setVariableName) can be called anything you like. The way I've listed is common usage, but is by no means the only way to do it. Using set, followed by the variable name makes it easy to remember when coding and recognize which setters are doing what.

Accessing the state stored in *variableName* is as simple as utilizing it as you would any traditional variable (no *this.variableName* required).

In order to change the value of the variable, the syntax is - **setVariableName(newValue)**. Whatever is passed in as a parameter of the setter will become the new value of *variableName*.

## useEffect

The other half of the foundational hooks is useEffect. It functions in a way similar to the lifecycle methods we find in class components. The sytax for useEffect is like this:

**useEffect(() => {insertFunctionStuffsHere}, [dependenciesGoHere, separatedByCommas])** - useEffect is a function that is invoked when the code runs, rather than being defined and then invoked elsewhere. It accepts two parameters. The first is a function that tells the useEffect hook *what to do*. The second parameter is an array that tells useEffect *when to do it*. This second parameter, also known as the dependency array, can have a few different looks, depending on when you want your useEffect to fire. Let's take a look at those.

- **useEffect(() => {}, [])**: This style of useEffect (with an empty dependency array) will fire only once, when the component initially renders, and is similar to componentDidMount from class components
- **useEffect(() => {}, [dependency])**: This style of useEffect will listen for changes in the dependency listed and run the function laid out in the first parameter whenever there is a change to the dependency. The dependency is typically a variable, such as one we've established with useState. Multiple dependencies can be tied to a single useEffect hook. Simply separate the dependencies with commas in the array, and that useEffect statement will listen to them all.
- **useEffect(() => {})**: Finally, this style of useEffect (with no second parameter at all), will fire every time the component re-renders, similar to the class component's componentDidUpdate feature.

## useContext

useContext is a way for components to be connected (with the ability to pass functions or variables to components), without maintaining a direct parent-child link, as you find with props. I can define my context in a top-level component, then wrap the app, or specific components with the context's provider. Once a component has been wrapped (even if it's wrapped indirectly, via parents or grandparents or great-greats... Just has to be somewhere in the tree), it can access the context through the useContext hook. This can be confusing, so here's a small example:

>**High-level component (outside of function)**
>export const ExampleContext = React.createContext();

>**High-level component (inside return)**
><ExampleContext.Provider value={*whateverYouWantToPassThroughAsYourContext*}>
>Components to apply context to go here
></ExampleContext.Provider>

>**Lower-level component (outside function)**
>import ExampleContext from './WhereverYouMadeYourContext.js'

>**Lower-level component (inside function)**
>const { whateverYouWantToPassThroughAsYourContext } = useContext(ExampleContext);

Then, you can use *whateverYouWantToPassThroughAsYourContext* (I really should have picked a shorter variable name) in the lower-level component as you see fit.

## useRef
Finally, we covered useRef. UseRef is similar to useState in that it stores information, however, useRef does not change upon component re-rendering, and changing the value of useRef also does not cause a component tore-render. Of particular importance is the fact the useRef itself is not directly mutable. Instead, useRef is an object with a key called *current*, which we manipulate to store values. Here's an example:

1. **const exampleRef = useRef(defaultValue)** - In this example, the defaultValue passed in to useRef is *not* the value of useRef itself. Rather, it's the value of exampleRef's *current* key. Another way to visualize this might be like this: const exampleRef = {current: defaultValue};
2. Then, when we want to change the value of exampleRef's *current* key, we'll use **exampleRef.current = newValue**.

This way, we are able to change and track values "behind the scenes", so to speak. Changing the current value of a useRef won't force a re-render, but the changes are still tracked.

<hr />

That's all we covered in this workshop! Hopefully it was useful in figuring out React Hooks at a basic level :)
