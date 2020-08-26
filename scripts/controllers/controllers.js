export default async function() {

    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs'),
        teamMember: await this.load('../templates/catalog/teamMember.hbs'),
        teamControls: await this.load('../templates/catalog/teamControls.hbs')
    }

    const data = Object.assign({}, this.app.userData);
   
    data.teams = [
         {
             teamId: '123123',
             name: 'Cherry',
             comment: 'Some comment'
         },
         {
            teamId: '354894',
            name: 'Apple',
            comment: 'Other comment'
        },
        {
            teamId: '568942',
            name: 'Banana',
            comment: 'Heroes only'
        }
    ]
    
    this.partial('../templates/catalog/teamCatalog.hbs', data);
}