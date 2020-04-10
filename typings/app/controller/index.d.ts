// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome = require('../../../app/controller/home');
import ExportUpload = require('../../../app/controller/upload');

declare module 'egg' {
  interface IController {
    home: ExportHome;
    upload: ExportUpload;
  }
}
