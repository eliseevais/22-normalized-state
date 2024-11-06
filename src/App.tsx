import './App.css';
import {PostWall} from "./components/postWall/PostWall";
import {Provider} from 'react-redux';
import * as React from 'react';
import DenseAppBar from "./components/header/Header";
import {ProfileDescription} from "./components/profileDescription/profileDescription";

const App: React.FC<{ store: any }> = (props) => {
  return (
    <Provider store={props.store}>
      <DenseAppBar/>
      <div className="App">
        <ProfileDescription />
        <PostWall/>
      </div>
    </Provider>
  );
}

export default App;
