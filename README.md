# Deel frontend test
This is a TypeScript-based Autocomplete component for React that takes in various props such as value, className, placeholder, and onChange. It works by filtering options based on user input and displaying them in a dropdown list. Users can navigate through the options using the arrow keys, select an option by pressing Enter, or dismiss the list by pressing Escape or clicking outside of the component. The Autocomplete component also includes a loading indicator that displays while the options are being fetched.

## Installation
To install the Deel Frontend React App, follow these steps:

Clone the repository to your local machine by running the following command:
```
git clone https://github.com/wassim-dev/deel-frontend.git
```
Change into the project directory:

```
cd deel-frontend
```
Install the necessary dependencies by running the following command:
```
npm install
```
## Running the App
To run the Deel Frontend React App, follow these steps:

Start the development server by running the following command:
```
npm start
```
Once the server has started, you can view the app in your browser by navigating to http://localhost:3000.

### Usage of Autocomplete component
```
const App = () => {
  const loadData = (value: string) => {
    // fetch data based on input value
    // and return a Promise<string[]> of suggestions
  };

  const handleChange = (value: string) => {
    // handle input change
  };

  return (
    <Autocomplete
      loadData={loadData}
      onChange={handleChange}
      className="my-input-class"
      placeholder="Enter a value"
    />
  );
};
```

## Props
- `value` (optional): string - the initial value of the input field
- `className` (optional): string - the class name for the input field
- `placeholder` (optional): string - the placeholder text for the input field
- `onChange` (optional): (value: string) => void - callback function to handle input changes
- `loadData` (required): (value: string) => Promise<string[]> - function to load autocomplete suggestions based on input value
