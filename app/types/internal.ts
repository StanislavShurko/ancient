export interface Player {
  isRadiant: boolean;
  personaname: string;
  account_id: string;
}

export interface PlayerAccount {
  profile: {
    account_id: string;
  };
}

export interface PlayerGameAccount extends Player, PlayerAccount {}
