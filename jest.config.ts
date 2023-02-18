import type { Config } from 'jest';

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default async (): Promise<Config> => {
  return {
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\.(css|less|sass|scss)$': '<rootDir>/tests/__mocks__/styleMock.js',
    },
  };
};
