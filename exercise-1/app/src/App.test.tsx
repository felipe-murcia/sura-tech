import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import App from '@/App'
import { AppProviders } from '@/app/providers/AppProviders'

describe('App', () => {
  it('renders the portfolio sections and projects', async () => {
    render(
      <AppProviders>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </AppProviders>,
    )

    expect(screen.getByRole('heading', { level: 1, name: 'Luis Perdomo' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Construyo interfaces claras, utiles y consistentes' }),
    ).toBeInTheDocument()

  })
})