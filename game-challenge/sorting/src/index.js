import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const data = {
  topLabel: "Reichtum",
  bottomLabel: "Armut",
  order: ["item2", "item4", "item1", "item3"],
  items : {
    item1 : {
      image: "https://picsum.photos/400/300/?image=651",
      info: "3"
    },
    item2 : {
      image: "https://picsum.photos/400/300/?image=652",
      info: "1"
    },
    item3 : {
      image: "https://picsum.photos/400/300/?image=653",
      info: "4"
    },
    item4 : {
      image: "https://picsum.photos/400/300/?image=654",
      info: "3"
    },
    item5 : {
      image: "https://picsum.photos/400/300/?image=655",
      info: "3"
    }
  }
}

ReactDOM.render(<App data={ data }/>, document.getElementById('root'));
registerServiceWorker();
