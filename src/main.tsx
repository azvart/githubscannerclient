import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { ConfigProvider, Layout } from "antd";
import './index.css'
import App from './App.tsx'
import Repository from "./routes/repository";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://127.0.0.1:3000/graphql'
})


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ConfigProvider>
      <BrowserRouter>
      <ApolloProvider client={client}>
          <Layout className="layout">
          <Routes>
              <Route path="/" element={<App />} />
              <Route path="/:owner/:repository" element={<Repository />} />
          </Routes>
          </Layout>
      </ApolloProvider>
      </BrowserRouter>
      </ConfigProvider>
  </StrictMode>,
)
