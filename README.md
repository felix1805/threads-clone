# React App

This is a React application that uses components to display a social media feed.

## Installation

To install the application, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the cloned directory.
3. Run the command `npm install` to install the dependencies.

## Usage

To use the application, follow these steps:

1. Run the command `npx json-server --watch db.json` to start the json server.
2. Run the command `npm start`  in a separate terminal to start the development server.
2. Open your browser and navigate to `http://localhost:3001` to view the app.

## Components

The app is composed of several components:

- `Nav`: Renders the navigation bar.
- `Header`: Renders the header section.
- `Feed`: Renders the main feed.
- `PopUp`: Renders a popup for composing new threads or replies.
- `WriteIcon`: Renders an icon for starting a new thread.

## State Variables

The app uses several state variables:

- `user`: Holds information about the current user.
- `threads`: Holds the list of threads from the server.
- `viewThreadsFeed`: Determines whether to display the main feed or the reply threads.
- `filteredThreads`: Holds the filtered list of threads based on the current view mode.
- `openPopUp`: Determines whether the popup is open or closed.
- `interactingThread`: Holds the thread that the user is currently interacting with.
- `popUpFeedThreads`: Holds the list of threads in the popup feed.
- `text`: Holds the text input value for composing new threads or replies.

## API Requests

The app makes several API requests to fetch and post data:

- `getUser`: Fetches the user data based on the user ID.
- `getThreads`: Fetches the list of threads from the server.
- `getThreadsFeed`: Filters the threads based on the current view mode.
- `getReplies`: Fetches the list of reply threads for the selected thread.
- `postThread`: Posts a new thread or reply to the server.

## useEffect Hooks

The app uses several useEffect hooks to handle side effects:

- The first useEffect hook fetches the user data and the list of threads when the component mounts.
- The second useEffect hook re-fetches the list of threads whenever the user or the threads state variables change.
- The third useEffect hook re-fetches the reply threads whenever the interactingThread state variable changes.

## Click Handlers

The app defines a click handler function `handleClick` that is triggered when the user clicks on the write icon. This function opens the popup and resets the interactingThread and popUpFeedThreads state variables.

## Rendering

The app conditionally renders the components based on the user state variable. If the user is not null, the app renders the components. Otherwise, it renders nothing.

