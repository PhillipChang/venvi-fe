import React from 'react';

import './style.css';

var userid;

function Card(props){

    userid = props.match.params.id;
    

    return (

  <div className="uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin" uk-grid>
      <div>
          <div class="uk-card-body">
              <h3 class="uk-card-title">USER STUFF</h3>
              <p>USER ID: {userid} </p>
          </div>
      </div>
  </div>

 )
}


export default Card;