/// <reference types="../CTAutocomplete" />
import Promise from "../PromiseV2";
import RenderLib from "../RenderLib"
import request from '../requestV2';

let boss = false
let bows = []

register("worldLoad", () => {
  boss = false;
})

register("chat", () => {
  boss = true;
}).setCriteria(/\[BOSS\] Thorn.+/)

register("renderWorld", () => {
  if(!boss) return;
  bows.forEach(bow => {
	if(bow.getName().includes("Spirit Bow")) {
		RenderLib.drawBaritoneEspBox(bow.getRenderX(), bow.getRenderY(), bow.getRenderZ(), .75, 5, 255, 215, 0, 1, false)
	} else if(bow.getName().includes("Spirit Bear")) {
		RenderLib.drawBaritoneEspBox(bow.getRenderX(), bow.getRenderY(), bow.getRenderZ(), .75, 5, 0, 215, 0, 1, false)
	}
  })
})

register("step", () => {
  if(!boss) return;
  new Thread(() => bows = World.getAllEntities().filter(e => e.getName().includes("Spirit"))).start();
}).setFps(2)

register("spawnParticle", (name, type, event) => {
  if(!boss) return;
  if(type.toString().includes("FLAME")) cancel(event)
})

register("chat", (event) => {
  if(!boss) return;
  cancel(event);
}).setCriteria("This creature is immune to this kind of magic!")

const get_data = (username) => {
  if(!username) username = Player.getName()
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
      ChatLib.chat(`&b${name} &rhas completed &b${comps}&r M4s`)
    })
  })
  request({url : `https://playerdb.co/api/player/minecraft/${username}`,headers: { 'User-Agent': ' Mozilla/5.0' }}).then(response => JSON.parse(response)).catch(error =>{ print(error);});
}

register("chat", (username) => {
  get_data(username)
}).setCriteria(/Dungeon Finder > (.+) joined the dungeon group! \(.+\)/)


register("command", (username) => {
  get_data(username)
}).setName("comps")