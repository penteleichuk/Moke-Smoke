import { API_BASE_URL } from '@env';
import axios from 'axios';

const INSTANCE_TIMEOUT = 3000;
const INSTANCE_HEADER = {
  'Content-Type': 'application/json',
};

export const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: INSTANCE_HEADER,
  timeout: INSTANCE_TIMEOUT,
});
