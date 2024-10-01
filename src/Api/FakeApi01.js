import mp3Type from "~/assets/audio/mp3Type";

const apiTest01 = {
  getTrendingSongs: () => {
    return [
      {
        id: `trend_0`,
        trackAvatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQnqK4XzbJZxveM9f3yeN1fdOrE1dE-scufg&s",
        trackPerformer: "The Southern RamBlers",
        trackTitle: "Country Roads",
        trackType: "Single",
        trackGenre: "Country",
        trackLink:
          mp3Type[`TrendingSongs/Country Roads - The Southern RamBlers`],
      },
      {
        id: `trend_1`,
        trackAvatar:
          "https://i1.sndcdn.com/artworks-8Rp7TfVysyNpTfz4-vL8qiw-t500x500.jpg",
        trackPerformer: "Tommy Richman",
        trackTitle: "MILLION DOLLAR BABY",
        trackType: "Single",
        trackGenre: "HipHop",
        trackLink: mp3Type[`TrendingSongs/Tommy Richman  MILLION DOLLAR BABY`],
      },
      {
        id: `trend_2`,
        trackAvatar: "https://i.ytimg.com/vi/O--xuWCZwMc/maxresdefault.jpg",
        trackPerformer: "The Weeknd, JENNIE, Lily-Rose Depp",
        trackTitle: "One Of The Girls",
        trackType: "Single",
        trackGenre: "RnB/Soul",
        trackLink:
          mp3Type[
            `TrendingSongs/The Weeknd JENNIE LilyRose Depp One Of The Girls`
          ],
      },
      {
        id: `trend_3`,
        trackAvatar:
          "https://i1.sndcdn.com/artworks-RNzGbycq58c5Dt0Y-2Egb8A-t500x500.jpg",
        trackPerformer: "cassö, RAYE, D-Block Europe",
        trackTitle: "Prada",
        trackType: "Single",
        trackGenre: "Pop",
        trackLink: mp3Type[`TrendingSongs/cassö RAYE DBlock Europe  Prada`],
      },
      {
        id: `trend_4`,
        trackAvatar: "https://i.ytimg.com/vi/HqUaJbF_uO4/maxresdefault.jpg",
        trackPerformer: "ryansanon",
        trackTitle: "MOVE YO BODY",
        trackType: "Single",
        trackGenre: "Pop",
        trackLink: mp3Type[`TrendingSongs/Bryansanon  MOVE YO BODY sped up`],
      },
      {
        id: `trend_5`,
        trackAvatar:
          "https://i1.sndcdn.com/artworks-zNtihhLynoXyysS2-uKqohg-t500x500.jpg",
        trackPerformer: "Jack Harlow",
        trackTitle: "Lovin' On Me",
        trackType: "Single",
        trackGenre: "HipHop",
        trackLink: mp3Type["TrendingSongs/Jack Harlow  Lovin On Me"],
      },
      {
        id: `trend_6`,
        trackAvatar:
          "https://i.ytimg.com/vi/AI_-afRgwv0/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDHO_ybMzpdU-EZM9RJMTQuYMHs1Q",
        trackPerformer: "Alexia",
        trackTitle: "Oh, This Love",
        trackType: "Single",
        trackGenre: "Pop",
        trackLink: mp3Type[`TrendingSongs/Alexia  Oh This Love`],
      },
      {
        id: `trend_7`,
        trackAvatar: "https://i.ytimg.com/vi/8l9mwcximOs/maxresdefault.jpg",
        trackPerformer: "310babii, Tyga, Blueface, Mustard",
        trackTitle: "Soak City",
        trackType: "Single",
        trackGenre: "HipHop",
        trackLink:
          mp3Type[
            "TrendingSongs/310babii Tyga Blueface Mustard  Soak City left do it right do it"
          ],
      },
      {
        id: `trend_8`,
        trackAvatar:
          "https://i1.sndcdn.com/artworks-q7abtyyfxgKAcEPG-pdCXcA-t500x500.jpg",
        trackPerformer: "Isabel LaRosa",
        trackTitle: "favorite",
        trackType: "Single",
        trackGenre: "Moombahton",
        trackLink: mp3Type[`TrendingSongs/Isabel LaRosa  favorite`],
      },
      {
        id: `trend_9`,
        trackAvatar:
          "https://i1.sndcdn.com/artworks-000509687238-dwnjjr-t500x500.jpg",
        trackPerformer: "Ava Max",
        trackTitle: "Sweet but Psycho",
        trackType: "Single",
        trackGenre: "Pop",
        trackLink: mp3Type[`TrendingSongs/Sweet but Psycho - Ava Max`],
      },
    ];
  },
};

export default apiTest01;
