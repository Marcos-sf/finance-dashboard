import { describe, expect, beforeAll, it } from '@jest/globals';
import request from 'supertest';
import app from '../app';
import prisma from '../config/prisma';

describe('Authentication API', () => {
  
  beforeAll(async () => {
    // Cleanup any existing test users
    await prisma.user.deleteMany({ where: { email: { contains: 'test' } }});
  });

  it('should successfully register a new user', async () => {
    const res = await request(app).post('/auth/register').send({
      name: 'Test Analyst',
      email: 'test_analyst@example.com',
      password: 'password123',
      role: 'Analyst'
    });

    expect(res.status).toBe(201);
    expect(res.body.status).toBe('success');
    expect(res.body.data.token).toBeDefined();
  });

  it('should reject login with wrong password', async () => {
    const res = await request(app).post('/auth/login').send({
      email: 'test_analyst@example.com',
      password: 'wrongpassword'
    });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Invalid credentials');
  });

});
