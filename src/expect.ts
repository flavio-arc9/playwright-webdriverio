import { expect as baseExpect } from '@playwright/test';
import { expect as IOExpect } from 'expect-webdriverio'

/** 
    Este archivo es para crear un expect de Playwright y WebdriverIO
    El objetivo es crear un expect que funcione para ambos, Playwright y WebdriverIO
    El problema es que Playwright y WebdriverIO tienen diferentes formas de manejar los expect
    Por ejemplo, Playwright tiene el método toBeVisible() y WebdriverIO tiene isDisplayed()
    Por lo tanto, se necesita crear un expect que funcione para ambos
**/