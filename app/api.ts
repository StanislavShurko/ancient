const apiURL = "https://api.opendota.com/api";

export async function getMatchData(
  matchId: string
): Promise<{ [key: string]: any }> {
  const data = await fetch(`${apiURL}/matches/${matchId}`);
  const matchData = await data.json();

  return await matchData;
}

export async function getPlayersData(playersAccountIds: string[]) {
  const promises = playersAccountIds.map(
    (id) =>
      new Promise((resolve, reject) => {
        const data = fetch(`${apiURL}/players/${id}`)
          .then((data) => {
            data
              .json()
              .then((data) => {
                resolve(data);
              })
              .catch((err) => {
                reject(err);
              });
          })
          .catch((err) => {
            reject(err);
          });
      })
  );

  return await Promise.all(promises);
}
