'use client';

// app/page.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import YAML from 'yaml';

interface LinktreeConfig {
  // Define the structure of your config object here
  someKey?: string; // Example property
}

const Page: React.FC = () => {
  const [config, setConfig] = useState<LinktreeConfig | null>(null);
  const [error, setError] = useState<string | null>(null);
  const rawUrl = 'https://raw.githubusercontent.com/stancsz/stancsz/main/config.yml';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(rawUrl);
        const parsedConfig = YAML.parse(response.data);
        setConfig(parsedConfig);
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Page Title</h1>
      {error ? (
        <p>{error}</p>
      ) : config ? (
        <pre>{JSON.stringify(config, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Page;