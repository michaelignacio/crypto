import React, { Component } from 'react';
import axios from 'axios';
import RSSParser from 'rss-parser';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props); 

    this.state = {
      price: 0,
      oldPrice: 0,
      coin: 'bitcoin',
      currency: 'usd',
      feed: [],
      fetchedNews: false,
      fetchedPrice: false
    }

    this.fetchPrice= this.fetchPrice.bind(this, this.state);
  }

  fetchPrice = (coin) => {
    try {
      axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${this.state.coin}&vs_currencies=${this.state.currency}`)
        .then(response => {
          // console.log('fetched price');
          let price = response.data[this.state.coin][this.state.currency];
          if (this.state.oldPrice !== price) {
            this.setState({ oldPrice: this.state.price });
          }
          this.setState({
            price,
            fetchedPrice: true
          });
        })
        .catch(error => {
          console.log(error);
        });
    } catch(e) {
      console.log(e);
    }
  }

  fetchNews() {
    const URL = `https://cointelegraph.com/rss/tag/${this.state.coin}`;
    const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

    let parser = new RSSParser();
    (async () => {
      let feed = await parser.parseURL(CORS_PROXY + URL);
      feed.items.forEach(item => {
        // console.log(item);
      });
      console.log(feed.items);
      this.setState({ 
        feed: feed.items,
        fetchedNews: true
        // fetchedNews: false
      })
    })();
  }

  componentDidMount() {
    this.fetchPrice();
    setInterval(this.fetchPrice, 5000);
    this.fetchNews();
  }

  render () {
    return (
      <div className="container text-center">
        {this.state.fetchedPrice ? (
          <div className="mt-4">
            <div className="row flex-column">
              <div className="col-12 col-md-12">
                <h3 className="mb-0">The current price of <span className="coin">{this.state.coin}</span> is</h3>
                <h1 className="price mt-0">{this.state.price} <span className="currency">{this.state.currency}</span></h1>
                <PriceDifference oldPrice={this.state.oldPrice} newPrice={this.state.newPrice} />
              </div>
            </div>
            <div className="row justify-content-center mt-2">
              {this.state.fetchedNews ? <NewsFeed data={this.state.feed} /> : <h4>Loading...</h4>}
            </div>
          </div>
        ) : ( 
        <h4>
          Loading...
        </h4> ) }
      </div>
    );
  }
}

function NewsFeed(array) {
  let feed = array.data.slice(0,6).map(function(item){
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

function PriceDifference(oldPrice, newPrice) {
  console.log('went here');
  let message = '';

  if (oldPrice > 0) {
    console.log('old price greater than 0');
    if (newPrice > oldPrice) {
      message = 'Just went up!';
    } else {
      message = 'Just went down!';
    }
    message += ' Price was previously {oldPrice}';
    message = `<small>${message}</small>`;
  }

  return message;
}

export default App;
