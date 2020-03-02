import React from "react";
import { Button, Divider, Form, Grid, Segment, Image } from "semantic-ui-react";

class Transaction extends React.Component {
  render() {
    console.log(this.props);
    const { name, balance, transactions } = this.props.user;
    const transactionList = transactions.map(transaction => {
      return (
        <li className="transaction-li">
          BUY {transaction.ticker}- {transaction.quantity} Shares @
          {" $" + transaction.cost}
        </li>
      );
    });
    return (
      <div>
        {/* {this.props.user && (
          <h1>Welcome, {name.charAt(0).toUpperCase() + name.slice(1)}</h1>
        )} */}
        <div className="portfolio-page">
          <Grid columns={2} padded>
            <Grid.Column>
              <h1>Transactions</h1>
              <ul className="transaction-ul">{transactionList}</ul>
            </Grid.Column>
            <Grid.Column></Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Transaction;
