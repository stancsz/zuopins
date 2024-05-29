'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import styles from './page.module.css';

export default function HomePage() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission
    if (username) {
      router.push(`/${username}`);
    }
  };

  return (
    <Container className={styles.main}>
      <Row className="justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Col md={8} className="text-center">
          <h1 className={styles.title}>Zuopins</h1>
          <p className={styles.tagline}>Your personal developer link hub</p>
          <p className={styles.description}>
            Zuopins is a 100% free tool for developers to quickly generate a personalized link hub, similar to Linktree, 
            but tailored specifically for GitHub users. Easily share your projects, contributions, and more with a single link.
          </p>
          <Form onSubmit={handleSubmit} className={styles.form}>
            <Form.Group controlId="username">
              <Form.Control 
                type="text" 
                placeholder="Enter your GitHub username" 
                value={username}
                onChange={handleInputChange}
                className={styles.input}
              />
            </Form.Group>
            <Button type="submit" variant="primary" className={styles.button}>
              Get Zuopins
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
