import {join} from '../data.js'
export default async function(){
    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs')
    };

    const userData = {
        loggedIn : localStorage.getItem('loggedIn'),
        username : localStorage.getItem('username'),
    }

    this.partial('../templates/loading/loading.hbs', userData);
    
    let result = await join(this.params.id);
    if(result === 1){
        alert('You are now a team member');
        localStorage.setItem('hasTeam', true);
        localStorage.setItem('teamId', this.params.id);
        this.app.userData.hasTeam = true;
        this.app.userData.teamId = this.params.id;
        this.redirect(`#/catalog/${this.params.id}`)
    }
}