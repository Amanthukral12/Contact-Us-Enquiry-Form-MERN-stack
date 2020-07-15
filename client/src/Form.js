import React, { Component } from 'react';
import axios from 'axios';

export default class Form extends Component {

    state = {
        name: '',
        phone: '',
        email: '',
        message: '',
        sent: false
    }

    handleName = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    handlePhoneNumber = (e) => {
        this.setState({
            phone: e.target.value
        })
    }

    handleEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    handleMessage = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    formSubmit = (e) => {
        e.preventDefault();

        let data = {
            name: this.state.name,
            phone: this.state.phone,
            email: this.state.email,
            message: this.state.message
        }

        axios.post('/api/forma', data)
            .then(res => {
                this.setState({
                    sent: true,
                }, this.resetForm())
            })
            .catch(() => {
                console.log('message not sent');
            })
    }

    resetForm = () => {
        this.setState({
            name: '',
            phone: '',
            email: '',
            message: ''
        })

        setTimeout(() => {
            this.setState({
                sent: false,
            })
        }, 3000)
    }


    render() {
        return (
            <div className="container">
                <h1>Contact Us</h1>
                <div className="border"></div>
                <form method="POST" action="/" onSubmit={this.formSubmit}>

                    <div className="singleItem">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" placeholder="Your Name" className="name" value={this.state.name} onChange={this.handleName} />

                    </div>
                    <div className="singleItem">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="text" name="phone" placeholder="Your Phone Number" className="phone" value={this.state.phone} onChange={this.handlePhoneNumber} />

                    </div>
                    <div className="singleItem">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" placeholder="Your Email" className="email" value={this.state.email} onChange={this.handleEmail} />

                    </div>
                    <div className="singleItem">
                        <label htmlFor="message">Message</label>
                        <textarea name="message" cols="30" rows="5" placeholder="Your Message" className="message" value={this.state.message} onChange={this.handleMessage} required >
                        </textarea>

                    </div>
                    <div className={this.state.sent ? 'msg msgAppear' : 'msg'}>Message has been sent</div>
                    <button className="btn" type="submit">Submit</button>
                </form>
            </div>
        )
    }
}