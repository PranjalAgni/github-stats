import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { GithubStats } from '../../interfaces';
import fetchGithubStats from '../../services/stats';
import Stats from './Stats';

const Home = () => {
  const [username, setUsername] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [stats, setStats] = useState<GithubStats[]>([]);

  const handleChange = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const { value } = event.target as HTMLInputElement;
    setUsername(value);
  };

  const handleSubmit = async () => {
    if (!username || !username.length) return;
    setIsLoading(true);
    setStats([]);
    const results = await fetchGithubStats(username);
    console.log('Called the API with: ', results);
    setUsername('');
    setIsLoading(false);
    setStats(results);
  };

  return (
    <Container className="mt-4">
      <Row className="row d-flex justify-content-center">
        <Col md={{ span: 3, offset: 3 }}>
          <div className="form-group">
            <input
              type="text"
              value={username}
              placeholder="username"
              className="form-control"
              id="inputValid"
              onChange={handleChange}
            />
          </div>
        </Col>
        <Col>
          <Row>
            <Col>
              <Button disabled={isLoading} onClick={handleSubmit}>
                Get Stats ⚡️
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      {isLoading && (
        <Row className="mt-2 row d-flex justify-content-center">
          <div className="spinner-border" role="status"></div>
        </Row>
      )}
      {stats.length > 0 && (
        <Row>
          <Stats githubStats={stats} />
        </Row>
      )}
    </Container>
  );
};

export default Home;
