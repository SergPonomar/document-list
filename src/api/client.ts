import axios from 'axios'
import type { App } from 'vue'

export default {
  install: (app: App) => {
    const apiClient = axios.create({
      baseURL: 'https://demo.ecm-consulting.ru/js-testing-service',
      headers: {
        Accept: 'application/json'
      }
    })
    app.provide('apiClient', apiClient)
  }
}