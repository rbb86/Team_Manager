import {getTeamById, edit} from '../data.js'

export default async function() {

    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs'),
        editForm: await this.load('../templates/edit/editForm.hbs'),
    }


    let data = await getTeamById(this.params.id);
    data.loggedIn = localStorage.getItem('loggedIn');
    data.username = localStorage.getItem('username');
    data.teamId = data.objectId;
 
 
    
    this.partial('../templates/edit/editPage.hbs', data);
}

export async function editPost(){

    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs')
    };

    const userData = {
        loggedIn : localStorage.getItem('loggedIn'),
        username : localStorage.getItem('username'),
    }

    this.partial('../templates/loading/loading.hbs', userData);

    const team = {
        name: this.params.name,
        comment: this.params.comment
    }

    const teamId = this.params.id;

    const result = await edit(team, teamId);
    

    this.redirect('#/catalog');
}