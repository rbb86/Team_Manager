function host(endpoint){
    return `https://api.backendless.com/8437C1A8-6541-C39B-FF0B-6D084FB90F00/046A7A56-BEE0-43DA-AA88-BD4185E3DB7D/${endpoint}`
}

const endpoints = {
    register : 'users/register',
    login : 'users/login',
    teams: 'data/teams',
    teamsWithRelations: 'data/teams?loadRelations=members', 
    update_user: 'users/',
    logout: 'users/logout',
    usersTable: 'data/usersTable'
}

export async function register(username, password){
    let result = await (await fetch(host(endpoints.register),{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            username : username,
            password
        })
    })).json();
    console.log(result);

    fetch(host(endpoints.usersTable),{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },body: JSON.stringify({
            objectId: result.objectId,
            name: result.username

        })
    }
    )

    return result;
}

export async function login(username, password){
    return (await fetch(host(endpoints.login),{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            login : username,
            password
        })
    })).json();
}

export async function logoutGet(){
    return fetch(host(endpoints.logout) ,{
        method: 'GET',
        headers: {
            'user-token' : localStorage.getItem('user-token')
        }});

}

async function setUserTeamId(userId, teamId) {
    const token = localStorage.getItem('userToken');
    if(!token){
        throw new Error('User is not logged in!');
    }

   return (await fetch(host(endpoints.teams+'/'+teamId+'/members') ,{
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'user-token' : token
        },
        body: JSON.stringify({userId})
    })).json();

}

export async function create(team) {
    const token = localStorage.getItem('userToken');
    if(!token){
        throw new Error('User is not logged in!');
    }
    const result =  await (await fetch(host(endpoints.teams),{
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'user-token' : token
        },
        body: JSON.stringify(team)
    })).json();

 
    if (result.hasOwnProperty('errorData')){
        const error = new Error();
        Object.assign(error, result);
        throw error;
    }

    const userUpdateResult = await setUserTeamId(result.ownerId, result.objectId);
    if (userUpdateResult.hasOwnProperty('errorData')){
        const error = new Error();
        Object.assign(error, result);
        throw error;
    }

    console.log(userUpdateResult);

    return result
}

export async function getTeamById(id) {
    return (await fetch(host(endpoints.teams + '/' + id))).json()
}

export async function getTeams() {
    return (await fetch(host(endpoints.teamsWithRelations))).json()
}

export async function leaveTeam(teamId, userId){
    // https://api.backendless.com/<application-id>/<REST-api-key>/data/<table-name>/<parentObjectId>/<relationName> 
    const token = localStorage.getItem('userToken');
    return (await fetch(host(endpoints.teams + '/' + teamId + '/' + 'members'),{
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'user-token' : token
        },
        body: JSON.stringify([userId])
    }
    )
    )
}

export async function edit(team, teamId){
    const result = await (await fetch(host(endpoints.teams + '/' +teamId),{
        method:'PUT',
        headers:{
            'Content-type': 'application/json',
            'user-token' : localStorage.getItem('userToken')
        },
        body: JSON.stringify(team)
    })).json();

    return result;

}

export async function join(id){
    const result = await (await fetch(host(endpoints.teams + '/' + id + '/members'), {
        method: 'PUT',
        headers:{
            'Content-type': 'application/json',
            'user-token' : localStorage.getItem('userToken')
        },
        body: JSON.stringify([localStorage.getItem('userId')])

    })).json();

    return result;
}