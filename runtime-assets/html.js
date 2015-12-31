import React, { Component } from 'react';

export default class HTML extends Component {

  render() {
    return (
      <html lang="en">
      <head>
        <meta charSet="utf-8"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
        <meta name='viewport' content='user-scalable=no width=device-width, initial-scale=1.0 maximum-scale=1.0'/>
      </head>
      <body className="landing-page">
        <div id="react-mount" dangerouslySetInnerHTML={{__html: this.props.body}} />
        <script src="/js/bundle.js" />
      </body>
      </html>
    )
  }
}
