import { jestTestAdapter } from '@atomic-testing/jest';
import { createTestEngine } from '@atomic-testing/react';
import { testRunner } from '@atomic-testing/test-runner';
import {
  clickLocationMouseEventExample,
  clickLocationMouseEventExampleTestSuite,
  hoverMouseEventExample,
  hoverMouseEventExampleTestSuite,
} from '../src/examples';

testRunner(hoverMouseEventExampleTestSuite, jestTestAdapter, {
  getTestEngine: (scenePart: typeof hoverMouseEventExample.scene) => {
    return createTestEngine(hoverMouseEventExample.ui, scenePart);
  },
});

testRunner(clickLocationMouseEventExampleTestSuite, jestTestAdapter, {
  getTestEngine: (scenePart: typeof clickLocationMouseEventExample.scene) => {
    return createTestEngine(clickLocationMouseEventExample.ui, scenePart);
  },
});
