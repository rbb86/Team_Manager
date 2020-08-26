import {leaveTeam} from '../data.js'

export default async function leave(){

   let result = await (await leaveTeam( this.app.userData.teamId, localStorage.getItem('userId'))).json();
   console.log(result);
   if(result === 1){
       alert('You left the team');
       localStorage.setItem('teamId', '');
       localStorage.setItem('hasTeam', '');
       this.app.userData.teamId = '';
       this.app.userData.hasTeam = '';
       this.redirect('#/catalog');
    }
    else{
        alert('Something went wrong')
        this.redirect('#/catalog/'+this.app.userData.teamId);
   }
}