import React from "react";
import { Button, Divider, Form, Grid, Segment, Image } from "semantic-ui-react";

class Portfolio extends React.Component {
  render() {
    console.log(this.props);
    const { name } = this.props.user;
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
              <Form>
                <p>Ticker</p>
                <input type="text" style={{ width: "60%" }} />

                <p>Quantity</p>
                <input type="text" style={{ width: "60%" }} />
              </Form>

              <Button style={{ "margin-top": "20px" }}>Buy Stocks</Button>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Portfolio;
