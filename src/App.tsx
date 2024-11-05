import './App.css';
import {PostPages} from "./pages/PostPage";
import {Provider} from 'react-redux';
import * as React from 'react';
import DenseAppBar from "./features/appBar/AppBar";
import {MyProfile} from "./features/myProfile/MyProfile";

const App: React.FC<{ store: any }> = (props) => {
  return (
    <Provider store={props.store}>
      <DenseAppBar/>
      <div className="App">
        <MyProfile />
        <PostPages/>
      </div>
    </Provider>
  );
}

export default App;
