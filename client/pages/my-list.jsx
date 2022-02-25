import React from 'react';

export default class AllList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trails: []
    };
  }

  componentDidMount() {
    fetch('/api/my-trails', {
      method: 'GET',
      headers: {
        'X-Access-Token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoidGVzdDEiLCJpYXQiOjE2NDUyMjk0NjB9.TlbmsP7FLSu-q9qklAEBn8ZIRUT3MG7fBVD2CGm9EM4'
      }
    })
      .then(res => res.json())
      .then(trails => {
        this.setState({ trails });

      }
      );
  }

  render() {
    return (
        <>
        <div className="row justify-center" >
          <h3 className="add-trail-title">Trail List</h3>
        </div >

        <div>
          {
            this.state.trails.map(trail => {
              return (
                <div key={trail.trailId} className="row trail-entry">
                  <Trail trail={trail} />
                </div>
              );
            })
          }
        </div>
      </>
    );
  }
}

function Trail(props) {
  const { trailName, isDeleted, length, location, photoUrl, difficulty } = props.trail;

  if (isDeleted === false) {
    return (
      <>
        <div className="column-three-fifth position-relative">
          <div className="row">
            <div className="column-three-fourth trail-name">
              <p className="trail-name">{trailName}</p>
            </div>
            <div className="column-fourth trail-name text-align-end">
            </div>
          </div>
          <div className="row">
            <span className="trail-length-num">{length}</span><span className="trail-length-mi">miles</span>
          </div>
          <div className="row">
            {
              difficulty === 'easy'
                ? (
                <p className="intensity-rating-easy">EASY</p>
                  )
                : difficulty === 'moderate'
                  ? (
                <p className="intensity-rating-moderate">MODERATE</p>
                    )
                  : (
                <p className="intensity-rating-difficult">DIFFICULT</p>
                    )
            }
          </div>
          <div className="row">
            <p className="position-absolute trail-address">{location}</p>
          </div>
        </div>

        <div className="column-two-fifth">
          <img className="trail-img" src={photoUrl} alt="image of trail"/>
        </div>
      </>
    );
  }
}
