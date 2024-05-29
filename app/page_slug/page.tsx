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

interface ZuopinsConfig {
  site?: {
    name: string;
    bio: string;
  };
  links?: Link[];
}

interface GitHubProfile {
  avatar_url: string;
  login: string;
  bio: string;
  html_url: string;
}

const DynamicPage: React.FC = () => {
  const [config, setConfig] = useState<ZuopinsConfig | null>(null);
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
      {profile && (
        <div className="text-center mb-4">
          <Image src={profile.avatar_url} roundedCircle width={120} height={120} alt={`${username} avatar`} />
          <h2 className={styles.profileHandle}>@{profile.login}</h2>
          <p className={styles.profileBio}>{profile.bio}</p>
        </div>
      )}
      {error ? (
        <p className="text-danger text-center">{error}</p>
      ) : config ? (
        <div className="text-center">
          <ReactMarkdown className={styles.bio}>{config.site?.bio || ''}</ReactMarkdown>
          <div className="mt-4 d-flex flex-column align-items-center">
            {config.links?.map((link, index) => (
              <Button
                key={index}
                href={link.url}
                target="_blank"
                variant="primary"
                className={`${styles.button} mb-2`}
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
