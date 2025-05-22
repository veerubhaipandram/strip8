import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

export default function Cancel() {
  return (
    <Container className="text-center p-5">
      <h1>Payment Failed or Cancelled</h1>
      <Link to="/cart"><Button>Return to Cart</Button></Link>
    </Container>
  );
}