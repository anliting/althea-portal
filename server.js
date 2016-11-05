let url=require('url')
module.exports=althea=>{
    althea.addPagemodule('/portal',pagemodule)
}
function pagemodule(env){
    if(
        env.request.headers.origin&&
        env.request.headers.origin!=env.envVars.allowedOrigin
    )
        return 403
    if(env.request.method==='GET')
        return get(env)
    env.headers['allow']='GET'
    return{
        status:405,
        headers:env.headers,
    }
}
function get(env){
    let parsedUrl=url.parse(env.request.url,true)
    env.headers['location']=parsedUrl.query.location||'/'
    if(parsedUrl.query.session)
        env.headers['set-cookie']=`altheaLoginSession=${
            parsedUrl.query.session
        };path=/;max-age=${256*365.2564*86400}`
    return{
        status:303,
        headers:env.headers,
    }
}
