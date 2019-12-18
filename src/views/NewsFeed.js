import React from 'react';

const NewsFeed = (array) => {
  let feed = array.data.slice(0,3).map(function(item){
    return (
      <div className="col-12 col-md-3 news-item text-center card" key={item.guid}>
        <a href={item.link} target="_blank" rel="noopener noreferrer">
          <img src={item.enclosure.url} alt={item.title}/>
        </a>
        <div className="news-text">
          <p className="font-weight-bold mb-0">
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              {item.title}
            </a>
          </p>
        </div>
      </div>
    );
  });

  return feed;
}

export default NewsFeed;
