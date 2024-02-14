import React from 'react';
import {Store} from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import {createNotification} from './components/notificationHelper'

const Homepage: React.FC = () => {
  return (
    <>
      My Website
      <button
        onClick={() => {
          Store.addNotification({
            title: 'Dropbox',
            message: 'Files were synced',
            type: 'default',                         // 'default', 'success', 'info', 'warning'
            container: 'bottom-left',                // where to position the notifications
            animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
            animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
            dismiss: {
              duration: 3000
            }
          })
        }}
      >
        Add notification
      </button>
      <button onClick={()=>{
        createNotification('success', '', 'Sign-In success');
      }}>Show</button>
    </>
  )
}

export default Homepage;