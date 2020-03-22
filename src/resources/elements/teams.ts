import { bindable, bindingMode } from 'aurelia-framework';
import { ITeam } from 'models/ITeam';

export interface ILeaderboardTeam extends ITeam {
  isOpen: boolean;
}

export class Teams {
  @bindable title: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) teams: ILeaderboardTeam[];
  
  toggleTeamIsOpen(team: ILeaderboardTeam) {
    team.isOpen = !team.isOpen;
  }
}
