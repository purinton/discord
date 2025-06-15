import { setupLocales, msg, locales, clearLocales } from '../src/locales.mjs';
import { jest, test, expect, describe, beforeEach } from '@jest/globals';

describe('setupLocales', () => {
  let mockFs;
  let log;
  beforeEach(() => {
    clearLocales();
    log = { warn: jest.fn(), error: jest.fn() };
    mockFs = {
      readdirSync: jest.fn(() => ['en-US.json', 'fr.json']),
      readFileSync: jest.fn((file) => {
        if (file.includes('en-US')) return '{"greet":"Hello"}';
        if (file.includes('fr')) return '{"greet":"Bonjour"}';
        throw new Error('File not found');
      })
    };
  });

  test('loads locales from files and returns loadedLocales', () => {
    const result = setupLocales({ localesDir: '/locales', log, fsLib: mockFs });
    expect(locales['en-US'].greet).toBe('Hello');
    expect(locales['fr'].greet).toBe('Bonjour');
    expect(result.loadedLocales).toContain('en-US');
    expect(result.loadedLocales).toContain('fr');
    expect(typeof result.msg).toBe('function');
  });

  test('handles missing directory', () => {
    mockFs.readdirSync.mockImplementation(() => { throw new Error('fail'); });
    const result = setupLocales({ localesDir: '/bad', log, fsLib: mockFs });
    expect(log.error).toHaveBeenCalledWith(expect.stringContaining('Failed to read locales directory'), expect.any(Error));
    expect(result.loadedLocales).toEqual([]);
    expect(typeof result.msg).toBe('function');
  });

  test('handles bad JSON', () => {
    mockFs.readFileSync.mockImplementation(() => '{bad json');
    const result = setupLocales({ localesDir: '/locales', log, fsLib: mockFs });
    expect(log.error).toHaveBeenCalledWith(expect.stringContaining('Failed to load or parse locale file'), expect.any(Error));
    expect(result.loadedLocales).toEqual([]); // No locales loaded if all JSON is bad
    expect(typeof result.msg).toBe('function');
  });
});

describe('msg', () => {
  beforeEach(() => {
    clearLocales();
    locales['en-US'] = { greet: 'Hello' };
  });
  test('returns message for key', () => {
    expect(msg('en-US', 'greet')).toBe('Hello');
  });
  test('falls back to default locale', () => {
    expect(msg('fr', 'greet', 'Default', { warn: jest.fn(), error: jest.fn() })).toBe('Hello');
  });
  test('returns default value if key missing', () => {
    expect(msg('en-US', 'missing', 'Default', { warn: jest.fn(), error: jest.fn() })).toBe('Default');
  });
  test('returns default value if locale missing', () => {
    expect(msg('fr', 'missing', 'Default', { warn: jest.fn(), error: jest.fn() })).toBe('Default');
  });
});
