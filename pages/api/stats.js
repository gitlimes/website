export default async function stats(req, res) {
  const _mdbUserCountFetch = await fetch(
    "https://discord.com/api/v9/guilds/852978546187698206?with_counts=true",
    {
      headers: {
        Authorization: process.env.MD_BADGE_DISCORD_TOKEN,
      },
    }
  );
  const _mdbUserCountJSON = await _mdbUserCountFetch.json();
  const mdbUserCount = _mdbUserCountJSON.approximate_member_count;

  res.status(200).json({ discordmdbadge: { usercount: mdbUserCount } });
}
