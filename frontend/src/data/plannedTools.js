import { Code, Hash, Key, Shield, Database } from 'lucide-react';

export const plannedTools = [
  {
    id: 'json-formatter',
    name: 'JSON Formatter & Validator',
    description: 'Format, minify, and validate JSON payloads instantly. Detect syntax errors and prettify your data.',
    icon: Code,
    category: 'Formatters',
    tags: ['json', 'pretty', 'minify']
  },
  {
    id: 'base64',
    name: 'Base64 Encoder/Decoder',
    description: 'Encode strings to Base64 or decode Base64 back to raw text securely in your browser.',
    icon: Hash,
    category: 'Encoders',
    tags: ['base64', 'encode', 'decode']
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate universally unique identifiers (UUIDs) of version 1, 3, 4, and 5 in bulk.',
    icon: Key,
    category: 'Generators',
    tags: ['uuid', 'guid', 'random']
  },
  {
    id: 'jwt-decoder',
    name: 'JWT Decoder',
    description: 'Decode JSON Web Tokens to view header, payload, and signature algorithms without sending data over the network.',
    icon: Shield,
    category: 'Security',
    tags: ['jwt', 'token', 'auth']
  },
  {
    id: 'sql-formatter',
    name: 'SQL Formatter',
    description: 'Format unreadable SQL queries into beautifully indented text. Supports multiple SQL dialects.',
    icon: Database,
    category: 'Formatters',
    tags: ['sql', 'database', 'query']
  }
];