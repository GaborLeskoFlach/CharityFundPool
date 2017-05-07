const enum Environment {
    DEVELOPMENT,
    LIVE
}

let developmentNodeAPIBaseURL : string = 'https://typescript-node-api-pyjfiuehfx.now.sh'
let developmentNodeAPIURL : string = '/api/v1/users'

let liveNodeAPIBaseURL : string = ''
let liveNodeAPIURL : string = ''

let environment : Environment = Environment.DEVELOPMENT

let config = {
    network : {        
        baseEndPointNodeUrl : environment === Environment.DEVELOPMENT ? developmentNodeAPIBaseURL + developmentNodeAPIURL : liveNodeAPIBaseURL + liveNodeAPIURL
    }
}

export default config