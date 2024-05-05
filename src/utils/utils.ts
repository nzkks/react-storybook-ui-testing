import { screen, waitForElementToBeRemoved, within } from '@storybook/test';

export const waitForLoaderToBeRemoved = async (elementId: string, isCanvas = false) => {
  const canvas = within(document.body);
  try {
    let loader;
    if (isCanvas) {
      loader = await canvas.findByTestId(elementId);
    } else {
      loader = await screen.findByTestId(elementId);
    }

    if (!document.contains(loader)) return;
    await waitForElementToBeRemoved(loader);
  } catch (e: any) {
    if (e.message.includes('already removed')) {
      // sometimes the loader has already been removed when we try to check for it!
      return;
    }
    throw e;
  }
};
