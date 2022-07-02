import React, { Component } from "react";
import "../SMSForm.css";

class SMSForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: {
        to: "",
        body: "Thank you for signing up for the Audbile 2-1 sale text notifications, we will inform you when this sale is next active.",
      },
      submitting: false,
      error: false,
    };
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onHandleChange(event) {
    const name = event.target.getAttribute("name");
    this.setState({
      message: { ...this.state.message, [name]: event.target.value },
    });
  }
  onSubmit(event) {
    event.preventDefault();
    this.setState({ submitting: true });
    fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.message),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          this.setState({
            error: false,
            submitting: false,
            message: {
              to: "",
              body: "",
            },
          });
        } else {
          this.setState({
            error: true,
            submitting: false,
          });
        }
      });
  }

  render() {
    return (
      <div className="container center">
        <h1>
          <span>audible</span> <br />
          <sub>2-1 Sale Text notifications</sub>
        </h1>

        <form
          onSubmit={this.onSubmit}
          className={this.state.error ? "error sms-form" : "sms-form"}
        >
          <div className="container--form">
            <input
              type="tel"
              name="to"
              id="to"
              value={this.state.message.to}
              onChange={this.onHandleChange}
              placeholder="123-456-7890"
            />

            <button type="submit" class="custom-btn btn-12">
              <span>Thanks!</span>
              <span>SIGN UP</span>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SMSForm;
