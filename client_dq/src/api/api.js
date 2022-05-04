import { post, get, put, patch } from './request';
export const getTopics = params => get('/topics', params);