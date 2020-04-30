let baseUrl = '/apis/' // 本地代理

switch (process.env.NODE_ENV) {
  case 'dev':
    baseUrl = 'http://dev.gzh.abctime.com/' // dev
    break
  case 'pre':
    baseUrl = 'http://test.gzh.abctime.com/' // test
    break
  case 'production':
    baseUrl = 'https://gzh.abctime.com/' // 生产环境url
    break
}

export default baseUrl
