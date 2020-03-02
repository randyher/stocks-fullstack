import React from "react";
import {
  Button,
  Divider,
  Form,
  Grid,
  Segment,
  Image,
  Modal
} from "semantic-ui-react";

class Portfolio extends React.Component {
  state = {
    ticker: "",
    quantity: "",
    error: "",
    open: false
  };

  componentDidMount() {
    const { transactions } = this.props.user;
    const transactionsMap = this.hashMap(transactions);
    console.log(transactions);
    console.log(transactionsMap);
  }

  hashMap = array => {
    let obj = {};
    for (let elem of array) {
      if (obj[elem.ticker]) {
        obj[elem.ticker] += elem.quantity;
      } else {
        obj[elem.ticker] = elem.quantity;
      }
    }
    return obj;
  };

  onSubmit = () => {
    if (this.state.quantity < 1) {
      return alert("You must have a quantity greater than 1");
    } else {
      this.setState({ open: true });
    }
  };

  buyTheStock = () => {
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
          this.setState({
            error: `"${ticker}" is not a valid ticker`,
            open: false
          });
        } else {
          this.setState({ error: "", open: false }, () => {
            console.log(data);
            let transaction = {
              ticker,
              quantity: parseInt(this.state.quantity),
              user_id: this.props.user.id,
              cost: data.latestPrice * quantity
            };
            this.props.buyStock(transaction);
          });
        }
      });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  closeModal = () => {
    this.setState({ open: false });
  };

  render() {
    console.log(this.props);
    const { name, balance } = this.props.user;
    const { ticker, quantity, error } = this.state;
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
                  type="number"
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
              {error && <p style={{ color: "red" }}>{this.state.error}</p>}
            </Grid.Column>
          </Grid>

          <Modal size="tiny" open={this.state.open} onClose={this.closeModal}>
            <Modal.Header>Confirm Purchase</Modal.Header>
            <Modal.Content>
              <p>
                Are you sure you want to buy {quantity} shares of {ticker}
              </p>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={this.closeModal} negative>
                No
              </Button>
              <Button
                positive
                icon="checkmark"
                labelPosition="right"
                content="Yes"
                onClick={this.buyTheStock}
              />
            </Modal.Actions>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Portfolio;
