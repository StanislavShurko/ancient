import { getMatchData, getPlayersData } from "./api";
import { Player, PlayerAccount, PlayerGameAccount } from "./types/internal";
import { PlayerRow } from "./components/PlayerRow";

export default async function Home() {
  const matchId = '7986273303'
  const matchData = await getMatchData(matchId)

  const matchWinner = matchData?.radiant_win ? 'Radiant' : 'Dire';

  const playersAccountIds = matchData?.players.map(({ account_id }: Player) => account_id).filter((id: string | undefined) => id !== undefined) ?? [];
  const playersData: PlayerAccount[] = await getPlayersData(playersAccountIds) as PlayerAccount[];

  const teams = matchData?.players?.reduce((acc: { radiant: PlayerGameAccount[], dire: PlayerGameAccount[] }, player: Player) => {
    const playerData = playersData.find((playerAccount) => playerAccount.profile.account_id === player.account_id) ?? {} as PlayerAccount

    if (player.isRadiant) {
      acc.radiant.push({ ...player, ...playerData });
    } else {
      acc.dire.push({ ...player, ...playerData });
    }

    return acc;
  }, { radiant: [], dire: [] }) ?? { radiant: [], dire: [] };

  return (
    <div className="font-mono">
      <div className="font-mono flex justify-between text-3xl">
        <div>
          Match id: {matchId}
        </div>
        <div>
          Winner: {matchWinner}
        </div>
      </div>

      <div className=""></div>
      <div className="text-center text-3xl mt-6">
        Teams
      </div>
      <div className="flex justify-between mt-3">
        <div>
          <div className=" text-2xl">
            Radiant
          </div>
          <div className="flex flex-col gap-2 mt-3">
            {teams.radiant.map((player: PlayerGameAccount) => <PlayerRow key={player.account_id} player={player}></PlayerRow>)}
          </div>
        </div>
        <div>
          <div className="text-2xl">
            Dire
          </div>
          <div className="flex flex-col gap-2 mt-3">
            {teams.dire.map((player: PlayerGameAccount) => <PlayerRow key={player.account_id} player={player}></PlayerRow>)}
          </div>
        </div>
      </div>
    </div>
  );
}
