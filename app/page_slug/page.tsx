// app/[...slug]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import YAML from 'yaml';
import { usePathname } from 'next/navigation';

interface LinktreeConfig {
  someKey?: string; // Example property
}

const DynamicPage: React.FC = () => {
  const [config, setConfig] = useState<LinktreeConfig | null>(null);
  const [error, setError] = useState<string | null>(null);
  const rawUrl = 'https://raw.githubusercontent.com/stancsz/stancsz/main/config.yml';
  const pathname = usePathname();

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
    <div className="container my-5">
      <h1 className="text-center">Dynamic Page Title</h1>
      <p className="text-center">Current Path: {pathname}</p>
      {error ? (
        <p className="text-danger text-center">{error}</p>
      ) : config ? (
        <pre className="text-center">{JSON.stringify(config, null, 2)}</pre>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
};

export default DynamicPage;
