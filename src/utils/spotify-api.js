const searchMusic = songDetail => {
    return tracks.filter(item => item.album.toLowerCase() === songDetail ||
        item.artist.toLowerCase() === songDetail ||
        item.songName.toLowerCase() === songDetail

    )
};

const tracks = [
    {
        songName: "Mockingbird",
        artist: "Eminem",
        album: "Slim Shady"
    },
    {
        songName: "Houdini",
        artist: "Eminem",
        album: "The Death of Slim Shady"
    },
    {
        songName: "Levanta e Anda",
        artist: "Emicida",
        album: "Album"
    }
]

export default searchMusic;