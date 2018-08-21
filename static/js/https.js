if (
    window.location.protocol === "http:" &&
    window.location.hostname !== "localhost"
) {
    window.location.href = window.location.href.replace("http:", "https:");
}


if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    window.location.href = "//m.chaozhiedu.com";
}