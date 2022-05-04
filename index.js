const express = require("express");
const handlebars = require("express-handlebars");
const { Client, MessageEmbed } = require("discord.js");
const { urlencoded, json } = require("body-parser");
const path = require("path");
const app = express();
const client = new Client({ fetchAllMembers: true });
const moment = require("moment");
moment.locale("tr");
client.config = require("./settings/config.json");

app.use(json());
app.use(urlencoded({ limit: "50mb", extended: false }));
app.engine("handlebars", handlebars({ defaultLayout: "main", layoutsDir: `${__dirname}/views/layouts/` }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));


app.get("/", (req, res) => {
    var user = client.users.cache.get(client.config.bot.userid);
    let status = user.presence.activities[0];
    let clientStatus = user.presence.clientStatus;
    let durum = user.presence.activities[0];

    if (user.presence.status === "offline") {
        var ewingstatus = "Çevrimdışı";
    } else {
        var ewingstatus = Object.keys(user.presence.clientStatus).map((c) => `${clientStatus[c].replace("online", "Çevrim içi").replace("dnd", "Rahatsız etmeyin").replace("idle", "Boşta")}`) || "Uyuyo knk galiba aktif değil.";
    }
    if (status) {
        if (user.presence.activities[0].type !== "LISTENING") {
            var ewingdev = "Suan Şarkı Dinlemiyor.";
            var ewingooxd = "";
        } else {
            var ewingdev = status.details;
            var ewingooxd = `${status.state} dinliyor.`;
        }
    } else {
        var ewingdev = "Suan Şarkı Dinlemiyor.";
        var ewingooxd = "";
    }
    if (durum) {
        if (user.presence.activities[0].name === "Spotify") {
            var durumdata = "Açıklama Bulunamadı.";
        } else {
            var durumdata = durum.state;
        }
    } else {
        var durumdata = "Açıklama Bulunamadı.";
    }

    res.render("index", {
        avatar: user.displayAvatarURL({ dynamic: true }),
        name: user.username,
        discriminator: user.discriminator,
        id: user.id,
        creat: moment(user.createdTimestamp).format("DD MMMM YYYY"),
        spoewing: ewingdev,
        sposanatçı: ewingooxd,
        ewingstatus: ewingstatus,
        ewingdurum: durumdata,
    });
});
app.get("/contact", (req, res) => {
    var user = client.users.cache.get(client.config.bot.userid);
    let status = user.presence.activities[0];
    let clientStatus = user.presence.clientStatus;
    let durum = user.presence.activities[0];

    if (user.presence.status === "offline") {
        var ewingstatus = "Çevrimdışı";
    } else {
        var ewingstatus = Object.keys(user.presence.clientStatus).map((c) => `${clientStatus[c].replace("online", "Çevrim içi").replace("dnd", "Rahatsız etmeyin").replace("idle", "Boşta")}`) || "Uyuyo knk galiba aktif değil.";
    }
    if (status) {
        if (user.presence.activities[0].type !== "LISTENING") {
            var ewingdev = "Suan Şarkı Dinlemiyor.";
            var ewingooxd = "";
        } else {
            var ewingdev = status.details;
            var ewingooxd = `${status.state} dinliyor.`;
        }
    } else {
        var ewingdev = "Suan Şarkı Dinlemiyor.";
        var ewingooxd = "";
    }
    if (durum) {
        if (user.presence.activities[0].name === "Spotify") {
            var durumdata = "Açıklama Bulunamadı.";
        } else {
            var durumdata = durum.state;
        }
    } else {
        var durumdata = "Açıklama Bulunamadı.";
    }
    res.render("contact", {
        avatar: user.displayAvatarURL({ dynamic: true }),
        name: user.username,
        discriminator: user.discriminator,
        id: user.id,
        creat: moment(user.createdTimestamp).format("DD MMMM YYYY"),
        spoewing: ewingdev,
        sposanatçı: ewingooxd,
        ewingstatus: ewingstatus,
        ewingdurum: durumdata,
    });
});

app.post("/contact", async(req, res) => {
    const ID = req.body.message;
    const email = req.body.email;
    let actionType = req.body.type;
    const user = client.users.cache.get(client.config.bot.userid);
    if (ID) {
        if (actionType === "ortakçalisma") {
            user.send(new MessageEmbed().setTitle("Ewing SiteContact System | Ortak Çalışma").setDescription(`
            ⚪ **Email :** **${email}**
            ⚪ **İp : ${req.ip}**

            **Mesaj;**

            \`\`\`${ID}\`\`\`
            `).setColor("161616").setFooter(`ewing.ga`).setThumbnail("https://cdn.discordapp.com/avatars/774591026940739585/f8c95573f63d411d7384419c72305e07.webp")).catch(x => {})
        };
        if (actionType === "isbirliği") {
            user.send(new MessageEmbed().setTitle("Ewing SiteContact System | İş Birliği").setDescription(`
            ⚪ **Email :** **${email}**
            ⚪ **İp : ${req.ip}**

            **Mesaj;**

            \`\`\`${ID}\`\`\`
            `).setColor("161616").setFooter(`ewing.ga`).setThumbnail("https://cdn.discordapp.com/avatars/774591026940739585/f8c95573f63d411d7384419c72305e07.webp")).catch(x => {})
        };
        if (actionType === "acilkonu") {
            user.send(new MessageEmbed().setTitle("Ewing SiteContact System | Acil Konu").setDescription(`
            ⚪ **Email :** **${email}**
            ⚪ **İp : ${req.ip}**

            **Mesaj;**
            \`\`\`${ID}\`\`\`
             `).setColor("161616").setFooter(`ewing.ga`).setThumbnail("https://cdn.discordapp.com/avatars/774591026940739585/f8c95573f63d411d7384419c72305e07.webp")).catch(x => {})
        };
    };
    res.redirect("/");
});



app.use((req, res) => { return res.redirect("/"); });

client.login(client.config.bot.token).then(() => {
    let listener = app.listen(client.config.other.sitePort, async() => {
        console.clear();
        console.info(`Site ${listener.address().port} portunda aktif`);
    });
}).catch((err) => { console.info("Hatalı token"); });