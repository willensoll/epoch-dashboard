import { describe, it, expect, vi } from 'vitest'
import { fetchServerTime, fetchMetrics } from './controller.ts'

const { mockedAxiosGet, mockedEnv } = vi.hoisted(() => ({
    mockedAxiosGet: vi.fn(),
    mockedEnv: {
        VITE_BASE_URL: 'https://test-api.com',
        VITE_AUTH_TOKEN: 'test-token'
    }
}))

vi.mock('axios', () => ({
    default: {
        get: mockedAxiosGet
    }
}))

vi.mock('../utils/env.ts', () => ({
    env: mockedEnv
}))

describe('API Fetching Functions', () => {
    describe('fetchServerTime', () => {
        it('calls axios with correct configuration', async () => {
            const mockTimeData = { timestamp: Date.now() }

            mockedAxiosGet.mockResolvedValue({ data: mockTimeData })

            const result = await fetchServerTime()

            expect(mockedAxiosGet).toHaveBeenCalledWith('/time', {
                baseURL: mockedEnv.VITE_BASE_URL,
                headers: { "Authorization": mockedEnv.VITE_AUTH_TOKEN }
            })
            expect(result).toEqual(mockTimeData)
        })

        it('handles errors when fetching server time', async () => {
            mockedAxiosGet.mockRejectedValue(new Error('Network Error'))

            await expect(fetchServerTime()).rejects.toThrow('Network Error')
        })
    })

    describe('fetchMetrics', () => {
        it('calls axios with correct configuration', async () => {
            const mockMetricsData = { cpu: 50, memory: 75 }

            mockedAxiosGet.mockResolvedValue({ data: mockMetricsData })

            const result = await fetchMetrics()

            expect(mockedAxiosGet).toHaveBeenCalledWith('/metrics', {
                baseURL: mockedEnv.VITE_BASE_URL,
                headers: { "Authorization": mockedEnv.VITE_AUTH_TOKEN }
            })
            expect(result).toEqual(mockMetricsData)
        })

        it('handles errors when fetching metrics', async () => {
            mockedAxiosGet.mockRejectedValue(new Error('Fetch Failed'))

            await expect(fetchMetrics()).rejects.toThrow('Fetch Failed')
        })
    })
})
