import React from "react";
import { Button, Divider, Form, Grid, Segment, Image } from "semantic-ui-react";

class Portfolio extends React.Component {
  state = {
    ticker: "",
    quantity: "",
    error: ""
  };

  onSubmit = () => {
    const { ticker, quantity } = this.state;
    fetch(
      `https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=sk_05ef7def9e0e4e3db27fabe268e9f99a`
    )
      .then(res => {
        if (res.status === 404) {
          return { error: "Ticker is not valid" };
        } else {
          return res.json();
        }
      })
      .then(data => {
        console.log(data);
        if (data.error) {
          this.setState({ error: "This is not a valid ticker" });
        } else {
          this.setState({ error: "" }, () => {
            this.props.buyStock(data);
          });
        }
      });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    console.log(this.state);
    const { name, balance } = this.props.user;
    return (
      <div>
        {this.props.user && (
          <h1>Welcome, {name.charAt(0).toUpperCase() + name.slice(1)}</h1>
        )}
        <div className="portfolio-page">
          <Grid columns={2} padded>
            <Grid.Column>
              <h1>Portfolio</h1>
            </Grid.Column>
            <Grid.Column>
              <h1>Buy Stock</h1>
              <h3>Current Balance: ${balance} </h3>
              <Form onSubmit={this.onSubmit}>
                <p>Ticker</p>
                <input
                  type="text"
                  style={{ width: "60%" }}
                  name="ticker"
                  onChange={this.onChange}
                />

                <p>Quantity</p>
                <input
                  type="text"
                  style={{ width: "60%" }}
                  name="quantity"
                  onChange={this.onChange}
                />
                <br />
                <Button type="submit" style={{ "margin-top": "20px" }}>
                  Buy Stocks
                </Button>
              </Form>
              <br />
              {this.state.error && (
                <p style={{ color: "red" }}>{this.state.error}</p>
              )}
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Portfolio;
