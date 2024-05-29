'use client';
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import styles from './page.module.css';

export default function HomePage() {
  const [username, setUsername] = useState('');

  const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setUsername(e.target.value);
  };

  const handleSubmit = () => {
    // Add logic to handle getting Zuopins
    console.log('Get Zuopins for:', username);
  };

  return (
    <Container className={styles.main}>
      <Row className="justify-content-center">
        <Col md={8} className="text-center">
          <h1>Welcome to Zuopins</h1>
          <p>Quickly generate your GitHub portfolio with personalized links.</p>
          <Form>
            <Form.Group controlId="username">
              <Form.Control 
                type="text" 
                placeholder="Enter your GitHub username" 
                value={username}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleSubmit}>
              Get Zuopins
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
