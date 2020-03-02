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
    open: false,
    userTransactions: [],
    totalValue: 0,
    confirm: "",
    loaded: false
  };

  componentDidMount = () => {
    const { transactions } = this.props.user;
    const portfolioMap = this.hashMap(transactions);

    for (let transactionTicker in portfolioMap) {
      fetch(
        `https://cloud.iexapis.com/stable/stock/${transactionTicker}/quote?token=sk_05ef7def9e0e4e3db27fabe268e9f99a`
      )
        .then(res => res.json())
        .then(transactionData => {
          const transaction = {
            ticker: transactionTicker,
            shares: portfolioMap[transactionTicker],
            currentValue:
              transactionData.latestPrice * portfolioMap[transactionTicker],
            change: transactionData.change
          };
          this.setState({
            userTransactions: [...this.state.userTransactions, transaction],
            totalValue: (this.state.totalValue += transaction.currentValue)
          });
        });
    }
  };

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
      this.setState({ error: "Quantity must be greater than 1" });
      return;
    } else {
      this.setState({ open: true });
    }
  };

  buyTheStock = () => {
    let { ticker, quantity } = this.state;
    ticker = ticker.toUpperCase();
    console.log(ticker);
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
        if (data.error) {
          this.setState({
            error: `"${ticker}" is not a valid ticker`,
            open: false,
            confirm: ""
          });
        } else if (data.latestPrice * quantity > this.props.user.balance) {
          this.setState({
            error: "You have insufficient balance",
            open: false,
            confirm: ""
          });
        } else {
          const { transactions } = this.props.user;
          const portfolioMap = this.hashMap(transactions);
          let userTransactionsArray = [];

          if (Object.keys(portfolioMap).includes(ticker)) {
            const shares = parseInt(portfolioMap[ticker]) + parseInt(quantity);
            const newTransaction = {
              ticker,
              shares,
              currentValue: data.latestPrice * shares,
              change: data.change
            };
            userTransactionsArray = this.state.userTransactions.map(
              transaction => {
                if (transaction.ticker === ticker) {
                  return newTransaction;
                } else {
                  return transaction;
                }
              }
            );
          } else {
            const shares = parseInt(quantity);
            const newTransaction = {
              ticker,
              shares,
              currentValue: data.latestPrice * shares,
              change: data.change
            };
            userTransactionsArray = [
              ...this.state.userTransactions,
              newTransaction
            ];
          }

          this.setState(
            {
              error: "",
              open: false,
              userTransactions: userTransactionsArray,
              confirm: `${ticker} was successfully purchased`
            },
            () => {
              let transaction = {
                ticker,
                quantity: parseInt(this.state.quantity),
                user_id: this.props.user.id,
                cost: data.latestPrice * quantity
              };
              this.props.buyStock(transaction);
            }
          );
        }
      });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  closeModal = () => {
    this.setState({ open: false });
  };

  fontColor = change => {
    if (change > 0) {
      return { color: "green" };
    } else if (change === 0) {
      return { color: "grey" };
    } else if (change < 0) {
      return { color: "red" };
    }
  };

  render() {
    const { name, balance } = this.props.user;
    const { ticker, quantity, error, confirm, userTransactions } = this.state;

    userTransactions.sort((transactionA, transactionB) => {
      return transactionA.ticker.localeCompare(transactionB.ticker);
    });
    const transactionList = userTransactions.map(transaction => {
      return (
        <li className="portfolio-li" style={this.fontColor(transaction.change)}>
          {transaction.ticker}- {transaction.shares} Shares
          {"      $" + transaction.currentValue.toFixed(2)}
        </li>
      );
    });

    return (
      <div>
        {this.props.user && (
          <h1>Welcome, {name.charAt(0).toUpperCase() + name.slice(1)}</h1>
        )}
        <div className="portfolio-page">
          <Grid columns={2} padded>
            <Grid.Column>
              <h1>Portfolio</h1>
              <h3> Your Value: ${this.state.totalValue.toFixed(2)}</h3>
              <ul className="transaction-ul">{transactionList}</ul>
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
              {confirm && (
                <p style={{ color: "green" }}>{this.state.confirm}</p>
              )}
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
