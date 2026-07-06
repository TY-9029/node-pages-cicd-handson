import test from 'node:test';
import assert from 'node:assert/strict';
import { createHTML } from '../src/site.js';

test('createHTML renders title and message', () => {
    const html = createHTML({ title: 'Test Title', message: 'Hello CI' });

    assert.match(html, /Test Title/);
    assert.match(html, /Hello CI/);
    assert.match(html, /<!doctype html/i);
});