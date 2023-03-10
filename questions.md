# Questions 

## 1 - What is the difference between Component and PureComponent? give an example where it might break my app.

A Component re-renders every time it receives new props or state, regardless of whether the new values are different from the old ones or not. This can result in unnecessary re-renders and affect performance.
but the PureComponent implements a shallow comparison of props and state, and only re-renders if there are changes. This can improve performance by reducing unnecessary re-renders.
### Example :
For instance, let's say we have a lengthy list of items, and each item is representedby a separate component. If any changes occur in the state of these items, it willresult in a re-rendering of all components. This can be problematic, as it could causeunnecessary re-renders of items that were not affected by the state change,potentially slowing down the app's performance.

-------

## 2 - Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

The problem is that if we use `shouldComponentUpdate` in a component that relies on data from Context, we may accidentally block the propagation of that data. If the data in the Context changes but the component's props or state haven't changed in a meaningful way, `shouldComponentUpdate` may incorrectly determine that the component doesn't need to be re-rendered. As a result, the data from Context may not be propagated to the child components that need it.

## 3 - Describe 3 ways to pass information from a component to its PARENT.

### Using Callback functions:
 ```
function Parent() {
    function handleData(data) {
        console.log(data);
    }
    return (
        <Child onData={handleData} />
    );
}

function Child(props) {
    function handleClick() {
        props.onData('some data');
    }
    return <button onClick={handleClick}>Pass data to parent</button>;
}
 ```

### Using Context:
```
const DataContext = React.createContext();

function Parent() {
  const [data, setData] = useState('initial data');

  return (
    <DataContext.Provider value={setData}>
      <Child />
    </DataContext.Provider>
  );
}

function Child() {
  const setData = useContext(DataContext);

  function handleClick() {
    setData('updated data');
  }

  return (
    <button onClick={handleClick}>Update data</button>
  );
}
```

### Using Event Bubbling
```
function Parent() {
  function handleData(event) {
    console.log(event.target.dataset);
  }

  return (
    <div onClick={handleData}>
      <Child />
    </div>
  );
}

function Child() {
  return (
    <button data-info="some data">Click me</button>
  );
}
```

( Also there is another way by using `Refs` to retrieve data from child components, but in this method the trigger event will be in the parent component )

## 4 - Give 2 ways to prevent components from re-rendering.

 - We can prevent components from re-rendering by using PureComponent (or React.memo in functional components)
 - Also using `ShouldComponentUpdate` lifecycle method If you are using class components.

 ## 5 - What is a fragment and why do we need it? Give an example where it might break my app.

A fragment is a tool used to group a list of children without introducing additional nodes to the DOM hierarchy. In the following example, to ensure that the `<li>` tag is a direct child of the `<ul>` tag, we need to utilize a fragment within the Menu component. This allows us to return a list of children without creating any extra nodes in the DOM:

```
<ul className="navbar-nav">
    <li className="nav-item"> Home </li>
    <Menu />
</ul>

function Menu() {
  return (
    <>
        <li className="nav-item"> Page 1 </li>
        <li className="nav-item"> Page 2 </li>
        <li className="nav-item"> Page 3 </li>
    </>
  );
}

```
There are some cases where using a fragment might break the app. For example, some third-party libraries may require a single top-level element in order to work properly.

## 6 - Give 3 examples of the HOC pattern.

- Authentication HOC: A HOC that takes a component and returns a new component that checks if the user is authenticated. If the user is not authenticated, the HOC can redirect them to a login page or display an error message.

- Logging HOC: A HOC that takes a component and logs all interactions with the component, including when it is mounted, unmounted, and updated.

- Redux HOC: A HOC that connects a component to the Redux store and provides it with the necessary state and actions.

## 7 - what's the difference in handling exceptions in promises, callbacks and async...await.

- Promises: When an error occurs in a Promise, it can be caught by the catch method of the Promise.
    ```
    fetch( ... )
        .then( ... )
        .catch((error) => ... )
    ```
- Async/Await: With Async/Await, errors can be handled using a try/catch block
    ```
    try {
        await fetch( ... )
    } catch (error) {
        ...
    }
    ```
## 8 - How many arguments does setState take and why is it async. 

The setState method takes two arguments : 
- Arg 1 : the value that represents the new state value to set (it can be a callback function)
- Arg 2 : An optional callback function that is called once the state has been updated.

The reason why setState is asynchronous is that React batches multiple state updates together and updates the DOM in a single pass. This means that multiple setState calls may be grouped together and executed at once, rather than updating the state and re-rendering the component after each individual call.


## 9 - List the steps needed to migrate a Class to Function Component.

- Remove state and lifecycle methods and use hooks instead.
- Convert render() method to return statement.
- Remove this keyword.
- Convert this.props to props.
- Convert event handlers.

# 10 - List a few ways styles can be used with components.

- Inline styles : ```<div style={style}> ...```
- External stylesheets : ```import './MyComponent.css';```
- CSS Modules :
    ```
    import styles from './MyComponent.module.css';
    ...
    <div className={styles.myComponent}>
    ```
- CSS-in-JS libraries
    ```
    import styled from 'styled-components';
    const StyledDiv = styled.div`
        background-color: blue;
        color: white;
    `;
    ```

## 11 - How to render an HTML string coming from the server.
We can render an HTML string coming from the server using the `dangerouslySetInnerHTML` attribute
```
<div dangerouslySetInnerHTML={{ __html: htmlString }} />
```