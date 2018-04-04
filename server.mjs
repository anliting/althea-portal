import url from 'url'
function pagemodule(env){
    if(!env.althea.allowOrigin(env.envVars,env.request.headers.origin))
        return 403
    if(env.request.method==='GET')
        return get(env)
    env.headers.allow='GET'
    return{
        status:405,
        headers:env.headers,
    }
}
function get(env){
    let parsedUrl=url.parse(env.request.url,true)
    env.headers.location=parsedUrl.query.location||'/'
    if(parsedUrl.query.session)
        env.headers['set-cookie']=`altheaLoginSession=${
            parsedUrl.query.session
        };path=/;max-age=${256*365.2564*86400}`
    return{
        status:303,
        headers:env.headers,
    }
}
export default althea=>{
    althea.addPagemodule('/portal',pagemodule)
}
