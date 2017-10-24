import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';
import Modal from './auth/Modal';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginModal: false
    };
    this.toggleLoginModal = this.toggleLoginModal.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }

  toggleLoginModal() {
    this.setState({ showLoginModal: !this.state.showLoginModal });
  }

  handleClick = e => {
   if(!ReactDOM.findDOMNode(this).contains(e.target)) {
     this.setState({ showLoginModal: false });
     this.props.dispatch(actions.hideForgotPasswordModal());
   }
  }

  renderContent() {
   switch(this.props.auth) {
     case null:
      return;
     case false:
       return [
         <li key='1'><a onClick={this.toggleLoginModal}>Login</a></li>,
         <li key='2'><Link to='/signup'>Sign Up</Link></li>
       ];
     default:
       return [
         <li key='1'>Welcome</li>,
         <li key='2'><a href='/api/logout'>Logout</a></li>
       ];
     }
   }


  render() {
    return (
      <div>
        <nav>
          <div className='nav-wrapper'>
            <Link to='/' className='left brand-logo'>
              Voting App
            </Link>
            <ul className='right'>
              {this.renderContent()}
            </ul>
          </div>
        </nav>
        {!this.props.auth &&
        <Modal showLoginModal={this.state.showLoginModal} />}
      </div>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, null)(Header);
