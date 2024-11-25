import {describe, it, expect, vi, afterEach, beforeEach} from 'vitest';
import request from 'supertest';
import { app } from "./app.js";

describe('Express Server Authentication Middleware', () => {
    const validToken = 'test-token';
        vi.stubEnv("AUTH_TOKEN", 'test-token');


    describe('GET /time endpoint', () => {
        it('should return current time in epoch seconds with valid token', async () => {

            const response = await request(app)
                .get('/time')
                .set('Authorization', validToken);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('epoch');
            expect(typeof response.body.epoch).toBe('number');
        });

        it('should return 403 without authorization token', async () => {
            const response = await request(app).get('/time');

            expect(response.status).toBe(403);
            expect(response.body).toEqual({ error: 'Unauthorized' });
        });

        it('should return 403 with incorrect authorization token', async () => {
            const response = await request(app).get('/time').set('Authorization', "invalid-token");

            expect(response.status).toBe(403);
            expect(response.body).toEqual({ error: 'Unauthorized' });
        });
    });

    describe('Prometheus Metrics', () => {
        it('should expose metrics endpoint', async () => {
            const response = await request(app)
                .get('/metrics')
                .set('Authorization', validToken);

            expect(response.status).toBe(200);
            expect(response.type).toBe('text/plain');
        });
        it('should return 403 without authorization token', async () => {
            const response = await request(app).get('/metrics');

            expect(response.status).toBe(403);
            expect(response.body).toEqual({ error: 'Unauthorized' });
        });

        it('should return 403 with incorrect authorization token', async () => {
            const response = await request(app).get('/metrics').set('Authorization', "invalid-token");

            expect(response.status).toBe(403);
            expect(response.body).toEqual({ error: 'Unauthorized' });
        });
    });
});
