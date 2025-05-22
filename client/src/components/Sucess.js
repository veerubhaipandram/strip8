import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Sucess() {
  return (
    <Container className="text-center p-5">
      <h1>Thank you for your purchase!</h1>
      <Link to="/"><Button>Back to Home</Button></Link>
    </Container>
  );
}