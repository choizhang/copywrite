/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1586356523254_8994';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true
  };

  // 貌似没有生效
  // exports.security = {
  //   xframe: {
  //     enable: false,
  //   },
  // };
  config.security = {
    // 关闭csrf验证
    csrf: {
      enable: false,
    },
    // 白名单
    domainWhiteList: ['*']
  };

  // 扩展上传插件白名单，默认是不支持下面的格式
  exports.multipart = {
    // will append to whilelist
    fileExtensions: [
      '.docx',
      '.xlsx',
    ],
  };

  config.mysql={
    //database configuration
    client:{
      //host
      host:'47.91.243.144',
      //port
      port:'3306',
      //username
      user:'hsh_hk',
      //password
      password:'Mylink_hsh_123_uat',
      //database
      database:'ticket_racing'
    },
    //load into app,default is open //加载到应用程序，默认为打开
    app:true,
    //load into agent,default is close //加载到代理中，默认值为“关闭”
    agent:false,
  };

  return {
    ...config,
    ...userConfig,
  };
};
