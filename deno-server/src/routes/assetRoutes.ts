// src/routes/assetRoutes.ts
import { Hono } from 'hono';
import {
  createAsset,
  getAssets,
  getAsset,
  updateAsset,
  deleteAsset,
} from '../controllers/assetController.ts';

const assetRoutes = new Hono();

assetRoutes.post('/assets', createAsset);
assetRoutes.get('/assets', getAssets);
assetRoutes.get('/assets/:id', getAsset);
assetRoutes.put('/assets/:id', updateAsset);
assetRoutes.delete('/assets/:id', deleteAsset);

export default assetRoutes;
