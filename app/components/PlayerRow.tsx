import { PlayerGameAccount } from "../types/internal"

interface PlayerRowArgs {
  player: PlayerGameAccount
}

export function PlayerRow({ player }: PlayerRowArgs) {
  return (
    <div key={player.account_id} className="flex gap-2">
      <div>{player.personaname ?? "Anonymus"}</div>

    </div>
  )
}
