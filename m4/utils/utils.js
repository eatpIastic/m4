import Promise from "../../PromiseV2"
import request from "../../requestV2"
import config from "../config"
import PogObject from "PogData";

export let abc = new Gui()
export let data = new PogObject("m4", {
  "x": 0,
  "y": 0
}, ".data.json");

register("command", () => {
  abc.open();
}).setName("m4utilsdisplay")

register("dragged", (dx, dy, x, y) => {
  if (!abc.isOpen()) return
  data.x = x
  data.y = y
  data.save()
})

export const get_data = (username) => {
    if(!username) username = Player.getName()

    Promise.all([
      request({url : `https://playerdb.co/api/player/minecraft/${username}`,headers: { 'User-Agent': ' Mozilla/5.0' }, json: true})
    ]).then(uuid_data => {
      let uuid = uuid_data[0].data.player.raw_id
      let name = uuid_data[0].data.player.username
      Promise.all([
        request({url : `https://api.slothpixel.me/api/skyblock/profile/${uuid}/`,headers: { 'User-Agent': ' Mozilla/5.0' }, json: true})
      ]).then(user_data => {
        let comps = parseInt(user_data[0]["members"][uuid]["dungeons"]["dungeon_types"]["master_catacombs"]["tier_completions"]["4"])

        if(config.m4say) {
          ChatLib.command(`pc ${name} has completed ${comps} M4s`)
        }
  
        ChatLib.chat(`&b${name} &rhas completed &b${comps}&r M4s`)
      })
    })
}