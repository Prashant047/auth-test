export default {
    database: "mongodb://localhost/test",
    port: process.env.PORT || 8082,
    session_secret: 'thisissessionsecret',
    webToken_secret: 'thisiswebtokensecret'
};