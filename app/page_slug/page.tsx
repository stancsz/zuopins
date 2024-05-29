'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import YAML from 'yaml';
import { usePathname } from 'next/navigation';
import { Container, Button, Image } from 'react-bootstrap';
import styles from '../page.module.css'; // Adjust the import path as necessary
import ReactMarkdown from 'react-markdown';

interface Link {
  title: string;
  url: string;
}

interface LinktreeConfig {
  site?: {
    name: string;
    bio: string;
  };
  links?: Link[];
}

interface GitHubProfile {
  avatar_url: string;
  name: string;
  bio: string;
  html_url: string;
}

const DynamicPage: React.FC = () => {
  const [config, setConfig] = useState<LinktreeConfig | null>(null);
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();
  const username = pathname.split('/')[1]; // Extract the username from the path
  const rawUrl = `https://raw.githubusercontent.com/${username}/${username}/main/config.yml`;

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await axios.get(rawUrl);
        const parsedConfig = YAML.parse(response.data);
        setConfig(parsedConfig);
      } catch (err) {
        setError('Failed to fetch config data');
        console.error(err);
      }
    };

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        setProfile(response.data);
      } catch (err) {
        setError('Failed to fetch GitHub profile');
        console.error(err);
      }
    };

    fetchConfig();
    fetchProfile();
  }, [rawUrl, username]);

  return (
    <Container className={`${styles.main} my-5`}>
      <h1 className="text-center">
        {username} | {config?.site?.name || 'Dynamic Page Title'}
      </h1>
      {profile && (
        <div className="text-center mb-4">
          <Image src={profile.avatar_url} roundedCircle width={100} height={100} alt={`${username} avatar`} />
          <h2>{profile.name}</h2>
          <p>{profile.bio}</p>
          <a href={profile.html_url} target="_blank" rel="noopener noreferrer">
            View GitHub Profile
          </a>
        </div>
      )}
      <p className="text-center">Current Path: {pathname}</p>
      {error ? (
        <p className="text-danger text-center">{error}</p>
      ) : config ? (
        <div className="text-center">
          <ReactMarkdown>{config.site?.bio || ''}</ReactMarkdown>
          <div className="mt-4">
            {config.links?.map((link, index) => (
              <Button
                key={index}
                href={link.url}
                target="_blank"
                variant="primary"
                className={`${styles.button} m-2`}
              >
                {link.title}
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </Container>
  );
};

export default DynamicPage;
