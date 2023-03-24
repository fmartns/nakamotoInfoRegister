import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import moment from "moment"

ReactDOM.render(
    <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
      <App />
    </MuiPickersUtilsProvider>
  ,
  document.getElementById('root'),
)

reportWebVitals()
