import { Browser } from "@qawolf/browser";
import { Runner } from "@qawolf/runner";
import {
  AssertOptions,
  GetPropertyArgs,
  Step,
  StepValue,
  Workflow
} from "@qawolf/types";
import { Page } from "puppeteer";

declare global {
  // declare the globals we expose in RunnerEnvironment
  const runner: Runner;

  function click(step: Step): Promise<void>;
  function hasText(text: string, options?: AssertOptions): Promise<boolean>;
  function getProperty(
    args: GetPropertyArgs,
    options?: AssertOptions
  ): Promise<string | null | undefined>;
  function input(step: Step, value?: StepValue): Promise<void>;
  function scrollElement(step: Step, value: StepValue): Promise<void>;
  function waitUntil(
    booleanFn: () => boolean,
    options?: AssertOptions
  ): Promise<void>;

  const steps: Step[];
  const values: StepValue[];
  const workflow: Workflow;

  const browser: Browser;
  function currentPage(): Promise<Page>;
  function getPage(
    index?: number,
    waitForRequests?: boolean,
    timeoutMs?: number
  ): Promise<Page>;
}
