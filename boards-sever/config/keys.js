module.exports = {
  google: {
    clientID: '493852818222-0c3dhrfaafip7ph35f9rjrrpi3746lif.apps.googleusercontent.com',
    clientSecret: '-whzGQ1Jtv7g2_eoUlUkqJt4'
  },
  mongodb: {
    // dbURI: mongodb+srv://boards-app-admin:<password>@boards-edd0p.mongodb.net/test?retryWrites=true&w=majority,
    // dbURI: `mongodb+srv://boards-app-admin:${this.password}@boards-edd0p.mongodb.net/test?retryWrites=true&w=majority`,
    dbURI: 'mongodb+srv://boards-app-admin:pVDKPBR8H1BxX8Dv@boards-edd0p.mongodb.net/test?retryWrites=true&w=majority',
    password: 'pVDKPBR8H1BxX8Dv'
  },
  session: {
    cookieKey: 'boards'
  },
  jwt: {
    secret: 'boards-jwt-secret-token'
  }
};