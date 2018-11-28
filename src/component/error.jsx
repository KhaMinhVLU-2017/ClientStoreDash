import React from 'react'
import bg from '../upload/images/waterfall.jpg'
import {Col} from 'reactstrap'


const styleHeader = {
  fontWeight: 'bold',
  color: 'white',
  marginBottom: 30,
  textShadow: '3px 3px 15px red'
}
const ErrorNotFound = () => {
  return (
    <div>
      <img src={bg} style={{ width: '100vw', position: 'relative', height: '100vh', filter: 'brightness(50%)' }} alt='img' />
      <Col style={{ position: 'absolute', maxWidth: 500, textAlign: 'center', left: 0, right: 0, top: 0, bottom: 0, margin: '25vh auto' }} md={12} sm={12} xs={12}>
        <h1 style={styleHeader}>Not Found 404</h1>
      </Col>
    </div>
  )
}

export default ErrorNotFound
