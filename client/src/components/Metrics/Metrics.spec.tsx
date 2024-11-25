import { describe, it, expect, vi } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Metrics } from './Metrics'
import { fetchMetrics } from '../../controller/controller.ts'
import {render, screen, waitFor} from "@testing-library/react";
import {ReactNode} from "react";

vi.mock('../../controller/controller.ts', () => ({
    fetchMetrics: vi.fn()
}))

describe('Metrics Component', () => {
    const createWrapper = () => {
        const queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false
                }
            }
        })
        return ({ children }:{children : ReactNode}) => (
            <QueryClientProvider client={queryClient}>
                {children}
                </QueryClientProvider>
        )
    }

    it('displays loading state initially', () => {
        vi.mocked(fetchMetrics).mockResolvedValue({})

        render(<Metrics />, { wrapper: createWrapper() })

        expect(screen.getByText(/Loading.../i)).toBeInTheDocument()
    })

    it('renders metrics data successfully', async () => {
        const mockMetricsData = JSON.stringify({
            cpu: 50,
            memory: 75
        })

        vi.mocked(fetchMetrics).mockResolvedValue(mockMetricsData)

        render(<Metrics />, { wrapper: createWrapper() })

        await waitFor(() => {expect(screen.getByText(mockMetricsData)).toBeInTheDocument()})
    })

    it('handles error state', async () => {
        const errorMessage = 'Fetch failed'
        vi.mocked(fetchMetrics).mockRejectedValue(new Error(errorMessage))

        render(<Metrics />, { wrapper: createWrapper() })
        await waitFor(() => {
            expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument()
        })
    })
})
