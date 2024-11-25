import { describe, it, expect, vi } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {Stopwatch} from "./Stopwatch.tsx";
import {fetchServerTime} from '../../controller/controller.ts'
import {render, screen, waitFor} from "@testing-library/react";
import {act} from "react";

vi.mock('../../controller/controller.ts', () => ({
    fetchServerTime: vi.fn()
}))


describe('Stopwatch Component', () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    const renderComponent = () => {
        return render(
            <QueryClientProvider client={queryClient}>
                <Stopwatch />
            </QueryClientProvider>
        );
    };

    it('renders loading state initially', () => {
        vi.mocked(fetchServerTime).mockResolvedValue({ epoch: 1234567890 })
        renderComponent();

        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    it('displays server time after fetching', async () => {
        const mockServerTime = { epoch: 1234567890 };
        vi.mocked(fetchServerTime).mockResolvedValue(mockServerTime)

        renderComponent();

        await waitFor(() => {
            expect(screen.getByText(`Server time: ${mockServerTime.epoch}`)).toBeInTheDocument();
        });
    });

    it('handles error state', async () => {
        vi.mocked(fetchServerTime).mockRejectedValue(new Error('Fetch failed'));

        renderComponent();

        await waitFor(() => {
            expect(screen.getByText(/Error: Fetch failed/i)).toBeInTheDocument();
        });
    });

    it('displays stopwatch time with correct formatting', async () => {
        vi.mocked(fetchServerTime).mockResolvedValue({ epoch: 1234567890 });

        renderComponent();

        await waitFor(() => {
            const timeDisplay = screen.getByText(/0:00:00/i);
            expect(timeDisplay).toBeInTheDocument();
        });
    });

    it('increments stopwatch time', async () => {
        vi.useFakeTimers({shouldAdvanceTime:true});
        vi.mocked(fetchServerTime).mockResolvedValue({ epoch: 1234567890 });

        renderComponent();

        // Fast forward time
        await act(async () =>{
             vi.advanceTimersByTime(1000);

        })

        await waitFor(() => {
            const timeDisplay = screen.getByText(/0:00:01/i);
            expect(timeDisplay).toBeInTheDocument();
        }, {timeout:2000});

        vi.restoreAllMocks();
    });
});
