import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Home from './Home';

describe('Home Component', () => {
  it('renders the image, heading, paragraph, buttons and checks classes', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Imagen
    const image = screen.getByAltText('Home Person');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining('home_person'));
    expect(image).toHaveClass('homePerson');

    // Heading y párrafo
    const heading = screen.getByRole('heading', { name: /¡Bienvenid@!/i });
    expect(heading).toBeInTheDocument();

    const paragraph = screen.getByText(/Organiza tus clases de manera sencilla y efectiva/i);
    expect(paragraph).toBeInTheDocument();

    // Comprobar clases de los artículos
    const infoHome = heading.closest('article');
    expect(infoHome).toHaveClass('infoHome');

    const buttonsArticle = screen.getByText('Log In').closest('article');
    expect(buttonsArticle).toHaveClass('homeButtons');

    // Botones y links
    const logInButton = screen.getByRole('button', { name: /Log In/i });
    const signUpButton = screen.getByRole('button', { name: /Sign Up/i });

    expect(logInButton).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();

    expect(logInButton.closest('a')).toHaveAttribute('href', '/login');
    expect(signUpButton.closest('a')).toHaveAttribute('href', '/signup');
  });
});
