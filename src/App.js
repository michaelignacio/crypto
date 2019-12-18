import React, { Component } from 'react';
import axios from 'axios';
import RSSParser from 'rss-parser';
import PriceDifference from './views/PriceDifference';
import NewsFeed from './views/NewsFeed';
// import TextForm from './views/TextForm';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props); 

    this.state = {
      price: 0,
      oldPrice: 0,
      coin: 'ethereum',
      currency: 'usd',
      feed: [],
      fetchedNews: false,
      fetchedPrice: false,
      formValue: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchPrice = this.fetchPrice.bind(this);
    this.fetchNews = this.fetchNews.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    // alert(this.state.value);
    this.setState({ 
      coin: this.state.value,
      fetchedPrice: false
    });
    event.preventDefault();
  }

  fetchPrice = (coin) => {
    console.log('price fetch');
    try {
      axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${this.state.coin}&vs_currencies=${this.state.currency}`)
        .then(response => {
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

  // fetchNews() {
  fetchNews = (coin) => {
    console.log('news fetch');
    const URL = `https://cointelegraph.com/rss/tag/${this.state.coin}`;
    const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
    let parser = new RSSParser();
    (async () => {
      let feed = await parser.parseURL(CORS_PROXY + URL);
      feed.items.forEach(item => {
        // console.log(item);
      });
      // console.log(feed.items);
      this.setState({ 
        feed: feed.items,
        fetchedNews: true
      })
    })();
  }

  componentDidMount() {
    this.fetchPrice();
    setInterval(this.fetchPrice, 5000);
    this.fetchNews();
    setInterval(this.fetchNews, 5000);
  }

  render () {
    return (
      <div className="container text-center">
        {this.state.fetchedPrice && this.state.fetchedNews ? (
          <div className="mt-4">
            <div className="row flex-column">
              <div className="col-12 offset-md-3 col-md-6">
              <form onSubmit={this.handleSubmit}>
                <div className="form-row justify-content-center mb-3">
                  <div className="col-auto">
                    <input 
                      type="text"
                      className="p-1 form-control"
                      placeholder="Name of crypto..." 
                      value={this.state.value} 
                      onChange={this.handleChange} 
                    />
                  </div>
                  <div className="col-auto">
                    <input 
                      className="p-1 btn btn-primary"
                      type="submit" 
                      value="Search" 
                    />
                  </div>
                </div>
              </form>
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

export default App;
