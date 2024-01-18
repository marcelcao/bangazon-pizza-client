/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div className="sign-in-container">
      <div>
        <img src="/homepagepizza.jpeg" alt="Pizza Splash PAge" className="pizza-home" />
      </div>
      <div className="sign-in-copy">
        <img src="/wangslogo.png" alt="Company Logo" className="sign-in-logo" />
        <h1>Get the Party Started</h1>
        <p>Sign in with</p>
        <Button className="sign-in-btn" onClick={signIn}>
          <img src="/google.png" alt="google sign in" className="google-button" />Google
        </Button>
        <footer className="sign-in-footer">Powered By: Bangazon | Github: <Link href="https://github.com/marcelcao">@marcelcao</Link></footer>
      </div>
    </div>
  );
}

export default Signin;
