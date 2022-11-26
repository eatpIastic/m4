/// <reference types="../CTAutocomplete" />
import RenderLib from "../RenderLib"
import Promise from "../PromiseV2";
import request from "../requestV2";
import Settings from "./config";

register("command", () => Settings.openGUI()).setName("m4utils", true);

let boss = false;
let bows = [];

register("worldLoad", () => {
  boss = false;
})

register("chat", () => {
  boss = true;
}).setCriteria(/\[BOSS\] Thorn.+/)

register("renderWorld", () => {
  if(!boss) return;
  bows.forEach(bow => {
	  if(Settings.spiritBowEsp && bow.getName().includes("Spirit Bow")) {
		  RenderLib.drawBaritoneEspBox(bow.getRenderX(), bow.getRenderY(), bow.getRenderZ(), .75, 5, 255, 215, 0, 1, false)
	  } else if(Settings.spiritBearEsp && bow.getName().includes("Spirit Bear")) {
		  RenderLib.drawBaritoneEspBox(bow.getRenderX(), bow.getRenderY(), bow.getRenderZ(), .75, 5, 0, 215, 0, 1, false)
	  }
  })
})

register("step", () => {
  if(!boss) return;
  if(!Settings.spiritBearEsp && !Settings.spiritBowEsp) return;
  new Thread(() => bows = World.getAllEntities().filter(e => e.getName().includes("Spirit"))).start();
}).setFps(2)

register("spawnParticle", (name, type, event) => {
  if(!boss || !Settings.disableAotdParticles) return;
  if(type.toString().includes("FLAME")) cancel(event)
})

register("chat", (event) => {
  if(!boss || !Settings.disableAotdIneffectiveMsg) return;
  cancel(event);
}).setCriteria("This creature is immune to this kind of magic!")


register("chat", (name) => {
  if(!Settings.m4CompletionsChecker) return;
  get_data(name, false)
}).setCriteria(/Dungeon Finder > (.+) joined the dungeon group! \(.+\)/)


register("command", (...args) => {
  if(args==null || args==undefined || args.length==0) {
    ChatLib.chat("&cPlease specify a player");
    return;
  }
  get_data(args[0], true);
}).setName("comps")


const get_data = (username, say) => {
  Promise.all([
    request({url : `https://playerdb.co/api/player/minecraft/${username}`,headers: { 'User-Agent': ' Mozilla/5.0' }, json: true})
  ]).then(uuid_data => {
    let uuid = uuid_data[0].data.player.raw_id
    let name = uuid_data[0].data.player.username
    Promise.all([
      request({url : `https://api.slothpixel.me/api/skyblock/profile/${uuid}/`,headers: { 'User-Agent': ' Mozilla/5.0' }, json: true})
    ]).then(user_data => {
      //
      let comps = parseInt(user_data[0]["members"][uuid]["dungeons"]["dungeon_types"]["master_catacombs"]["tier_completions"]["4"])
      if(say) {
        ChatLib.command(`pc ${name} has completed ${comps} M4s`)
      }
      ChatLib.chat(`&b${name} &rhas completed &b${comps}&r M4s`)
    })
  })
  request({url : `https://playerdb.co/api/player/minecraft/${username}`,headers: { 'User-Agent': ' Mozilla/5.0' }}).then(response => JSON.parse(response)).catch(error =>{ print(error);});
}