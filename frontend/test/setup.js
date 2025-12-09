import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Limpiar el DOM después de cada test
afterEach(() => {
  cleanup();
});
